<template>
  <div class="catDetail">
    <goods-list :list="goodsList" class="goodsList"></goods-list>
  </div>
</template>

<script>
  import GoodsList from 'components/content/goodsList/goods';

  export default {
    name: 'catDetail',
    props: {
      goodsList: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {};
    },
    components: {
      GoodsList
    }
  };
</script>

<style scoped>
  .goodsList {
    font-size: 12px;
  }
</style>
