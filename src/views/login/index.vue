<template>
  <div class="login-container">
    <canvas id="particle-canvas">
    </canvas>
    <div class="login-form-wrapper">
      <div class="logo-head">明日头条</div>
      <el-form ref="loginForm" :model="user" :rules='formRules'>
          <el-form-item prop='mobile'>
            <el-input
              v-model="user.mobile"
              placeholder='请输入手机号'
              prefix-icon='iconfont icon-shouji'
            ></el-input>
          </el-form-item>
          <el-form-item prop='code'>
            <el-input
              v-model="user.code"
              placeholder='请输入验证码'
              prefix-icon='iconfont icon-mima'
            ></el-input>
          </el-form-item>
          <el-form-item prop='isAgree'>
            <el-checkbox
              v-model="user.isAgree"
            >我已阅读并同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login-btn"
              type="primary"
              @click="onLogin"
              :loading='isLoading'
            >登录</el-button>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from 'api/user.js'

export default {
  name: 'LoginIndex',
  data() {
    return {
      user: {
        mobile: '', // 手机号
        code: '', // 验证码
        isAgree: false // 是否同意协议
      },
      isLoading: false, // 是否登录中
      formRules: {
        mobile: [
          { required: true, message: '手机号不为空', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式不正确', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确', trigger: 'change' }
        ],
        isAgree: [
          {
            validator(rule, value, callback) {
              if (value) {
                callback() // 校验成功
              }
              callback(new Error('请同意协议')) // 校验失败，返回错误信息
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    onLogin() {
      // 点击按钮表单验证
      this.$refs.loginForm.validate(valid => {
        // 验证失败，返回
        if (!valid) return false
        // 验证成功，进行登录请求
        this.login()
      })
    },
    async login() {
      this.isLoading = true // 登录中 loading...

      // 发送请求，处理响应
      try {
        const res = await login(this.user)
        this.$msgSuccess('登录成功！')
        // console.log(res)
        // 登录成功，将响应的 token 存入 localStorage 中
        window.localStorage.setItem('user', res.data.data.token)
        // 跳转到首页
        this.$router.push({
          name: 'home'
        })
      } catch (ex) { // 捕获错误
        this.$msgError('登录失败！')
        console.log(ex)
      }
      this.isLoading = false // 关闭 loading
    }
  },
  mounted() {
    /* eslint-disable */
    // modified version of random-normal
    function normalPool(o){var r=0;do{var a=Math.round(normal({mean:o.mean,dev:o.dev}));if(a<o.pool.length&&a>=0)return o.pool[a];r++}while(r<100)}function randomNormal(o){if(o=Object.assign({mean:0,dev:1,pool:[]},o),Array.isArray(o.pool)&&o.pool.length>0)return normalPool(o);var r,a,n,e,l=o.mean,t=o.dev;do{r=(a=2*Math.random()-1)*a+(n=2*Math.random()-1)*n}while(r>=1);return e=a*Math.sqrt(-2*Math.log(r)/r),t*e+l}
    
    const NUM_PARTICLES = 600;
    const PARTICLE_SIZE = 0.5; // View heights
    const SPEED = 20000; // Milliseconds
    
    let particles = [];
    
    function rand(low, high) {
      return Math.random() * (high - low) + low;
    }
    
    function createParticle(canvas) {
      const colour = {
        r: 255,
        g: randomNormal({ mean: 125, dev: 20 }),
        b: 50,
        a: rand(0, 1),
      };
      return {
        x: -2,
        y: -2,
        diameter: Math.max(0, randomNormal({ mean: PARTICLE_SIZE, dev: PARTICLE_SIZE / 2 })),
        duration: randomNormal({ mean: SPEED, dev: SPEED * 0.1 }),
        amplitude: randomNormal({ mean: 16, dev: 2 }),
        offsetY: randomNormal({ mean: 0, dev: 10 }),
        arc: Math.PI * 2,
        startTime: performance.now() - rand(0, SPEED),
        colour: `rgba(${colour.r}, ${colour.g}, ${colour.b}, ${colour.a})`,
      }
    }
    
    function moveParticle(particle, canvas, time) {
      const progress = ((time - particle.startTime) % particle.duration) / particle.duration;
      return {
        ...particle,
        x: progress,
        y: ((Math.sin(progress * particle.arc) * particle.amplitude) + particle.offsetY),
      };
    }
    
    function drawParticle(particle, canvas, ctx) {
      canvas = document.getElementById('particle-canvas');
      const vh = canvas.height / 100;
    
      ctx.fillStyle = particle.colour;
      ctx.beginPath();
      ctx.ellipse(
        particle.x * canvas.width,
        particle.y * vh + (canvas.height / 2),
        particle.diameter * vh,
        particle.diameter * vh,
        0,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
    
    function draw(time, canvas, ctx) {
      // Move particles
      particles.forEach((particle, index) => {
        particles[index] = moveParticle(particle, canvas, time);
      })
    
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    
      // Draw the particles
      particles.forEach((particle) => {
        drawParticle(particle, canvas, ctx);
      })
    
      // Schedule next frame
      requestAnimationFrame((time) => draw(time, canvas, ctx));
    }
    
    function initializeCanvas() {
      let canvas = document.getElementById('particle-canvas');
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      let ctx = canvas.getContext("2d");
    
      window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        ctx = canvas.getContext("2d");
      })
    
      return [canvas, ctx];
    }
    
    function startAnimation() {
      const [canvas, ctx] = initializeCanvas();
    
      // Create a bunch of particles
      for (let i = 0; i < NUM_PARTICLES; i++) {
        particles.push(createParticle(canvas));
      }
      
      requestAnimationFrame((time) => draw(time, canvas, ctx));
    };
    
    // Start animation when document is loaded
    (function () {
      if (document.readystate !== 'loading') {
        startAnimation();
      } else {
        document.addEventListener('DOMContentLoaded', () => {
          startAnimation();
        })
      }
    }());
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form-wrapper {
    min-width: 300px;
    border-radius: 10px;
    padding: 30px 50px;
    background-color: rgba(231, 231, 231, 0.9);
    z-index: 999;
    .logo-head {
      color: #66b1ff;
      font-weight: bold;
      font-size: 30px;
      padding-bottom: 10px;
      text-align: center;
    }
    .login-btn {
      width: 100%;
    }
  }
}
#particle-canvas {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to bottom, rgb(10, 10, 50) 0%,rgb(60, 10, 60) 100%);
}
</style>
