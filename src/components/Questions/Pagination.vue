<script setup>
import { computed } from "vue";

const props = defineProps({
  questionCount: Number,
  totalQuestions: Number,
  goToQuestion: Function
});

const displayedQuestions = computed(() => {
  let current = props.questionCount;
  let total = props.totalQuestions;
  let range = [];

  if (total <= 5) {
    return [...Array(total).keys()];
  }

  let start = Math.max(1, current - 3);
  let end = Math.min(total - 2, current + 3);

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  return range;
});

const startEllipsis = computed(() => displayedQuestions.value[0] > 1);

const endEllipsis = computed(() => displayedQuestions.value[displayedQuestions.value.length - 1] < props.totalQuestions - 2);
</script>

<template>
  <div class="pagination">
    <button :class="{ active: questionCount === 0 }">1</button>

    <span v-if="startEllipsis">...</span>

    <button
      v-for="index in displayedQuestions"
      :key="index"
      :class="{ active: questionCount === index }"
    >
      {{ index + 1 }}
    </button>

    <span v-if="endEllipsis">...</span>

    <button :class="{ active: questionCount === totalQuestions - 1 }">
      {{ totalQuestions }}
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-top: 20px;
}

.pagination button {
  background: none;
  border: 1px solid white;
  color: white;
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 5px;
  transition: 0.3s;
}

.pagination button.active {
  background: white;
  color: black;
  font-weight: bold;
}

.pagination span {
  color: white;
  font-size: 18px;
  margin: 0 5px;
}
</style>
