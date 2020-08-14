<template>
  <div class="detail">
    <nav-bar>
      <div slot="left" class="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="center">
        <div
          v-for="(title, index) in titles"
          @click="navClick(index)"
          :class="{ isActive: currentIndex == index }"
        >
          {{ title }}
        </div>
      </div>
    </nav-bar>
    <scroll ref="detailScroll">
      <detail-swiper :banners="itemInfo.topImages"></detail-swiper>
      <item-info :itemInfo="itemInfo" class="itemInfo"></item-info>
    </scroll>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import Scroll from 'components/common/scroll/scroll';

  import DetailSwiper from './childComps/detailSwiper';
  import ItemInfo from './childComps/itemInfo';

  import { getDetailGoodsdata } from 'network/detail';

  export default {
    name: 'Detail',
    data() {
      return {
        iid: '',
        itemInfo: {},
        goodsDetail: {},
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      };
    },
    created() {
      this.iid = this.$route.params.iid;
    },
    mounted() {
      getDetailGoodsdata(this.iid).then(res => {
        this.goodsDetail = res.result;
        // this.banners = res.result.itemInfo.topImages;
        this.itemInfo = res.result.itemInfo;
      });
    },
    methods: {
      /**
       * 监听事件
       */
      navClick(index) {
        this.currentIndex = index;
      },
      backClick() {
        this.$router.back();
      }
      /**
       * 网络请求相关
       */
    },
    components: {
      NavBar,
      Scroll,
      DetailSwiper,
      ItemInfo
    }
  };
</script>

<style scoped>
  .center {
    height: 100%;
    display: flex;
  }
  .center div {
    flex: 1;
    text-align: center;
    font-size: 14px;
  }
  .left img {
    margin-top: 10px;
    margin-right: 10px;
  }
  .isActive {
    color: var(--color-high-text);
  }
  .itemInfo {
    margin: 0px 5px;
  }
</style>
