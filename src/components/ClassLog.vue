<script setup>
defineProps({
  events: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <section id="events" class="mt-5">
    <h2>班级日志</h2>
    <!-- 使用 v-for 循环渲染日志 -->
    <p v-for="(event, index) in events" :key="index">
      <strong>{{ event.date }}</strong>，{{ event.content }}
    </p>
  </section>
</template>