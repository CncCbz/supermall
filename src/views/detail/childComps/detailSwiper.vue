<template>
  <swiper>
    <swiper-item v-for="banner in banners" :key="banner">
      <div class="detailSwiper">
        <img :src="banner" alt="" />
      </div>
    </swiper-item>
  </swiper>
</template>

<script>
  import { Swiper, SwiperItem } from 'components/common/swiper';
  export default {
    name: 'DetailSwiper',
    props: {
      banners: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {};
    },
    components: {
      Swiper,
      SwiperItem
    }
  };
</script>

<style scoped>
  .detailSwiper {
    height: 250px;
    width: 100%;
    overflow-y: hidden;
  }
</style>
