<template>
  <div class="container">
    <Menu />
    <transition name="fade" mode="in-out">
      <img 
        :key="currentBackground" 
        :src="currentBackground" 
        alt="背景图片" 
        class="bg-img"
        loading="lazy"
      >
    </transition>
    <div class="row">
      <div class="left">
        <LeftBox />
      </div>
      <div class="right">
        <div class="right-content">
          <TimeDisplay class="card-component time-display" />
          <div class="card-component music-component music-empty">
            <div class="music-empty-tip">音乐面板请点击左上角菜单上方操作</div>
          </div>
          <div class="card-component empty-component">
            <div class="empty-content">
              <i class="fa-solid fa-lightbulb"></i>
              <h3>空白区域</h3>
              <p>这里可以放置您想要展示的内容</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from '@/components/Menu.vue';
import LeftBox from '@/components/LeftBox.vue';
import TimeDisplay from '@/components/TimeDisplay.vue';
import Pet from '@/components/Pet.vue';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import img0 from '@/assets/imgs/Background/0.png'
import img1 from '@/assets/imgs/Background/1.webp'
import img2 from '@/assets/imgs/Background/2.jpg'

const backGround = [img0, img1, img2]
const currentId = ref(0)
const currentBackground = computed(() => backGround[currentId.value])
let intervalId: number | null = null

// 预加载所有背景图片
function preloadImages() {
  backGround.forEach(src => {
    const img = new window.Image();
    img.src = src;
  });
}

const nextId = () => { currentId.value = (currentId.value + 1) % backGround.length }
const startAnimation = () => { intervalId = setInterval(nextId, 3000) }
const stopAnimation = () => { if (intervalId) clearInterval(intervalId); intervalId = null }

onMounted(() => {
  preloadImages();
  startAnimation();
})
onUnmounted(() => stopAnimation())
</script>

<style scoped>
.container {
  width: 100vw;
  /* height: 100vh; */
  position: relative;
  overflow: hidden;
}
.bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.6;
  transition: opacity 0.5s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}

.row {
  display: flex;
  width: 100%;
  height: 100vh;
}
.left, .right {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.right-content {
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 500px;
  height: 90%;
  padding: 20px;
  gap: 30px;
}
.card-component {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  padding: 20px;
  backdrop-filter: blur(10px);
  animation: fade-in 0.8s ease-out;
  height: 180px;
  overflow: hidden;
}
.card-component:hover {
  transform: translateY(-5px);
  background-color: rgba(255, 255, 255, 0.15);
}
.time-display { animation-delay: 0s; }
.empty-component { animation-delay: 0.2s; display: flex; justify-content: center; align-items: center; }
.empty-content { text-align: center; color: white; }
.empty-content i { font-size: 2.5rem; margin-bottom: 10px; color: rgba(255, 255, 255, 0.7); }
.empty-content h3 { font-size: 1.2rem; margin-bottom: 5px; font-weight: 500; }
.empty-content p { font-size: 0.9rem; color: rgba(255, 255, 255, 0.7); }
.music-component { animation-delay: 0.4s; height: auto; min-height: 180px; }
.music-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.music-empty-tip {
  color: #6599a7;
  font-size: 1.08rem;
  opacity: 0.8;
  text-align: center;
}
.Pet { position: absolute; bottom: 0; right: 0; z-index: 2; }
@keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
</style> 