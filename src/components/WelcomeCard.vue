<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

defineProps({
  balance: {
    type: String,
    required: true
  }
});

const titleRef = ref(null);
const badgeRef = ref(null);
const backgroundWidth = ref(0);

const updateBackgroundWidth = () => {
  if (titleRef.value && badgeRef.value) {
    const titleWidth = titleRef.value.offsetWidth;
    const badgeWidth = badgeRef.value.offsetWidth;
    const maxWidth = Math.max(titleWidth, badgeWidth);
    backgroundWidth.value = maxWidth * 2;
  }
};

onMounted(() => {
  updateBackgroundWidth();
  window.addEventListener('resize', updateBackgroundWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateBackgroundWidth);
});
</script>

<template>
  <div class="mb-4 outer-card-wrapper">
    <div class="card border-0 shadow-sm">
      <div class="card-body p-3 p-md-4 p-lg-5">
        <div class="d-flex flex-column flex-lg-row align-items-center justify-content-lg-center">
          
          <div class="main-info-box">
            <h6 class="text-muted fw-normal mb-2">当前班费余额</h6>
            <p class="display-3 fw-bolder mb-0" style="color: var(--primary-color);">¥{{ balance }}</p>
          </div>

          <!-- 分隔线只在桌面显示 -->
          <div class="separator-dots d-none d-lg-block"></div>

          <div class="side-info-box mt-4 mt-lg-0 d-none d-md-block">
            <div class="dynamic-background" :style="{ width: backgroundWidth + 'px' }"></div>
            
            <div class="content-wrapper">
              <h5 class="fw-bold mb-2" ref="titleRef">班费管理系统</h5>
              <span class="badge rounded-pill bg-primary-subtle text-primary-emphasis px-3 py-2" ref="badgeRef">
                <i class="fa-solid fa-graduation-cap me-1"></i>混合·2402
              </span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 992px) {
  .main-info-box { flex: 1.618; text-align: right; }
  .side-info-box { flex: 1; display: flex; justify-content: flex-start; align-items: center; }
}
.main-info-box { text-align: center; transition: transform 0.4s ease; }
.side-info-box { position: relative; display: inline-block; transition: transform 0.4s ease; }
.dynamic-background { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); height: 100%; background-color: #f8f9fa; border-radius: 0.75rem; z-index: 1; transition: all 0.4s ease; }
.content-wrapper { position: relative; z-index: 2; padding: 0.75rem 1rem; text-align: center; display: flex; flex-direction: column; align-items: center; }
.outer-card-wrapper .card { transition: all 0.4s ease; }
.separator-dots { height: 80px; width: 2px; margin: 0 3rem; background-image: linear-gradient( to bottom, #e0e0e0 50%, transparent 50% ); background-size: 2px 8px; background-repeat: repeat-y; transition: transform 0.4s ease; }
.outer-card-wrapper:hover .card { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
.outer-card-wrapper:hover .main-info-box,
.outer-card-wrapper:hover .separator-dots,
.outer-card-wrapper:hover .side-info-box { transform: scale(1.05); }
.side-info-box:hover .dynamic-background { border: 1px solid var(--primary-color); box-shadow: 0 4px 15px rgba(74, 144, 226, 0.1); }
.display-3 { font-size: 3.5rem; word-break: break-all; }
@media (max-width: 767.98px) { .display-3 { font-size: 3rem; } }
@media (max-width: 575.98px) { .display-3 { font-size: 2.25rem; } }
</style>