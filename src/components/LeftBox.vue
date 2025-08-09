<template>
    <div class="container">
      <div class="profile">
        <img src="../assets/avatar.jpg" alt="头像" class="avatar">
        <span class="author">sukiSophie</span>
      </div>
      
      <div class="signature-box">
        <div class="signature">
          泰戈尔飞鸟集
        </div>
      </div>
      
      <div class="contact-box">
        <div class="contact">
          <a href="https://space.bilibili.com/1300472248 " target="_blank" class="social-link first-social-link">
            <Bilibili />
          </a>
          <a href="https://github.com/sukiSophie " target="_blank" class="social-link">
            <Github />
          </a>
          <a href="mailto:s76211152@gmail.com" class="social-link">
            <Email />
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script setup name="LeftBox">
    import Bilibili from '@/components/icons/Bilibili.vue'
    import Github from '@/components/icons/Github.vue'
    import Email from '@/components/icons/Email.vue'
  </script>
  
  <style scoped>
  .container {
    width: 40vw;
    height: 40vh;
    /* margin-top: 0vh; */
    margin-left: 210px;
    margin-right:90px;
    display: flex;
    flex-direction: column;
    background: rgba(214, 209, 209, 0.1); /* 纯色背景 */
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    padding: 2rem;
    transition: all 0.5s ease-in-out;
  }

  .container:hover{
    transform: translate(5px,-5px);
  }
  
  /* 新增签名区域样式 */
  .signature-box {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    padding: 1rem 1.5rem;
    margin-bottom: 1.5rem;
    backdrop-filter: blur(5px);
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .signature-box:hover {
    transform: translateX(5px);
    background: rgba(255, 255, 255, 0.15);
  }
  
  .contact-box {
    margin-top: 20px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    padding: 1rem;
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
  }
  
  .contact-box:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(-5px);
  }
  
  .profile {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    transition: transform 0.3s ease;
  }
  
  .avatar {
    border-radius: 50%;
    margin-left:24px;
    width: 120px;
    height: 120px;
    object-fit: cover;
    border: 3px solid #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;
  }
  
  .avatar:hover{
    scale:1.1;
  }

  .author {
    font-size: 2.5rem;
    font-weight: 600;
    color: #6599a7;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    margin-left: 1rem;
    transition: color 0.3s ease;
  }
  
  .signature {
    font-style: italic;
    color: #6599a7;
    font-size: 1.2rem;
    border-left: 3px solid #ffffff55;
    padding-left: 1rem;
  }
  
  .contact {
    display: flex;
    gap: 1.2rem;
    align-self: flex-end;
  }
  
  .social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    margin-right:40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: #6599a7;
    font-size: 1.5rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .first-social-link{
    margin-left:48px;
  }
  .social-link:hover {
    background: #ffffff;
    color: #1e1e2f;
    transform: translateY(-3px);
  }
  
  .social-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%);
    transition: all 0.5s ease;
  }
  
  .social-link:hover::before {
    left: 100%;
  }
  </style>