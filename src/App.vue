<template>
  <div class="general">
    <h1 class="heading" @click="router.push({ name: 'listCharacters' })">Rick and Morty</h1>
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="footer">
      <a href="https://github.com/biigue"
        >Feito com <img src="~@/assets/icon.png" /> por bianca cardoso</a
      >
  </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const router = useRouter()
    return {
      router,
    }
  }
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overscroll-behavior: contain;
  margin: -20px -8px;
}
.heading {
  cursor: pointer;
  display: flex;
  justify-content: center;
  font-size: 100px;
  line-height: 1;
  color: #02b1c8;
  margin: 0;
  text-shadow: 0.02em 0.02em 0.02em #7ffa67, -0.02em -0.02em 0.02em #7ffa67, 0 0 0.2em #7ffa67;
  animation: textShadow 2s linear infinite alternate;
  padding: 55px 0 55px 0;
}
.general {
  min-height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.8)),
    #111 url('~@/assets/background.jpg') no-repeat center fixed;
  background-size: cover;
}
.footer {
  padding: 20px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  > a {
    text-decoration: none;
    font-size: 18px;
    display: flex;
    align-items: center;
    color: white;
  }
  img {
    width: 16px;
    height: 20px;
    padding: 0 6px;
  }
}
</style>
