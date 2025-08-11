<script setup>
defineProps({
  transactions: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <h2 class="mb-4 d-flex align-items-center">
    <i class="fa-solid fa-receipt me-3" style="color: var(--primary-color);"></i>
    收支记录
  </h2>
  <div class="table-responsive">
    <table class="table table-hover align-middle">
      <thead class="table-light">
        <tr>
          <th>日期</th>
          <th>描述</th>
          <th class="text-end">金额</th>
          <th class="text-center">类型</th>
        </tr>
      </thead>
      <TransitionGroup name="list" tag="tbody">
        <tr v-for="item in transactions" :key="item.date + item.description + item.amount">
          <td class="text-muted">{{ item.date }}</td>
          <td>{{ item.description }}</td>
          <td class="fw-bold text-end" :class="item.amount > 0 ? 'text-success' : 'text-danger'">
            {{ item.amount > 0 ? '+' : '' }}{{ item.amount.toFixed(2) }}
          </td>
          <td class="text-center">
            <span v-if="item.type === '收入'" class="badge bg-success-subtle text-success-emphasis rounded-pill px-3 py-2">
              <i class="fa-solid fa-arrow-trend-up me-1"></i>{{ item.type }}
            </span>
            <span v-else class="badge bg-danger-subtle text-danger-emphasis rounded-pill px-3 py-2">
              <i class="fa-solid fa-arrow-trend-down me-1"></i>{{ item.type }}
            </span>
          </td>
        </tr>
      </TransitionGroup>
    </table>
  </div>
</template>

<style scoped>
/* 表格行样式，创建卡片化效果 */
.table {
  border-collapse: separate;
  border-spacing: 0 10px;
}
.table thead th {
  border: none;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  color: #6c757d;
}
.table tbody tr {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}
.table tbody td:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.table tbody td:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

/* 列表过渡动画 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* --- 隐藏横向滑动条 --- */
.table-responsive {
  /* For Firefox */
  scrollbar-width: none;
  /* For Internet Explorer and Edge */
  -ms-overflow-style: none;
}
.table-responsive::-webkit-scrollbar {
  /* For Chrome, Safari, and Opera */
  display: none;
}
</style>