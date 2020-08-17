<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabControlFixed"
      class="tabControl1"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @position="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend :recommend="recommend"></recommend>
      <feature></feature>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :list="goods[currentType].list"></goods-list>
    </scroll>
    <back-top class="backTop" v-show="backTop_isActive" @click.native="topClick"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/homeSwiper';
  import Recommend from './childComps/recommend';
  import Feature from './childComps/feature';

  import NavBar from 'components/common/navbar/NavBar';
  import GoodsList from 'components/content/goodsList/goods';
  import TabControl from 'components/content/tabControl/tabControl';
  import Scroll from 'components/common/scroll/scroll';
  import BackTop from 'components/content/backTop/backTop';

  import { getHomeMultidata, getHomeGoodsdata } from 'network/home';
  import { debounce } from 'common/utils';

  export default {
    name: 'Home',
    data() {
      return {
        banners: [],
        recommend: [],
        goods: {
          pop: { page: 0, list: [] },
          new: { page: 0, list: [] },
          sell: { page: 0, list: [] }
        },
        currentType: 'pop',
        backTop_isActive: false,
        tabControlTop: 0,
        isTabControlFixed: false,
        saveY: 0,
        itemImgListener: null
      };
    },
    components: {
      NavBar,
      HomeSwiper,
      Recommend,
      Feature,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    created() {
      this.getHomeMultidata();
      this.getHomeGoodsdata('pop');
      this.getHomeGoodsdata('sell');
      this.getHomeGoodsdata('new');
    },
    activated() {
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY();
      this.$bus.$off('goodsItemImgLoad', this.itemImgListener);
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 200);
      //对监听事件进行保存
      this.itemImgListener = () => {
        refresh();
      };
      this.$bus.$on('goodsItemImgLoad', this.itemImgListener);
    },
    methods: {
      /**
       * 事件相关代码
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
        }
        this.$refs.tabControl1.current_index = index;
        this.$refs.tabControl2.current_index = index;
      },
      topClick() {
        this.$refs.scroll.scrollTo(0, 0, 500);
      },
      contentScroll(position) {
        if (position.y <= -1000) {
          this.backTop_isActive = true;
        } else {
          this.backTop_isActive = false;
        }
        if (position.y <= -this.tabControlTop) {
          this.isTabControlFixed = true;
        } else {
          this.isTabControlFixed = false;
        }
      },
      loadMore() {
        this.getHomeGoodsdata(this.currentType);
        this.$refs.scroll.finishPullup();
      },
      swiperImgLoad() {
        this.tabControlTop = this.$refs.tabControl2.$el.offsetTop;
      },
      /**
       * 网络请求相关代码
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommend = res.data.recommend.list;
        });
      },
      getHomeGoodsdata(type) {
        this.goods[type].page += 1;
        getHomeGoodsdata(type, this.goods[type].page).then(res => {
          this.goods[type].list = this.goods[type].list.concat(res.data.list);
        });
      }
    }
  };
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* position: relative; */
    z-index: 3;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .backTop {
    position: fixed;
    bottom: 50px;
    right: 10px;
  }
  .tabControl1 {
    position: relative;
    z-index: 3;
  }
</style>
