<template>
  <div id="app">
    <main-tab-bar class="tabbar"></main-tab-bar>
    <router-view></router-view>
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
