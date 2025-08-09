<template>
    <div class="time cards">
      <div class="timeshow">
        {{ year }}&nbsp;年&nbsp;{{ month }}&nbsp;月&nbsp;{{ day }}&nbsp;日&nbsp;
        <span class="weekday">{{ weekday }}</span><br>
        <span class="time-text">{{ hours }}:{{ minutes }}:{{ seconds }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  // 时间数据
  const year = ref('2000');
  const month = ref('0');
  const day = ref('00');
  const weekday = ref('星期一');
  const hours = ref('00');
  const minutes = ref('00');
  const seconds = ref('00');
  
  // 星期数组
  const weekdays = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六'
  ];
  
  // 更新时间的函数
  let timer = null;
  const updateTime = () => {
    const dt = new Date();
    
    // 更新年月日
    year.value = dt.getFullYear().toString();
    month.value = (dt.getMonth() + 1).toString();
    day.value = dt.getDate().toString().padStart(2, '0');
    
    // 更新星期
    weekday.value = weekdays[dt.getDay()];
    
    // 更新时分秒
    hours.value = dt.getHours().toString().padStart(2, '0');
    minutes.value = dt.getMinutes().toString().padStart(2, '0');
    seconds.value = dt.getSeconds().toString().padStart(2, '0');
  };
  
  // 组件挂载时启动定时器
  onMounted(() => {
    updateTime(); // 立即执行一次
    timer = setInterval(updateTime, 1000); // 每秒更新一次
  });
  
  // 组件卸载时清除定时器
  onUnmounted(() => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  });
  </script>
  
  <style scoped>
  .time {
    backdrop-filter: blur(10px);
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #6599a7;
  }
  
  .timeshow {
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
  }
  
  .weekday {
    font-size: 1rem;
  }
  
  .time-text {
    font-size: 4rem;
    font-weight: 500;
  }
  </style>