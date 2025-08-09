<template>
  <div class="music-modal-mask" @click.self="$emit('close')">
    <div class="music-modal-panel">
      <button class="music-modal-close" @click="$emit('close')">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <Music mode="modal" />
    </div>
  </div>
</template>
<script setup lang="ts">
import Music from './Music.vue'
</script>
<style scoped>
.music-modal-mask {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.25);
  z-index: 4000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.music-modal-panel {
  background: rgba(255,255,255,0.18);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  border: 1px solid rgba(255,255,255,0.22);
  backdrop-filter: blur(18px);
  padding: 38px 38px 32px 38px;
  min-width: 340px;
  min-height: 320px;
  max-width: 96vw;
  max-height: 90vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.music-modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  color: #6599a7;
  font-size: 2rem;
  cursor: pointer;
  z-index: 4100;
}
@media (max-width: 700px) {
  .music-modal-panel {
    padding: 18px 6px 18px 6px;
    min-width: 0;
    width: 98vw;
    max-width: 98vw;
  }
}
</style> 