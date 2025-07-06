<script setup>
// 脚本部分保持不变，无需修改
import { ref, computed } from 'vue';
import TheHeader from './components/TheHeader.vue';
import WelcomeCard from './components/WelcomeCard.vue';
import TransactionList from './components/TransactionList.vue';
import ClassLog from './components/ClassLog.vue';
import TheFooter from './components/TheFooter.vue';

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
  { date: '2024-10-13', content: '我们召开了一个超超长的班会，会后我们确定了第一次启动资金的来源呢！' },
  { date: '2024-10-25', content: '第一笔班费花出去啦，用于我们的班旗和班徽设计。这笔钱之后如果有发票的话是可以向学校报销的啦~' },
  { date: '2024-11-17', content: '同学们的表演实在是太完美啦！其中的服装等费用支出先由班费支付，之后也是可以报销的呢！' },
  { date: '2025-01-15', content: '马上就要过年了！预祝大家新年快乐，学习进步，开心每一天！！@所有人' },
  { date: '2025-06-06', content: '期末顺利呀' },
  { date: '2025-07-01', content: '祝大家暑假快乐！' },
]);

const balance = computed(() => {
  const total = transactions.value.reduce((sum, transaction) => sum + transaction.amount, 0);
  return total.toFixed(2);
});
</script>

<template>
  <TheHeader />
  <main class="container py-4 py-lg-5" style="padding-top: 150px;">
    <!-- ============================================= -->
    <!--     在这里使用新组件，并通过 props 传递数据      -->
    <!-- ============================================= -->
    <WelcomeCard :balance="balance" />

    <!-- ============================================= -->
    <!--  方案一: 移动端专属的选项卡(Tabs)布局        -->
    <!--  d-lg-none: 在大屏幕上隐藏 (lg及以上)       -->
    <!-- ============================================= -->
    <div class="d-lg-none">
      <!-- 选项卡导航 -->
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

      <!-- 选项卡内容 -->
      <div class="tab-content" id="myTabContent">
        <!-- 收支记录面板 -->
        <div class="tab-pane fade show active" id="transactions-pane" role="tabpanel" aria-labelledby="transactions-tab" tabindex="0">
          <div class="card shadow-sm">
            <div class="card-body scrollable-content-area">
              <TransactionList :transactions="transactions" />
            </div>
          </div>
        </div>
        <!-- 班级日志面板 -->
        <div class="tab-pane fade" id="log-pane" role="tabpanel" aria-labelledby="log-tab" tabindex="0">
          <div class="card shadow-sm">
            <div class="card-body scrollable-content-area">
              <ClassLog :events="events" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================= -->
    <!--  方案二: 桌面端专属的并排(Side-by-Side)布局 -->
    <!--  d-none d-lg-flex: 默认隐藏，只在大屏幕上显示 -->
    <!-- ============================================= -->
    <div class="row g-4 justify-content-center d-none d-lg-flex">
      <!-- 收支记录卡片 -->
      <div class="col-lg-8">
        <div class="card shadow-sm h-100">
          <div class="card-body p-lg-4 scrollable-content-area">
            <TransactionList :transactions="transactions" />
          </div>
        </div>
      </div>
      <!-- 班级日志卡片 -->
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
