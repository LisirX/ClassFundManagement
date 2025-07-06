<script setup>
// 定义该组件可以接收一个名为 'transactions' 的 prop
defineProps({
  transactions: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <section id="transactions" class="mt-5">
    <h2>收支记录</h2>
    <table class="table table-striped table-hover mt-3">
      <thead class="table-success">
        <tr>
          <th>日期</th>
          <th>描述</th>
          <th>金额</th>
          <th>类型</th>
        </tr>
      </thead>
      <tbody>
        <!-- 使用 v-for 循环渲染数据 -->
        <tr v-for="(item, index) in transactions" :key="index">
          <td>{{ item.date }}</td>
          <td>{{ item.description }}</td>
          <!-- 根据金额正负动态添加 class -->
          <td :class="item.amount > 0 ? 'text-success' : 'text-danger'">
            <!-- 格式化金额，正数显示+号 -->
            {{ item.amount > 0 ? '+' : '' }}{{ item.amount.toFixed(2) }}
          </td>
          <td>{{ item.type }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>