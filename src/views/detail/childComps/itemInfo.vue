<template>
  <div class="itemInfo">
    <p class="title">{{ itemInfo.title }}</p>
    <div class="price">
      <span class="curPrice">{{ itemInfo.price }}</span>
      <span class="oldPrice" v-show="itemInfo.oldPrice">{{ itemInfo.oldPrice }}</span>
      <span
        v-show="itemInfo.discountDesc"
        :style="{ backgroundColor: itemInfo.discountBgColor }"
        class="discountDesc"
      >
        {{ itemInfo.discountDesc }}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'itemInfo',
    props: {
      itemInfo: {
        type: Object,
        required: true
      }
    },
    data() {
      return {};
    }
  };
</script>

<style scoped>
  .title {
    margin: 10px 0px;
  }
  .price {
    display: flex;
  }
  .curPrice {
    color: var(--color-high-text);
    font-size: 21px;
  }
  .oldPrice {
    color: var(--color-text);
    font-size: 12px;
    line-height: 27px;
    text-decoration: line-through;
  }
  .discountDesc {
    text-align: center;
    border-radius: 15px;
    height: 20px;
    font-size: 14px;
    color: #ffffff;
    padding: 2px 2px;
    margin-left: 5px;
  }
</style>
