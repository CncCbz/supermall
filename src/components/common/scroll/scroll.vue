<template>
  <div class="wrapper" ref="scrollWrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        scroll: null
      };
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.scrollWrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      });
      this.scroll.on('scroll', position => {
        this.$emit('position', position);
      });
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp');
      });
    },

    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll.scrollTo(x, y, time);
      },
      finishPullup() {
        this.scroll.finishPullUp();
      }
    }
  };
</script>

<style scoped></style>
