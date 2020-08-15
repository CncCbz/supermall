<template>
  <div id="detail">
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
    <scroll class="content" ref="scroll">
      <detail-swiper :banners="itemInfo.topImages"></detail-swiper>
      <item-info :itemInfo="itemInfo" :goodsDetail="goodsDetail" class="itemInfo"></item-info>
      <shop-info :shopInfo="shopInfo"></shop-info>
      <detail-info
        :detailInfo="goodsDetail.detailInfo"
        :detailImage="detailImage"
        @detailImgLoad="detailImgLoad"
      ></detail-info>
    </scroll>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import Scroll from 'components/common/scroll/scroll';

  import DetailSwiper from './childComps/detailSwiper';
  import ItemInfo from './childComps/detailItemInfo';
  import ShopInfo from './childComps/detailShopInfo';
  import DetailInfo from './childComps/detailDetailInfo';

  import { getDetailGoodsdata } from 'network/detail';
  import { debounce } from 'common/utils';

  export default {
    name: 'Detail',
    data() {
      return {
        iid: '',
        itemInfo: {},
        shopInfo: {},
        goodsDetail: {},
        detailImage: {},
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      };
    },
    created() {
      this.iid = this.$route.params.iid;
      getDetailGoodsdata(this.iid).then(res => {
        this.goodsDetail = res.result;
        // this.banners = res.result.itemInfo.topImages;
        this.itemInfo = res.result.itemInfo;
        this.shopInfo = res.result.shopInfo;
        this.detailImage = res.result.detailInfo.detailImage[0];
      });
    },
    mounted() {},
    methods: {
      /**
       * 监听事件
       */
      navClick(index) {
        this.currentIndex = index;
      },
      backClick() {
        this.$router.back();
      },
      detailImgLoad() {
        this.$refs.scroll.refresh();
      }
      /**
       * 网络请求相关
       */
    },
    components: {
      NavBar,
      Scroll,
      DetailSwiper,
      ItemInfo,
      ShopInfo,
      DetailInfo
    }
  };
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    overflow: hidden;
    background-color: #fff;
  }
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
