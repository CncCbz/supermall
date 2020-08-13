<template>
  <div class="goodsItem">
    <img :src="goodsItem.show.img" alt="" />
    <div class="goodsInfos">
      <p>{{ goodsItem.title }}</p>
      <p>
        <span class="price">{{ goodsItem.price }}</span>
        ☆
        <span class="cfav">{{ goodsItem.cfav }}</span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'goodsItem',
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {};
    }
  };
</script>

<style scoped>
  .goodsItem {
    width: 48%;
  }
  .goodsItem img {
    width: 100%;
    border-radius: 2%;
  }
  .goodsInfos p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
  }
  .goodsItem span {
    font-size: 14px;
  }
  .goodsInfos .price {
    color: var(--color-high-text);
  }
</style>
