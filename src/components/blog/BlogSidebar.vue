<template>
  <div class="blog-sidebar-simple">
    <div class="sidebar-card tag-card">
      <div class="tags">
        <span v-for="tag in allTags" :key="tag" class="tag" @click="$emit('select-tag', tag)">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const allTags = ['资料', '工具', '碎碎念', '兴趣', '项目', '其他']
</script>
<style scoped>
.blog-sidebar-simple {
  width: 180px;
  margin: 0 auto;
  padding-top: 32px;
}
.sidebar-card {
  background: #fff;
  border-radius: 10px;
  border: 1px solid #f0f0f0;
  padding: 18px 12px;
  color: #6599a7;
  box-shadow: none;
  animation: fade-in 0.8s;
}
.tag-card .tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 0;
}
.tag {
  background: #f0f4f8;
  color: #6599a7;
  border-radius: 5px;
  padding: 2px 10px;
  font-size: 0.95rem;
  cursor: pointer;
  margin-bottom: 6px;
  border: 1px solid #e0e6ea;
  transition: background 0.2s, color 0.2s;
}
.tag:hover {
  background: #6599a7;
  color: #fff;
}
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style> 