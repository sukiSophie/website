<template>
  <div>
    <div class="menu-button" @click="showMenu = true">
      <i class="fa-solid fa-bars"></i>
    </div>
    <transition name="slide" mode="out-in">
      <div class="menu-container" v-if="showMenu">
        <div class="menu-header">
          <span>菜单</span>
          <button class="close-button" @click="showMenu = false">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="menu-content">
          <router-link to="/" class="menu-item" @click="showMenu = false">
            <i class="fa-solid fa-home"></i>
            <span>首页</span>
          </router-link>
          <router-link to="/blog" class="menu-item" @click="showMenu = false">
            <i class="fa-solid fa-book"></i>
            <span>博客</span>
          </router-link>
          <div class="menu-item" @click="openMusic">
            <i class="fa-solid fa-music"></i>
            <span>音乐</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const showMenu = ref(false)
const emit = defineEmits(['open-music'])
function openMusic() {
  showMenu.value = false
  emit('open-music')
}
</script>

<style scoped>
.menu-button {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 2000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  font-size: 1.5rem;
  color: #6599a7;
}
.menu-button:hover {
  transform: scale(1.1);
  background-color: rgba(255, 255, 255, 0.2);
}
.menu-container {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 320px;
  max-height: 80vh;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  z-index: 2100;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: rgba(0, 0, 0, 0.2);
  color: #6599a7;
  font-size: 1.2rem;
  font-weight: 500;
}
.close-button {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  color: #6599a7;
}
.close-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}
.menu-content {
  padding: 20px;
  overflow-y: auto;
  max-height: calc(80vh - 60px);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.menu-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  color: #6599a7;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease;
  margin-bottom: 10px;
  text-decoration: none;
  font-size: 1.1rem;
}
.menu-item:hover, .router-link-exact-active.menu-item {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
  color: #fff;
}
.menu-item i {
  font-size: 1.2rem;
  width: 20px;
  text-align: center;
}
.menu-item span {
  font-size: 1rem;
}
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style> 