<template>
  <div class="blog-list-glass-inner">
    <template v-if="showContentId === null">
      <div class="blog-list-toolbar">
        <input v-model="search" class="blog-search" placeholder="搜索..." />
        <div class="tag-filter">
          <!-- <span
            v-for="tag in allTags"
            :key="tag"
            :class="['tag', { active: selectedTag === tag }]"
            @click="selectTag(tag)"
          >{{ tag }}</span> -->
          <span class="tag clear" v-if="selectedTag" @click="clearTag">清除</span>
        </div>
      </div>
      <div class="blog-list">
        <div v-for="post in visiblePosts" :key="post.id" class="blog-item-glass">
          <div class="blog-meta">
            <span class="blog-date">{{ post.date }}</span>
            <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <h2 class="blog-title" @click="router.push(`/blog/${post.id}`)" style="cursor:pointer;" v-html="highlight(post.title)"></h2>
          <p class="blog-desc" v-html="highlight(post.desc)"></p>
        </div>
        <div v-if="visiblePosts.length === 0" class="no-result">暂无相关博客</div>
      </div>
      <div class="more-btn-area" v-if="filteredPosts.length > 3">
        <button class="more-btn" @click="prevPage" :disabled="page === 0">上一页</button>
        <span class="page-info">第{{ page + 1 }}/{{ totalPages }}页</span>
        <button class="more-btn" @click="showMore">下一页</button>
      </div>
    </template>
    <template v-else>
      <div class="blog-detail-glass">
        <component :is="currentBlogComponent" />
        <div style="text-align:center;margin:32px 0;">
          <button class="more-btn" @click="showContentId = null">返回列表</button>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watchEffect, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{ posts: any[] }>()
const router = useRouter()

const allTags = ['资料', '工具', '碎碎念', '兴趣', '项目', '其他']
const posts = computed(() => props.posts)

const search = ref('')
const selectedTag = ref('')
const page = ref(0)
const pageSize = 3

const filteredPosts = computed(() => {
  let result = posts.value
  if (search.value.trim()) {
    const keyword = search.value.trim().toLowerCase()
    result = result.filter(post =>
      post.title.toLowerCase().includes(keyword) ||
      post.desc.toLowerCase().includes(keyword) ||
      post.content.toLowerCase().includes(keyword) ||
      post.tags.some((tag:String) => tag.includes(keyword))
    )
  }
  if (selectedTag.value) {
    result = result.filter(post => post.tags.includes(selectedTag.value))
  }
  return result
})

const totalPages = computed(() => Math.ceil(filteredPosts.value.length / pageSize))

const visiblePosts = computed(() => {
  const start = page.value * pageSize
  return filteredPosts.value.slice(start, start + pageSize)
})

function showMore() {
  if (page.value + 1 >= totalPages.value) {
    page.value = 0
  } else {
    page.value++
  }
}

function selectTag(tag: string) {
  if (selectedTag.value === tag) {
    selectedTag.value = ''
  } else {
    selectedTag.value = tag
  }
  page.value = 0
}

function clearTag() {
  selectedTag.value = ''
  page.value = 0
}

function highlight(text: string) {
  if (!search.value.trim()) return text
  const keyword = search.value.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return text.replace(new RegExp(keyword, 'gi'), match => `<span class='hl'>${match}</span>`)
}

function prevPage() {
  if (page.value > 0) {
    page.value--
  } else {
    page.value = totalPages.value - 1
  }
}

watchEffect(() => {
  if (page.value >= totalPages.value) page.value = 0
})

const showContentId = ref<number|null>(null)
const currentBlogComponent = computed(() => {
  if (showContentId.value === null) return null
  const post = posts.value.find(p => p.id === showContentId.value)
  if (!post) return null
  // 动态import博客内容组件
  return defineAsyncComponent(() => import(`./posts/${post.content}.vue`))
})
</script>

<style scoped>
.blog-list-glass-inner {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.blog-list-toolbar {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 10px;
}
.blog-search {
  flex: 1;
  padding: 8px 14px;
  margin: 0 180px;
  border-radius: 8px;
  border: 1.5px solid #e0e6ea;
  font-size: 1rem;
  color: #6599a7;
  background: #f8fafb;
  outline: none;
  transition: border-color 0.2s;
}
.blog-search:focus {
  border-color: #6599a7;
}
.tag-filter {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.tag {
  background: #f0f4f8;
  color: #6599a7;
  border-radius: 5px;
  padding: 2px 10px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  user-select: none;
  border: 1px solid #e0e6ea;
}
.tag.active, .tag:hover {
  background: #6599a7;
  color: #fff;
}
.tag.clear {
  background: #eee;
  color: #6599a7;
  border: 1px solid #8bb7c7;
  margin-left: 8px;
}
.blog-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.blog-item-glass {
  background: rgba(255,255,255,0.13);
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  border: 1px solid rgba(255,255,255,0.18);
  padding: 24px 28px;
  color: #6599a7;
  backdrop-filter: blur(10px);
  transition: box-shadow 0.2s;
}
.blog-item-glass:hover {
  box-shadow: 0 2px 12px rgba(101,153,167,0.07);
}
.blog-meta {
  font-size: 0.93rem;
  color: #6599a7;
  margin-bottom: 6px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.blog-date {
  color: #6599a7;
}
.blog-title {
  font-size: 1.18rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: #6599a7;
}
.blog-desc {
  font-size: 1.01rem;
  color: #6599a7;
  margin-bottom: 0;
}
.hl {
  background: #ffe066;
  color: #333;
  border-radius: 3px;
  padding: 0 2px;
}
.no-result {
  text-align: center;
  color: #6599a7;
  font-size: 1.1rem;
  margin: 30px 0;
}
.more-btn-area {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  margin-top: 24px;
}
.more-btn {
  min-width: 64px;
  padding: 6px 18px;
  border-radius: 8px;
  border: none;
  background: rgba(101,153,167,0.12);
  color: #6599a7;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.more-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.page-info {
  color: #6599a7;
  font-size: 1.05rem;
  font-weight: 500;
  min-width: 80px;
  text-align: center;
}
.blog-detail-glass {
  max-width: 760px;
  margin: 48px auto 48px auto;
  background: rgba(255,255,255,0.18);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  border: 1px solid rgba(255,255,255,0.18);
  backdrop-filter: blur(14px);
  color: #6599a7;
  padding: 48px 36px 36px 36px;
  min-height: 60vh;
  word-break: break-word;
}
@media (max-width: 900px) {
  .blog-detail-glass {
    max-width: 98vw;
    padding: 18px 4vw;
  }
}
</style> 