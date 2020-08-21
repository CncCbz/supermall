<template>
  <div>
    <nav-bar class="navbar">
      <div slot="center">我的</div>
    </nav-bar>
    <sign></sign>
    <package></package>
    <div class="normalItems">
      <normal-item
        v-for="item in normalItemList"
        :icon="item.icon"
        :text="item.text"
        :key="item.text"
      ></normal-item>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';

  import sign from './childComp/proSign';
  import Package from './childComp/proPackage';
  import NormalItem from './childComp/proNormalItem';
  export default {
    name: 'Profile',
    data() {
      return {
        normalItemList: [
          { icon: 'message', text: '我的消息' },
          { icon: 'pointer', text: '积分商城' },
          { icon: 'vip', text: '会员卡' },
          { icon: 'cart', text: '我的购物车' },
          { icon: 'download', text: '下载购物APP' }
        ]
      };
    },

    components: {
      NavBar,
      sign,
      Package,
      NormalItem
    }
  };
</script>

<style scoped>
  .navbar {
    background-color: var(--color-tint);
    color: #fff;
  }
  .normalItems {
    border-top: 10px solid #f8f8f8;
    border-bottom: 10px solid #f8f8f8;
  }
</style>
