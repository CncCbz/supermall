<template>
  <div class="bottomBar">
    <div class="barItem barLeft">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon store"></i>
        <span class="text">店铺</span>
      </div>
      <div @click="selectClick">
        <i class="icon select" v-if="!isSelect"></i>
        <i class="icon isSelect" v-else></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="barItem barRight" @click="showSku">
      <div class="cart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'bottomBar',
    data() {
      return {
        isSelect: false
      };
    },
    methods: {
      selectClick() {
        this.isSelect = !this.isSelect;
      },
      showSku() {
        this.$emit('showSku');
      }
    }
  };
</script>

<style scoped>
  .bottomBar {
    background-color: #f6f6f6;
    height: 49px;
    border-top: 1px solid #eee;
    box-shadow: 0 -1px 1px rgba(150, 150, 150, 0.08);
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    text-align: center;
    display: flex;
  }
  .bottomBar .barItem {
    flex: 1;
    display: flex;
  }
  .barLeft div {
    flex: 1;
  }
  .barLeft .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 6px auto 0px;
    background: url('~assets/img/detail/detail_bottom.png') 0 0/100%;
  }
  .barLeft .service {
    background-position: 0px -52px;
  }
  .barLeft .store {
    background-position: 0px -98px;
  }
  .barLeft .select {
    background-position: 0px 1px;
  }
  .barLeft .isSelect {
    background-position: 0 -326px;
  }
  .barLeft .text {
    font-size: 13px;
  }
  .barRight div {
    flex: 1;
    text-align: center;
    line-height: 49px;
  }
  .barRight .cart {
    background-color: #ffdd09;
  }
  .barRight .buy {
    background-color: #fd7b83;
    color: #fff;
  }
</style>
