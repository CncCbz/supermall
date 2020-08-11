<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import { getHomeMultidata } from 'network/home';

  export default {
    name: 'Home',
    data() {
      return {
        banner: null,
        dKeyword: null,
        keywords: null,
        recommend: null
      };
    },
    components: {
      NavBar
    },
    created() {
      getHomeMultidata().then(res => {
        console.log(res);
        this.banner = res.data.banner;
        this.dKeyword = res.data.banner;
        this.keywords = res.data.keywords;
        this.recommend = res.data.recommend;
      });
    }
  };
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
