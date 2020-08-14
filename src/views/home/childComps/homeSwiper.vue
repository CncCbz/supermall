<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.acm">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperImgLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import { Swiper, SwiperItem } from 'components/common/swiper';
  export default {
    name: '',
    props: {
      banners: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        isSwiperImgLoad: false
      };
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      swiperImgLoad() {
        if (!this.isSwiperImgLoad) {
          this.$emit('swiperImgLoad');
          this.isSwiperImgLoad = true;
        }
      }
    }
  };
</script>

<style scoped></style>
