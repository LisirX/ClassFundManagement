<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const headerRef = ref(null);

// 1. 我们需要变量来存储最新的鼠标位置，但不会立即应用
let latestMouseX = 0;
let latestMouseY = 0;

// 2. 一个变量来保存我们的动画循环ID，以便之后可以取消它
let animationFrameId = null;

// 3. 鼠标移动事件监听器现在只做一件事：更新坐标变量。非常轻量！
const handleMouseMove = (event) => {
  if (!headerRef.value) return;
  const rect = headerRef.value.getBoundingClientRect();
  latestMouseX = event.clientX - rect.left;
  latestMouseY = event.clientY - rect.top;
};

// 4. 这是我们的高性能更新函数
const updateGlarePosition = () => {
  if (headerRef.value) {
    // 只有在这个函数里，我们才真正去修改CSS变量
    headerRef.value.style.setProperty('--mouse-x', `${latestMouseX}px`);
    headerRef.value.style.setProperty('--mouse-y', `${latestMouseY}px`);
  }
  // 关键：请求浏览器在下一次重绘前再次调用此函数，形成循环
  animationFrameId = requestAnimationFrame(updateGlarePosition);
};

// 5. 在组件挂载后，启动一切
onMounted(() => {
  if (headerRef.value) {
    headerRef.value.addEventListener('mousemove', handleMouseMove);
    // 启动动画循环
    animationFrameId = requestAnimationFrame(updateGlarePosition);
  }
});

// 6. 在组件卸载前，清理一切，防止内存泄漏
onUnmounted(() => {
  if (headerRef.value) {
    headerRef.value.removeEventListener('mousemove', handleMouseMove);
    // 关键：取消动画循环
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<template>
  <header ref="headerRef" class="header-gradient-glass">
    <div class="container">
      <div class="header-content text-white text-center">
        <h1 class="display-5 fw-bold">
          <i class="fa-solid fa-wallet me-3"></i>班费管理系统
        </h1>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header-gradient-glass {
  position: sticky; top: 0; z-index: 1000; padding: 2.5rem 0;
  position: relative; overflow: hidden;
  background: linear-gradient(135deg, rgba(68, 151, 245, 0.7), rgba(71, 237, 201, 0.7));
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.2), inset 0 -1px 4px 0 rgba(0, 0, 0, 0.1), 0 8px 32px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.header-gradient-glass::before {
  content: ''; position: absolute; left: 0; top: 0;
  width: 350px; height: 350px; border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 65%);
  
  /* 核心：使用 transform 来移动，并设置一个更长的、带有延迟感的过渡 */
  transform: translate(-50%, -50%) translate(var(--mouse-x, -500px), var(--mouse-y, -500px));
  opacity: 0;
  /* 
    增加 transition 的持续时间，让“追赶”的感觉更明显、更“黄油”
  */
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.4s ease;
  pointer-events: none;
}

.header-gradient-glass:hover::before {
  opacity: 1;
}

@media (max-width: 991.98px) { .header-gradient-glass { padding: 2rem 0; } }
.header-content { position: relative; z-index: 2; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); }
</style>