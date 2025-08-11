<script setup>
import { ref, computed, onMounted } from 'vue';
import TheHeader from './components/TheHeader.vue';
import WelcomeCard from './components/WelcomeCard.vue';
import TransactionList from './components/TransactionList.vue';
import ClassLog from './components/ClassLog.vue';
import TheFooter from './components/TheFooter.vue';

const transactions = ref([]);
const events = ref([]);
const errorMessage = ref(''); // 用于存储错误信息
const showToast = ref(false); // 控制 Toast 显示状态

onMounted(async () => {
  try {
    const [transRes, eventsRes] = await Promise.all([
      fetch('transactions.json'),
      fetch('events.json')
    ]);

    if (!transRes.ok || !eventsRes.ok) {
      throw new Error('无法加载数据，请检查网络连接或文件路径是否正确。');
    }

    transactions.value = await transRes.json();
    events.value = await eventsRes.json();
  } catch (error) {
    errorMessage.value = '在获取账单和事件列表时出现错误...'; // 更新错误信息
    showToast.value = true; // 显示 Toast
    setTimeout(() => {
      showToast.value = false; // 自动隐藏 Toast
    }, 3000); // 3秒后隐藏
  }
});

const balance = computed(() => {
  const total = transactions.value.reduce((sum, transaction) => sum + transaction.amount, 0);
  return total.toFixed(2);
});
</script>

<template>
  <TheHeader />
  <main class="container py-4 py-lg-5" style="padding-top: 150px;">
    <WelcomeCard :balance="balance" />

    <!-- 错误消息 Toast -->
    <div
      class="toast-container position-fixed bottom-0 end-0 p-3"
      style="z-index: 1050;"
      v-if="showToast"
    >
      <div class="toast show align-items-center text-bg-danger border-0" role="alert">
        <div class="d-flex">
          <div class="toast-body">
            {{ errorMessage }}
          </div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            aria-label="Close"
            @click="showToast = false"
          ></button>
        </div>
      </div>
    </div>

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
