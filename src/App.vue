<script setup>
import { ref, computed } from 'vue';

// 引入子组件
import TheHeader from './components/TheHeader.vue';
import TransactionList from './components/TransactionList.vue';
import ClassLog from './components/ClassLog.vue';
import TheFooter from './components/TheFooter.vue';

// --- 数据中心 ---
// 使用 ref 创建响应式数据
const transactions = ref([
  { date: '2024-10-14', description: '学生缴费', amount: 1800.19, type: '收入' },
  { date: '2024-10-25', description: '班费及班徽制作', amount: -130.00, type: '支出' },
  { date: '2024-11-18', description: '班级舞台剧服装', amount: -423.99, type: '支出' },
  { date: '2024-11-18', description: '班级舞台剧服装', amount: -19.25, type: '支出' },
  { date: '2024-11-27', description: '团费代缴', amount: -21.60, type: '支出' },
  { date: '2025-01-15', description: '银行结息 & 班团大赛报销', amount: 495.53, type: '收入' },
  { date: '2025-03-20', description: '银行结息', amount: 0.39, type: '收入' },
  { date: '2025-06-06', description: '团费代缴', amount: -21.60, type: '支出' },
  { date: '2025-06-20', description: '银行结息', amount: +0.22, type: '收入' },
]);

const events = ref([
  { date: '2024.10.13', content: '我们召开了一个超超长的班会，会后我们确定了第一次启动资金的来源呢！' },
  { date: '2024.10.25', content: '第一笔班费花出去啦，用于我们的班旗和班徽设计。这笔钱之后如果有发票的话是可以向学校报销的啦~' },
  { date: '2024.11.17', content: '同学们的表演实在是太完美啦！其中的服装等费用支出先由班费支付，之后也是可以报销的呢！' },
  { date: '2025.01.15', content: '马上就要过年了！预祝大家新年快乐，学习进步，开心每一天！！@所有人' },
  { date: '2025.06.06', content: '期末顺利！' }
]);

// 使用 computed 动态计算余额，当 transactions 变化时，它会自动重新计算
const balance = computed(() => {
  const total = transactions.value.reduce((sum, transaction) => sum + transaction.amount, 0);
  return total.toFixed(2);
});
</script>

<template>
  <TheHeader />

  <div class="container my-5">
    <section id="home" class="text-center">
      <h2>欢迎！</h2>
      <p class="lead">当前班费余额：<span class="fw-bold">¥{{ balance }}</span></p>
    </section>

    <!-- 使用组件, 并通过 props 将数据传递给子组件 -->
    <TransactionList :transactions="transactions" />
    <ClassLog :events="events" />
  </div>

  <TheFooter />
</template>