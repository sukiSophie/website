import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import APlayer from 'aplayer'

export const useMusicStore = defineStore('music', () => {
    const server = 'netease'
    const type = 'playlist'
    const id = '13939160715'
    const musicData = ref<any[]>([])
    const currentIndex = ref(0)
    const isPlaying = ref(false)
    const currentMusic = ref<{ name: string; artist: string; cover?: string }>({ name: '', artist: '', cover: '' })
    const currentTime = ref(0)
    const duration = ref(0)
    const volume = ref(0.5)
    const currentLrc = ref('')
    let ap: any = null
    let isInitialized = ref(false)
    let initPromise: Promise<void> | null = null

    async function initPlayer(container: HTMLElement) {
        // Return existing promise if initialization is in progress
        if (initPromise) {
            return initPromise
        }
        
        // Return immediately if already initialized
        if (ap) {
            return Promise.resolve()
        }
        
        // Create initialization promise
        initPromise = (async () => {
            try {
                // Add timeout to prevent hanging requests
                const controller = new AbortController()
                const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
                
                const response = await axios.get(
                    `https://api.injahow.cn/meting/?server=${server}&type=${type}&id=${id}`,
                    { signal: controller.signal }
                )
                
                clearTimeout(timeoutId)
                
                musicData.value = response.data
                if (musicData.value && musicData.value.length > 0) {
                    ap = new APlayer({
                        container,
                        order: 'random',
                        preload: 'none', // Changed from 'auto' to 'none' to reduce initial load
                        listMaxHeight: '336px',
                        volume: 0.5,
                        mutex: true,
                        lrcType: 3,
                        audio: musicData.value,
                    })
                    bindEvents()
                    updateCurrent()
                    updatePlayState()
                    updateLrc()
                    updateTime()
                    isInitialized.value = true
                }
            } catch (error) {
                console.error('音乐播放器加载失败:', error)
                // Reset promise so initialization can be retried
                initPromise = null
                throw error
            }
        })()
        
        return initPromise
    }
    
    function bindEvents() {
        if (!ap) return
        ap.on('play', () => { updateCurrent(); updatePlayState() })
        ap.on('pause', () => { updatePlayState() })
        ap.on('listswitch', () => { updateCurrent(); updateLrc() })
        ap.on('switch', () => { updateCurrent(); updateLrc() })
        ap.on('timeupdate', () => { updateTime(); updateLrc() })
    }
    
    function updateCurrent() {
        if (!ap) return
        const idx = ap.list?.index ?? 0
        currentIndex.value = idx
        const audio = ap.list?.audios?.[idx] || {}
        currentMusic.value = {
            name: audio.name || '',
            artist: audio.artist || '',
            cover: audio.cover || ''
        }
    }
    
    function updateLrc() {
        const lrcEl = document.querySelector('.aplayer-lrc-current')
        currentLrc.value = lrcEl ? lrcEl.textContent || '' : ''
    }
    
    function updateTime() {
        if (!ap) return
        currentTime.value = ap.audio.currentTime || 0
        duration.value = ap.audio.duration || 0
    }
    
    function updatePlayState() {
        isPlaying.value = ap?.audio?.paused === false
    }
    
    function play() { 
        if (!ap) return
        ap.play() 
    }
    
    function pause() { 
        if (!ap) return
        ap.pause() 
    }
    
    function toggle() { 
        if (!ap) return
        ap.toggle() 
    }
    
    function skipBack() { 
        if (!ap) return
        ap.skipBack() 
    }
    
    function skipForward() { 
        if (!ap) return
        ap.skipForward() 
    }
    
    function seek(t: number) { 
        if (!ap) return
        ap.seek(t) 
    }
    
    function setVolume(v: number) { 
        if (!ap) return
        ap.volume(v, true); volume.value = v 
    }
    
    function playIndex(idx: number) { 
        if (!ap) return
        ap.list?.switch?.(idx) 
    }
    
    function getAP() { return ap }
    
    function getInitialized() { return isInitialized.value }
    
    return {
        musicData,
        currentIndex,
        isPlaying,
        currentMusic,
        currentTime,
        duration,
        volume,
        currentLrc,
        initPlayer,
        play,
        pause,
        toggle,
        skipBack,
        skipForward,
        seek,
        setVolume,
        playIndex,
        getAP,
        updateLrc,
        getInitialized,
        isInitialized
    }
}) 