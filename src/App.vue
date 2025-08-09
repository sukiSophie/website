<template>
  <div>
    <GlobalMusicPlayer />
    <Menu class="menu-fixed" @open-music="showMusic = true" />
    <MusicModal v-if="showMusic" @close="showMusic = false" />
    <router-view />
  </div>
  <Pet />
</template>

<script setup lang="ts" name="App">
import { ref } from 'vue';
import Menu from '@/components/Menu.vue';
import MusicModal from '@/components/MusicModal.vue';
import GlobalMusicPlayer from '@/components/GlobalMusicPlayer.vue';
import Pet from '@/components/Pet.vue';
const showMusic = ref(false);
</script>

<style scoped>
.music-menu-bar {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 3000;
  display: flex;
  align-items: flex-start;
  gap: 18px;
  width: auto;
  pointer-events: none;
}
.menu-fixed {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 3100;
}
.global-music-panel {
  z-index: 3000;
  width: 340px;
  max-width: 70vw;
  pointer-events: auto;
}
@media (max-width: 700px) {
  .global-music-panel {
    width: 180px;
    min-width: 120px;
    max-width: 60vw;
  }
  .music-menu-bar {
    gap: 8px;
  }
}
</style>
