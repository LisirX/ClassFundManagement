<script setup>
defineProps({
  events: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <h2 class="mb-4 d-flex align-items-center">
    <i class="fa-solid fa-book-open me-3" style="color: var(--primary-color);"></i>
    班级日志
  </h2>
  <ul class="list-unstyled timeline">
    <li v-for="(event, index) in events" :key="index">
      <div class="timeline-icon"><i class="fa-solid fa-calendar-check"></i></div>
      <div class="timeline-content">
        <strong class="text-muted">{{ event.date }}</strong>
        <p class="mb-0">{{ event.content }}</p>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.timeline {
  position: relative;
  padding-left: 25px;
  border-left: 3px solid #e9ecef;
}
.timeline li {
  position: relative;
  margin-bottom: 25px;
}
/* 时间线上的圆点 */
.timeline-icon {
  position: absolute;
  left: -14px; /* (圆点宽度/2) + (线宽/2) */
  top: 5px;
  width: 25px;
  height: 25px;
  background-color: var(--light-gray);
  color: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  border: 3px solid #e9ecef;
  transition: all 0.3s ease;
}
li:hover .timeline-icon {
  background-color: var(--primary-color);
  color: #fff;
  transform: scale(1.1);
}
.timeline-content {
  padding: 5px 10px;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}
.timeline-content:hover {
  background-color: rgba(74, 144, 226, 0.08);
}
</style>