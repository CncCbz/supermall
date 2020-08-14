<template>
  <div id="app">
    <main-tab-bar class="tabbar"></main-tab-bar>
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import MainTabBar from './components/content/tabbar/MainTabBar';

  export default {
    name: 'app',
    components: {
      MainTabBar
    }
  };
</script>

<style>
  @import 'assets/css/base.css';
  .tabbar {
    z-index: 3;
  }
</style>
