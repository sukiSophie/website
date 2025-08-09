<template>
  <div :class="['music-container', { 'music-modal': mode === 'modal' }]">
    <div v-if="mode === 'modal'" class="music-modal-layout">
      <div class="music-modal-left">
        <div class="music-cover-modal">
          <img :src="currentMusic.cover" alt="cover" v-if="currentMusic.cover" />
        </div>
        <div class="music-info-modal">
          <div class="music-title-modal">{{ currentMusic.name }}</div>
          <div class="music-artist-modal">{{ currentMusic.artist }}</div>
        </div>
        <div class="music-progress-modal">
          <input type="range" min="0" :max="duration" step="1" v-model="currentTime" @input="seek" />
          <div class="music-time-modal">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</div>
        </div>
        <div class="music-controls-modal">
          <button @click="skipBack"><i class="fa-solid fa-backward"></i></button>
          <button @click="toggle" class="play-btn-modal">
            <i :class="isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'"></i>
          </button>
          <button @click="skipForward"><i class="fa-solid fa-forward"></i></button>
        </div>
        <div class="music-volume-modal">
          <i class="fa-solid fa-volume-high" id="music-volume"></i>
          <input type="range" min="0" max="1" step="0.01" v-model.number="volume" @input="changeVolumeModal" />
        </div>
      </div>
      <div class="music-modal-right">
        <!-- <div class="music-lrc-modal">
          <div v-if="currentLrc" class="lrc-line-modal">{{ currentLrc }}</div>
        </div> -->
        <div class="music-list-modal">
          <div class="music-list-title">播放列表</div>
          <ul>
            <li v-for="(item, idx) in musicData" :key="item.name + idx" :class="{ active: idx === currentIndex }" @click="playIndex(idx)">
              <span>{{ item.name }} - {{ item.artist }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else>
      <!-- 原有迷你面板 -->
      <div class="music-controls">
        <div class="music-info">
          <div class="music-name" id="music-name">
            <span>{{ currentMusic.name ? currentMusic.name + ' - ' + currentMusic.artist : '点击播放音乐' }}</span>
          </div>
          <div class="music-lyrics" id="lrc">
            <span class="lrc-show">
              <!-- <i class="fa-solid fa-music"></i> -->
              <span>欢迎来到我的网站</span>
              <!-- <i class="fa-solid fa-music"></i> -->
            </span>
          </div>
        </div>
        
        <div class="music-buttons">
          <button id="last" class="control-btn" @click="skipBack">
            <i class="fa-solid fa-backward"></i>
          </button>
          <button id="play" class="control-btn play-btn" @click="toggle">
            <i class="fa-solid fa-play"></i>
          </button>
          <button id="next" class="control-btn" @click="skipForward">
            <i class="fa-solid fa-forward"></i>
          </button>
        </div>
        
        <div class="music-volume">
          <button id="volume-ico" class="volume-btn" @click="toggleMute">
            <i class="fa-solid fa-volume-high"></i>
          </button>
          <input 
            id="volume" 
            type="range" 
            min="0" 
            max="1" 
            step="0.1" 
            value="0.5"
            @input="changeVolume"
            class="volume-slider"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMusicStore } from '@/stores/music'
const props = defineProps({ mode: { type: String, default: '' } })
const musicStore = useMusicStore()
const musicData = computed(() => musicStore.musicData)
const currentMusic = computed(() => musicStore.currentMusic)
const currentIndex = computed(() => musicStore.currentIndex)
const isPlaying = computed(() => musicStore.isPlaying)
const currentTime = computed({
  get: () => musicStore.currentTime,
  set: v => musicStore.seek(v)
})
const duration = computed(() => musicStore.duration)
const volume = computed({
  get: () => musicStore.volume,
  set: v => musicStore.setVolume(v)
})
const currentLrc = computed(() => musicStore.currentLrc)
const play = () => musicStore.play()
const pause = () => musicStore.pause()
const toggle = () => musicStore.toggle()
const skipBack = () => musicStore.skipBack()
const skipForward = () => musicStore.skipForward()
const playIndex = (idx: number) => musicStore.playIndex(idx)
const formatTime = (s: number) => {
  if (!s) return '00:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
}
const seek = () => {} // 由v-model自动调用
const changeVolume = () => {} // 由v-model自动调用
const changeVolumeModal = () => {} // 由v-model自动调用
const toggleMute = () => {
  if (volume.value > 0) volume.value = 0
  else volume.value = 0.5
}
</script>

<style scoped>
.music-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #6599a7;
}

#aplayer {
  display: none; /* 隐藏原始播放器，使用自定义界面 */
}

.music-controls {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding: 10px 0;
}

.music-info {
  text-align: center;
  margin-bottom: 20px;
}

