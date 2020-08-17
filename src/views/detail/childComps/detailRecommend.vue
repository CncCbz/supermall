<template>
  <div class="recommend">{{ recommendList }}</div>
</template>

<script>
  export default {
    name: 'Recommend',
    props: {
      recommendList: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {};
    }
  };
</script>

<style scoped></style>
