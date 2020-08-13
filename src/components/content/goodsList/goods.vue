<template>
  <div class="goods">
    <goods-item
      class="goodsItem"
      v-for="item in list"
      :goodsItem="item"
      :key="item.acm"
    ></goods-item>
  </div>
</template>

<script>
  import GoodsItem from './goodsItem';

  export default {
    name: 'goods',
    props: {
      list: {
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
      GoodsItem
    }
  };
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    /* width: 414px; */
    justify-content: space-around;
    padding: 2px;
  }
</style>