.music-name {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.music-name i {
  color: #6599a7;
}

.music-lyrics {
  font-size: 0.9rem;
  color: #6599a7;
  min-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lrc-show {
  display: flex;
  align-items: center;
  gap: 8px;
  animation: lrc-scroll 10s linear infinite;
}

.lrc-show i {
  color: #6599a7;
  font-size: 0.8rem;
}

@keyframes lrc-scroll {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

.music-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.control-btn {
  background: none;
  border: none;
  color: #6599a7;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: scale(1.1);
}

.play-btn {
  font-size: 1.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  width: 50px;
  height: 50px;
}

.play-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.music-volume {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.volume-btn {
  background: none;
  border: none;
  color: #6599a7;
  font-size: 1rem;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.volume-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.volume-slider {
  width: 80px;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  -webkit-appearance: none;
  cursor: pointer;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
}

.volume-slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  border: none;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .music-buttons {
    gap: 10px;
  }
  
  .control-btn {
    font-size: 1rem;
    padding: 8px;
  }
  
  .play-btn {
    font-size: 1.3rem;
    width: 45px;
    height: 45px;
  }
  
  .music-name {
    font-size: 1rem;
  }
  
  .music-lyrics {
    font-size: 0.8rem;
  }
}

.music-modal {
  width: 700px;
  max-width: 90vw;
  min-height: 320px;
  color: #6599a7;
  background: none;
}
.music-modal-layout {
  display: flex;
  gap: 32px;
  width: 100%;
  min-height: 320px;
}
.music-modal-left {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}
.music-cover-modal img {
  width: 160px;
  height: 160px;
  border-radius: 18px;
  object-fit: cover;
  box-shadow: 0 4px 18px rgba(101,153,167,0.13);
  margin-bottom: 10px;
}
.music-title-modal {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 4px;
  color: #6599a7;
  min-height: 1.7em;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.music-artist-modal {
  font-size: 1.05rem;
  color: #6599a7;
  opacity: 0.8;
  margin-bottom: 8px;
  min-height: 1.3em;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.music-progress-modal {
  width: 100%;
  margin: 8px 0 0 0;
}
.music-progress-modal input[type=range] {
  width: 100%;
}
.music-time-modal {
  font-size: 0.95rem;
  color: #6599a7;
  opacity: 0.7;
  margin-top: 2px;
}
.music-controls-modal {
  display: flex;
  gap: 18px;
  margin: 10px 0 0 0;
  align-items: center;
  justify-content: center;
  position: relative;
}
.music-controls-modal button {
  background: none;
  border: none;
  color: #6599a7;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 50%;
  padding: 8px 12px;
  transition: background 0.2s;
}
.music-controls-modal .play-btn-modal {
  font-size: 2.1rem;
  background: rgba(101,153,167,0.08);
  padding: 10px 18px;
  position: relative;
  z-index: 2;
}
.music-controls-modal button:hover {
  background: rgba(101,153,167,0.12);
}
.music-volume-modal {
  display: inline-block;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 12px;

  width: 100%;
}

#music-volume{
  margin-top: 4px;
  margin-left:60px;
  margin-right:10px;
}

.music-volume-modal input[type=range] {
  width: 180px;
  margin-top: 4px;
}
.music-modal-right {
  flex: 1.1;
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 240px;
  align-items: flex-start;
}
.music-lrc-modal {
  background: rgba(255,255,255,0.13);
  border-radius: 12px;
  padding: 16px 18px;
  margin-top: 40px;
  margin-bottom: 8px;
  min-height: 2.2em;
  color: #6599a7;
  font-size: 1.08rem;
  box-shadow: 0 2px 8px rgba(101,153,167,0.07);
  text-align: center;
  width: 80%;
  max-width: 320px;
  word-break: break-all;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: min-height 0.2s;
}
.lrc-line-modal {
  text-align: center;
  font-size: 1.08rem;
  color: #6599a7;
  width: 100%;
  word-break: break-all;
  white-space: pre-line;
}
.music-list-modal {
  background: rgba(255,255,255,0.13);
  border-radius: 12px;
  padding: 0 18px;
  margin-top: 24px;
  color: #6599a7;
  font-size: 1.01rem;
  box-shadow: 0 2px 8px rgba(101,153,167,0.07);
  height: 500px;
  overflow-y: auto;
  min-width: 260px;
  max-width: 320px;
}

.music-list-title {
  font-size: 1.08rem;
  font-weight: 600;
  margin-top:16px;
  margin-bottom: 8px;
  text-align: center;
}
.music-list-modal ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.music-list-modal li {
  padding: 6px 0;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s;
  color: #6599a7;
}
.music-list-modal li.active, .music-list-modal li:hover {
  background: rgba(101,153,167,0.13);
  color: #fff;
}
@media (max-width: 900px) {
  .music-modal {
    width: 98vw;
    min-width: 0;
  }
  .music-modal-layout {
    flex-direction: column;
    gap: 18px;
  }
  .music-modal-left, .music-modal-right {
    width: 100%;
    min-width: 0;
    align-items: center;
  }
}
</style> 