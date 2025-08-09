<template>
  <div class="blog-detail-bg">
    <transition name="fade" mode="in-out">
      <img :key="currentBackground" :src="currentBackground" alt="背景图片" class="bg-img">
    </transition>
    <div class="blog-detail-center">
      <div class="blog-detail-glass">
        <button class="back-icon-btn" @click="goBack"><i class="fa-solid fa-arrow-left"></i></button>
        <component :is="blogComponent" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import img0 from '@/assets/imgs/Background/0.png'
import img1 from '@/assets/imgs/Background/1.webp'
import img2 from '@/assets/imgs/Background/2.jpg'
import { defineAsyncComponent } from 'vue'
const backGround = [img0, img1, img2]
const currentId = ref(0)
const currentBackground = computed(() => backGround[currentId.value])
let intervalId: number | null = null
const nextId = () => { currentId.value = (currentId.value + 1) % backGround.length }
const startAnimation = () => { intervalId = setInterval(nextId, 3000) }
const stopAnimation = () => { if (intervalId) clearInterval(intervalId); intervalId = null }
onMounted(() => startAnimation())
onUnmounted(() => stopAnimation())
const route = useRoute()
const router = useRouter()
const blogMap: Record<string, string> = {
  '1': 'Blog20240707',
  // 其他博客id: 组件名
}
const blogComponent = computed(() => {
  const comp = blogMap[route.params.id as string]
  if (!comp) return null
  return defineAsyncComponent(() => import(`../components/blog/posts/${comp}.vue`))
})
function goBack() {
  router.push('/blog')
}
</script>
<style scoped>
.blog-detail-bg {
  width: 100%;
  min-width: 0;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: none;
}
.bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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

.blog-detail-center {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 60px;
}
.blog-detail-glass {
  max-width: 760px;
  width: 100%;
  margin: 0 auto;
  background: rgba(255,255,255,0.18);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  border: 1px solid rgba(255,255,255,0.18);
  backdrop-filter: blur(14px);
  color: #6599a7;
  padding: 48px 36px 36px 36px;
  min-height: 60vh;
  word-break: break-word;
  position: relative;
}
.back-icon-btn {
  position: absolute;
  top: 18px;
  left: 18px;
  background: rgba(101,153,167,0.12);
  color: #6599a7;
  border: none;
  border-radius: 50%;
  padding: 8px 12px;
  font-size: 1.3rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  z-index: 10;
}
.back-icon-btn:hover {
  background: #6599a7;
  color: #fff;
}
@media (max-width: 900px) {
  .blog-detail-glass {
    max-width: 98vw;
    padding: 18px 4vw;
  }
}
</style> 