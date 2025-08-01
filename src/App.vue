<script setup>
// 1. 从 vue 中多引入 onMounted 生命周期钩子
import { ref, computed, onMounted } from 'vue';
import TheHeader from './components/TheHeader.vue';
import WelcomeCard from './components/WelcomeCard.vue';
import TransactionList from './components/TransactionList.vue';
import ClassLog from './components/ClassLog.vue';
import TheFooter from './components/TheFooter.vue';

// 2. 将 hardcoded 的数据定义改为空数组的 ref
const transactions = ref([]);
const events = ref([]);

// 3. 使用 onMounted 钩子，在组件挂载后执行数据获取操作
onMounted(async () => {
  try {
    // 使用 fetch API 并行获取两个 JSON 文件
    const [transRes, eventsRes] = await Promise.all([
      fetch('/transactions.json'), // GET public/transactions.json
      fetch('/events.json')        // GET public/events.json
    ]);

    // 检查网络请求是否成功
    if (!transRes.ok || !eventsRes.ok) {
      throw new Error('Network response was not ok');
    }

    // 解析 JSON 数据并更新 ref
    transactions.value = await transRes.json();
    events.value = await eventsRes.json();

  } catch (error) {
    // 在控制台打印错误，方便调试
    console.error("无法加载数据:", error);
    // 在真实应用中，你可能想在这里设置一个错误状态，并在 UI 上显示提示
  }
});


// balance 计算属性保持不变。
// Vue 的响应式系统会确保在 transactions 数据加载完成后，它会自动重新计算。
const balance = computed(() => {
  const total = transactions.value.reduce((sum, transaction) => sum + transaction.amount, 0);
  return total.toFixed(2);
});
</script>

<template>
  <!-- ================================== -->
  <!--   这部分模板代码 (template) 无需任何修改   -->
  <!-- ================================== -->
  <TheHeader />
  <main class="container py-4 py-lg-5" style="padding-top: 150px;">
    <WelcomeCard :balance="balance" />

    <div class="d-lg-none">
      <ul class="nav nav-tabs nav-fill mb-3" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="transactions-tab" data-bs-toggle="tab" data-bs-target="#transactions-pane" type="button" role="tab" aria-controls="transactions-pane" aria-selected="true">
            <i class="fa-solid fa-receipt me-2"></i>收支记录
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="log-tab" data-bs-toggle="tab" data-bs-target="#log-pane" type="button" role="tab" aria-controls="log-pane" aria-selected="false">
            <i class="fa-solid fa-book-open me-2"></i>班级日志
          </button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="transactions-pane" role="tabpanel" aria-labelledby="transactions-tab" tabindex="0">
          <div class="card shadow-sm">
            <div class="card-body scrollable-content-area">
              <TransactionList :transactions="transactions" />
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="log-pane" role="tabpanel" aria-labelledby="log-tab" tabindex="0">
          <div class="card shadow-sm">
            <div class="card-body scrollable-content-area">
              <ClassLog :events="events" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4 justify-content-center d-none d-lg-flex">
      <div class="col-lg-8">
        <div class="card shadow-sm h-100">
          <div class="card-body p-lg-4 scrollable-content-area">
            <TransactionList :transactions="transactions" />
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card shadow-sm h-100">
          <div class="card-body p-lg-4 scrollable-content-area">
            <ClassLog :events="events" />
          </div>
        </div>
      </div>
    </div>
  </main>
  <TheFooter />
</template>