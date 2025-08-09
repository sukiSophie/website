<template>
  <div class="blog-container-glass">
    <Menu v-if="!showBlogDetail" />
    <transition name="fade" mode="in-out">
      <img :key="currentBackground" :src="currentBackground" alt="背景图片" class="bg-img">
    </transition>
    <template v-if="!showBlogDetail">
      <div class="blog-row">
        <div class="blog-list-glass">
          <BlogList :posts="posts" />
        </div>
        <div class="blog-right-glass">
          <RightBox />
          <BlogTimeline :articles="timelineArticles" />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="blog-detail-glass">
        <component :is="currentBlogComponent" />
        <div style="text-align:center;margin:32px 0;">
          <button class="more-btn" @click="closeBlogDetail">返回列表</button>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import Menu from '@/components/Menu.vue';
import BlogList from '../components/blog/BlogList.vue'
import RightBox from '@/components/RightBox.vue';
import BlogTimeline from '../components/blog/BlogTimeline.vue'
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { defineAsyncComponent } from 'vue';
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
// 自动聚合所有博客组件的元信息
const modules = import.meta.glob('../components/blog/posts/*.vue', { eager: true })
const posts = computed(() =>
  Object.values(modules)
    .map((mod: any) => mod.default?.blogMeta && { ...mod.default.blogMeta, content: mod.default?.name || '' })
    .filter(Boolean)
)
const timelineArticles = computed(() =>
  [...posts.value].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5)
)
// 全屏博客详情模式
const showBlogDetail = ref(false)
const detailId = ref<number|null>(null)
function openBlogDetail(id: number) {
  showBlogDetail.value = true
  detailId.value = id
}
function closeBlogDetail() {
  showBlogDetail.value = false
  detailId.value = null
}
const currentPost = computed(() => posts.value.find(p => p.id === detailId.value))
const currentBlogComponent = computed(() => {
  if (!currentPost.value || !currentPost.value.content) return null
  return defineAsyncComponent(() => import(`../components/blog/posts/${currentPost.value.content}.vue`))
})
</script>
<style scoped>
.blog-container-glass {
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
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.5;
  transition: opacity 0.5s ease;
}
.blog-row {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 48px;
  width: 100%;
  min-width: 0;
  max-height: 100vh;
  padding-top: 60px;
}
.blog-list-glass {
  flex: 1 1 600px;
  max-width: 600px;
  background: rgba(255,255,255,0.13);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  border: 1px solid rgba(255,255,255,0.18);
  backdrop-filter: blur(10px);
  padding: 40px 32px 32px 32px;
  color: #6599a7;
  display: flex;
  flex-direction: column;
  min-height: 480px;
}
.blog-right-glass {
  flex: 0 0 420px;
  max-width: 420px;
  background: rgba(255,255,255,0.13);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  border: 1px solid rgba(255,255,255,0.18);
  backdrop-filter: blur(10px);
  padding: 40px 32px 32px 32px;
  color: #6599a7;
  display: flex;
  flex-direction: column;
  min-height: 480px;
}
@media (max-width: 1100px) {
  .blog-row {
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding-top: 30px;
  }
  .blog-right-glass {
    margin-top: 24px;
    max-width: 90vw;
    width: 90vw;
  }
  .blog-list-glass {
    max-width: 90vw;
    width: 90vw;
  }
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
</style> 