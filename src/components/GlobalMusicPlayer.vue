<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useMusicStore } from '@/stores/music'
const aplayerRef = ref<HTMLElement>()
const musicStore = useMusicStore()
let lrcInterval: number | null = null

onMounted(() => {
  if (aplayerRef.value) {
    // Initialize player with error handling
    musicStore.initPlayer(aplayerRef.value).catch(err => {
      console.warn('音乐播放器初始化失败:', err)
    })
    
    // Use requestAnimationFrame for better performance
    let lastUpdate = 0
    const updateLrc = (timestamp: number) => {
      if (timestamp - lastUpdate > 500) { // Update every 500ms
        musicStore.updateLrc()
        lastUpdate = timestamp
      }
      if (lrcInterval) {
        lrcInterval = requestAnimationFrame(updateLrc)
      }
    }
    
    // Start lyric updates only when player is initialized
    const checkAndStart = () => {
      if (musicStore.getInitialized()) {
        lrcInterval = requestAnimationFrame(updateLrc)
      } else {
        setTimeout(checkAndStart, 100)
      }
    }
    
    checkAndStart()
  }
})

onUnmounted(() => {
  if (lrcInterval) {
    cancelAnimationFrame(lrcInterval)
    lrcInterval = null
  }
})
</script>
<template>
  <div style="display:none"><div id="aplayer" ref="aplayerRef"></div></div>
</template> 