<template>
  <div class="leftNav">
    <scroll class="conLeft">
      <div
        v-for="(item, index) in categoryList"
        class="category"
        @click="categoryClick(index)"
        :class="{ isActive: index == curIndex }"
      >
        {{ item.title }}
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/scroll';
  export default {
    name: 'LeftNav',
    props: {
      categoryList: {
        type: Array
      },
      curIndex: {
        type: Number
      }
    },
    data() {
      return {};
    },
    components: {
      Scroll
    },
    methods: {
      categoryClick(index) {
        this.$emit('categoryClick', index);
      }
    }
  };
</script>

<style scoped>
  .leftNav {
    height: 100vh;
    position: relative;
  }
  .conLeft {
    position: absolute;
    left: 0px;
    top: 44px;
    bottom: 49px;
    width: 100%;
    overflow: hidden;
  }
  .category {
    height: 45px;
    text-align: center;
    line-height: 45px;
    background-color: #f6f6f6;
    font-size: 12px;
  }
  .isActive {
    background-color: #fff;
    color: red;
  }
</style>
