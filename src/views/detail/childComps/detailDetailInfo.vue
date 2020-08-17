<template>
  <div class="detailInfo">
    <div class="desc--start lineBar"><i class="lineBar--dot"></i></div>
    <div class="desc--text">{{ detailInfo.desc }}</div>
    <div class="desc--end lineBar"><i class="lineBar--dot"></i></div>
    <div class="detailImage">
      <div class="detailImageKey">
        {{ detailImage.key }}
      </div>
      <img v-for="item in detailImage.list" :src="item" alt="" @load="imgLoad" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'detailInfo',
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {};
        }
      },
      detailImage: {
        type: Object
      }
    },
    methods: {
      imgLoad() {
        if (++this.counter === this.imagesLength) {
          this.$emit('detailImgLoad');
        }
      }
    },
    watch: {
      detailImage() {
        this.imagesLength = this.detailImage.list.length;
      }
    },
    data() {
      return {
        counter: 0,
        imagesLength: 0
      };
    }
  };
</script>

<style scoped>
  .detailInfo {
    padding-top: 20px;
    border-top: 2px solid #f6f6f6;
  }
  .lineBar {
    width: 4.8rem;
    height: 0.8px;
    background: #a3a3a5;
    position: relative;
  }
  .lineBar--dot {
    display: inline-block;
    width: 0.3rem;
    height: 0.3rem;
    background: #000;
    border-radius: 10%;
    position: absolute;
    top: -0.15rem;
  }
  .desc--end {
    float: right;
    position: relative;
  }
  .desc--end i {
    position: absolute;
    right: 0px;
    bottom: 0px;
  }
  .desc--text {
    font-size: 12px;
    padding: 10px 0px;
  }
  .detailImage .detailImageKey {
    margin: 10px 0px;
  }
  .detailImage img {
    width: 100%;
    height: auto;
  }
</style>
