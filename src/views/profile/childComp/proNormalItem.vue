<template>
  <div class="NormalList">
    <div class="icon">
      <img :src="src" alt="" />
      <!-- <img src="assets/img/profile/message.svg" alt="" /> -->
    </div>
    <div class="text">{{ text }}</div>
  </div>
</template>

<script>
  export default {
    name: 'NormalList',
    props: {
      icon: {
        type: String
      },
      text: {
        type: String
      }
    },
    computed: {
      src() {
        switch (this.icon) {
          case 'message':
            return require('../../../assets/img/profile/message.svg');
            break;
          case 'pointer':
            return require('../../../assets/img/profile/pointer.svg');
            break;
          case 'vip':
            return require('../../../assets/img/profile/vip.svg');
            break;
          case 'cart':
            return require('../../../assets/img/profile/cart.svg');
            break;
          case 'download':
            return require('../../../assets/img/profile/shopping.svg');
            break;
        }
      }
    },
    data() {
      return {};
    }
  };
</script>

<style scoped>
  .NormalList {
    display: flex;
    border-bottom: 1px solid #f8f8f8;
    padding: 10px 0px;
  }
  .NormalList .icon {
    width: 20px;
    height: 20px;
    margin: 0px 10px;
  }
  .NormalList .icon img {
    width: 100%;
  }
  .NormalList .text {
    font-size: 12px;
    height: 20px;
    line-height: 20px;
  }
</style>
