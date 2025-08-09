<script setup lang="ts">
import { defineProps, computed } from 'vue'
const props = defineProps<{ articles: { title: string, date: string }[] }>()
const sortedArticles = computed(() =>
  [...props.articles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5)
)
</script>
<template>
  <div class="timeline-glass">
    <div class="timeline-title">最新更新</div>
    <ul class="timeline-list">
      <li v-for="(item, idx) in sortedArticles" :key="idx">
        <span class="timeline-dot"></span>
        <span class="timeline-date">{{ item.date }}</span>
        <span class="timeline-title-text">{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.timeline-glass {
  margin-top: 32px;
  padding: 18px 20px 10px 20px;
  border-radius: 18px;
  background: rgba(255,255,255,0.18);
  box-shadow: 0 4px 32px 0 rgba(0,0,0,0.08);
  backdrop-filter: blur(12px);
  color: #6599a7;
}
.timeline-title {
  font-size: 1.1em;
  font-weight: bold;
  margin-bottom: 10px;
  color: #6599a7;
}
.timeline-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.timeline-list li {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.timeline-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #6599a7;
  margin-right: 10px;
}
.timeline-date {
  font-size: 0.95em;
  margin-right: 10px;
  color: #6599a7;
}
.timeline-title-text {
  font-size: 1em;
  color: #6599a7;
}
</style> 