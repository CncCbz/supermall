<template>
  <div class="package">
    <div class="item">
      <div class="detail">
        <span class="number">0.00</span>
        <span class="unit">元</span>
      </div>
      <div class="accountInfo">我的余额</div>
    </div>
    <div class="item">
      <div class="detail">
        <span class="number">0</span>
        <span class="unit">个</span>
      </div>
      <div class="accountInfo">我的优惠</div>
    </div>
    <div class="item">
      <div class="detail">
        <span class="number">0</span>
        <span class="unit">分</span>
      </div>
      <div class="accountInfo">我的积分</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'package',
    data() {
      return {};
    }
  };
</script>

<style scoped>
  .package {
    display: flex;
    /* background-color: red; */
  }
  .package div {
    flex: 1;
  }
  .package .item {
    margin: 20px 0px;
    display: flex;
    flex-direction: column;
    text-align: center;
    border-left: 1px solid #e8e8e8;
  }
  .package .item .detail {
    margin: 5px 0px;
  }
  .package .item .detail .number {
    font-size: 20px;
    font-weight: bold;
    color: var(--color-high-text);
  }
  .package .item .detail .unit {
    font-size: 12px;
  }
  .package .item .accountInfo {
    font-size: 12px;
  }
</style>
