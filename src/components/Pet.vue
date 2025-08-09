<template>
  <div>
    <div
      class="Pet"
      @click="handleClick"
      @contextmenu.prevent="handleRightClick"
      :style="{ left: position.x + 'px', top: position.y + 'px' }"
    >
      <img :src="currentImage" alt="Firefly" class="dynamicPet" loading="lazy" />
    </div>
    <Teleport to="body">
      <PetDialog
        v-if="showDialog"
        :position="dialogPosition"
        @close="closeDialog"
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import PetDialog from '@/components/PetDialog.vue'

// 图片资源
import img0 from '@/assets/imgs/Pet/sleep/0.png'
import img1 from '@/assets/imgs/Pet/sleep/1.png'
import img2 from '@/assets/imgs/Pet/sleep/2.png'
import img3 from '@/assets/imgs/Pet/sleep/3.png'
import img4 from '@/assets/imgs/Pet/mention/0.png'
import img5 from '@/assets/imgs/Pet/mention/1.png'
import img6 from '@/assets/imgs/Pet/mention/2.png'
import img7 from '@/assets/imgs/Pet/mention/3.png'
import img8 from '@/assets/imgs/Pet/standby/0.png'
import img9 from '@/assets/imgs/Pet/standby/1.png'
import img10 from '@/assets/imgs/Pet/standby/2.png'
import img11 from '@/assets/imgs/Pet/standby/3.png'
import img12 from '@/assets/imgs/Pet/standby/4.png'
import img13 from '@/assets/imgs/Pet/standby/5.png'

// 动画组定义
const groups = {
  sleep: [img0, img1, img2, img3],
  mention: [img4, img5, img6, img7],
  standby: [img8, img9, img10, img11, img12, img13]
}

const currentGroup = ref(groups.sleep)
const currentIndex = ref(0)
const showDialog = ref(false)
const dialogPosition = ref({ x: 0, y: 0 })

// 自动计算当前图片（响应式）
const currentImage = computed(() => currentGroup.value[currentIndex.value])

let intervalId: number | null = null
const position = ref({ x: 1380, y: 720 })
const isFollowing = ref(false)
let dragOffset = { x: 0, y: 0 }
let mouseDownTime = 0

// 切换图片
const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % currentGroup.value.length
}

// 控制轮播
const startAnimation = (group: keyof typeof groups, speed = 250) => {
  stopAnimation()
  currentGroup.value = groups[group]
  currentIndex.value = 0 // 重置索引，防止越界
  intervalId = window.setInterval(nextImage, speed)
}

const stopAnimation = () => {
  if (intervalId) clearInterval(intervalId)
  intervalId = null
}

// 点击事件处理
const handleClick = (event: MouseEvent) => {
  if (isFollowing.value) {
    stopFollowing()
  } else {
    startFollowing(event)
  }
}

// 跟随逻辑
const startFollowing = (event: MouseEvent) => {
  isFollowing.value = true
  startAnimation('mention')

  const petRect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  dragOffset = {
    x: event.clientX - petRect.left,
    y: event.clientY - petRect.top
  }

  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', endCheck)
  mouseDownTime = Date.now()
}

const stopFollowing = () => {
  isFollowing.value = false
  startAnimation('standby')
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseup', endCheck)
}

const onMove = (e: MouseEvent) => {
  if (!isFollowing.value) return
  position.value = {
    x: e.clientX - dragOffset.x,
    y: e.clientY - dragOffset.y
  }
}

const endCheck = () => {
  if (Date.now() - mouseDownTime < 200) stopFollowing()
}

const handleRightClick = (event:MouseEvent) => {
  // 计算对话框位置，避免遮挡鼠标指针
  dialogPosition.value = {
    x: event.clientX + 20,
    y: event.clientY + 20
  }
  showDialog.value = true
}

const closeDialog = () => {
  showDialog.value = false
}

// 生命周期钩子
onMounted(() => {
  // 预加载所有动画帧图片
  Object.values(groups).flat().forEach(src => {
    const img = new window.Image();
    img.src = src;
  });
  startAnimation('sleep')
})
onUnmounted(() => stopAnimation())
</script>

<style scoped>
  .Pet {
    width: 100px;
    height: 100px;
    position: fixed;
    cursor: pointer;
    user-select: none;
    z-index: 9999;
  }
  .dynamicPet{
    width:100%;
  }
</style>