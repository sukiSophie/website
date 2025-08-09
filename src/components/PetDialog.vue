<template>
  <div class="pet-dialog" :style="{ left: position.x + 'px', top: position.y + 'px' }">
    <!-- 装饰性光斑 -->
    <div class="light-spots"></div>

    <div class="dialog-content">
      <button class="close-btn" @click="$emit('close')">×</button>
      <textarea 
        v-model="userInput" 
        placeholder="在这里输入您的问题..."
        :disabled="isLoading"
      ></textarea>
      
      <button 
        class="submit-btn"
        @click="handleSubmit"
        :disabled="isLoading || !userInput.trim()"
      >
        <span class="btn-loader" v-if="isLoading"></span>
        <span>{{ isLoading ? '思考中...' : '发送请求' }}</span>
      </button>
      
      <div v-if="error" class="error-message">{{ error }}</div>
      
      <div v-if="response" class="response-box">
        <h4>✨ 回答：</h4>
        <div class="response-content">{{ response }}</div>
      </div>
    </div>
  </div>
</template>

<script setup ] name="PetDialog">
import { ref } from 'vue'

const props = defineProps({
  position: {
    type: Object,
    required: true,
    default: () => ({ x: 0, y: 0 })
  }
})

const emit = defineEmits(['close'])

const userInput = ref('')
const response = ref(null)
const isLoading = ref(false)
const error = ref(null)

const handleSubmit = async () => {
  if (!userInput.value.trim()) return

  isLoading.value = true
  error.value = null
  response.value = null

  try {
    const answer = await fetchDeepseekResponse(userInput.value)
    response.value = answer
  } catch (err) {
    error.value = '请求失败：' + err.message
  } finally {
    isLoading.value = false
  }
}

// 注意：此处为前端直接调用 API，存在暴露密钥的风险
const fetchDeepseekResponse = async (prompt) => {
  const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY

  const systemPrompt='你是一只可爱的猫娘,会可爱地回答主人地提问'
  
  if (!apiKey) {
    throw new Error('API 密钥未设置，请在 .env 文件中配置 VITE_DEEPSEEK_API_KEY')
  }

  const response = await fetch('https://api.deepseek.com/v1/chat/completions ', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1024
    })
  })

  if (!response.ok) {
    const errData = await response.json()
    throw new Error(errData.error?.message || `HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  return data.choices[0]?.message?.content || '未收到有效响应'
}
</script>

<style scoped>
.pet-dialog {
  position: fixed;
  width: 300px;
  max-width: 80vw;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  backdrop-filter: blur(10px) brightness(1.1);
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 0 20px rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;
  z-index: 10000;
  overflow: hidden;
  animation: fadeInUp 0.3s ease-out;
}

/* 装饰性光斑 */
.light-spots {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.05) 10%, transparent 10.01%) 
              0 0 / 10px 10px repeat;
  transform: rotate(45deg);
  opacity: 0.3;
  pointer-events: none;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid transparent;
  background: linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
}

.header-text {
  font-size: 1.2rem;
  font-weight: 600;
  background: linear-gradient(90deg, #ffffff, #e0e0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.close-btn {
  margin-bottom:10px;
  margin-left:275px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  border: none;
  font-size: 1.2rem;
  color: #afd8db;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.close-btn:hover {
  transform: rotate(90deg) scale(1.1);
  background: rgba(255, 255, 255, 0.2);
}

.dialog-content {
  display: flex;
  flex-direction: column;
}

textarea {
  width: 90%;
  height: 120px;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  resize: vertical;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  font-family: inherit;
  backdrop-filter: blur(5px);
}
textarea:focus {
  border-color: rgba(255, 255, 255, 0.4);
  outline: none;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.1);
}

.submit-btn {
  align-self: flex-end;
  padding: 0.6rem 1.4rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}
.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* 按钮加载动画 */
.btn-loader {
  width: 14px;
  height: 14px;
  border: 2px solid #fff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s infinite linear;
  display: inline-block;
}

.error-message {
  color: #ff6b6b;
  margin-top: 1rem;
  background: rgba(255, 107, 107, 0.1);
  padding: 0.6rem 1rem;
  border-radius: 6px;
  border-left: 4px solid #ff6b6b;
  animation: fadeIn 0.3s ease-in;
}

.response-box {
  margin-top: 1rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.05);
  max-height: 200px;
  overflow-y: auto;
}
.response-box h4 {
  color: #ffffff;
  margin-bottom: 0.8rem;
  font-weight: 600;
}

.response-content {
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #f0f0f0;
  font-size: 0.95rem;
}

/* 动画定义 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateX(10px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>