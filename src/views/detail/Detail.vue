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
    <scroll class="content" ref="scroll" @position="contentScroll">
      <detail-swiper :banners="itemInfo.topImages"></detail-swiper>
      <item-info :itemInfo="itemInfo" :goodsDetail="goodsDetail" class="itemInfo"></item-info>
      <shop-info :shopInfo="shopInfo"></shop-info>
      <detail-info
        :detailInfo="goodsDetail.detailInfo"
        :detailImage="detailImage"
        @detailImgLoad="detailImgLoad"
      ></detail-info>
      <item-params :itemParams="itemParams" ref="itemParams"></item-params>
      <rate :rate="rate" ref="detailRate"></rate>
      <goods-list :list="recommendList" ref="recommendList"></goods-list>
    </scroll>
    <back-top class="backTop" @click.native="topClick" v-show="backTop_isActive"></back-top>
    <bottom-bar @showSku="showSku"></bottom-bar>
    <sku class="sku" :skuInfo="skuInfo" v-show="isSku" @showInfoClose="showInfoClose"></sku>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import Scroll from 'components/common/scroll/scroll';

  import GoodsList from 'components/content/goodsList/goods';
  import BackTop from 'components/content/backTop/backTop';

  import DetailSwiper from './childComps/detailSwiper';
  import ItemInfo from './childComps/detailItemInfo';
  import ShopInfo from './childComps/detailShopInfo';
  import DetailInfo from './childComps/detailDetailInfo';
  import ItemParams from './childComps/detailItemParams';
  import Rate from './childComps/detailRate';
  import BottomBar from './childComps/detailBottomBar';
  import Sku from './childComps/detailSku';

  import { getDetailGoodsdata, getDetailRecommend } from 'network/detail';

  export default {
    name: 'Detail',
    data() {
      return {
        iid: '',
        itemInfo: {},
        shopInfo: {},
        goodsDetail: {},
        detailImage: {},
        itemParams: {},
        rate: {},
        recommendList: [],
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0,
        backTop_isActive: false,
        themeTopYs: [],
        skuInfo: {},
        isSku: false
      };
    },
    created() {
      this.iid = this.$route.params.iid;
      getDetailGoodsdata(this.iid).then(res => {
        this.goodsDetail = res.result;
        this.itemInfo = res.result.itemInfo;
        this.shopInfo = res.result.shopInfo;
        this.detailImage = res.result.detailInfo.detailImage[0];
        this.itemParams = res.result.itemParams;
        this.rate = res.result.rate;
        this.skuInfo = res.result.skuInfo;
      });
      getDetailRecommend().then(res => {
        this.recommendList = res.data.list;
      });
    },
    mounted() {},
    methods: {
      /**
       * 监听事件
       */
      navClick(index) {
        this.currentIndex = index;
        switch (index) {
          case 0:
            this.$refs.scroll.scrollTo(0, 0, 500);
            break;
          case 1: {
            // let el = document.querySelector('.itemParams');
            // this.$refs.scroll.scrollToElement(el, 500);
            this.$refs.scroll.scrollTo(0, this.themeTopYs[index], 500);
            break;
          }
          case 2: {
            // let el = document.querySelector('.detailRate');
            // this.$refs.scroll.scrollToElement(el, 500);
            this.$refs.scroll.scrollTo(0, this.themeTopYs[index], 500);
            break;
          }
          case 3: {
            // let el = document.querySelector('.goods');
            // this.$refs.scroll.scrollToElement(el, 500);
            this.$refs.scroll.scrollTo(0, this.themeTopYs[index], 500);
            break;
          }
        }
      },
      backClick() {
        this.$router.back();
      },
      detailImgLoad() {
        this.$refs.scroll.refresh();

        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(-1 * this.$refs.itemParams.$el.offsetTop);
        this.themeTopYs.push(-1 * this.$refs.detailRate.$el.offsetTop);
        this.themeTopYs.push(-1 * this.$refs.recommendList.$el.offsetTop);
        this.themeTopYs.push(-Infinity);
      },
      topClick() {
        this.$refs.scroll.scrollTo(0, 0, 500);
      },
      contentScroll(position) {
        if (position.y <= -700) {
          this.backTop_isActive = true;
        } else {
          this.backTop_isActive = false;
        }
        for (let i = 0; i < this.themeTopYs.length; i++) {
          if (position.y <= this.themeTopYs[i] && position.y > this.themeTopYs[i + 1]) {
            this.currentIndex = i;
          }
        }
      },
      showSku() {
        this.isSku = !this.isSku;
      },
      showInfoClose() {
        this.isSku = false;
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
      DetailInfo,
      ItemParams,
      Rate,
      GoodsList,
      BackTop,
      BottomBar,
      Sku
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
    bottom: 49px;
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
  .backTop {
    position: fixed;
    bottom: 50px;
    right: 10px;
  }
</style>
