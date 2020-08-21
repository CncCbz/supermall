<template>
  <div class="rightContent">
    <scroll class="conRight" ref="scroll">
      <div class="subCat">
        <a
          v-if="subcategories.list"
          v-for="item in subcategories.list"
          class="catItem"
          :href="item.link"
        >
          <img :src="item.image" alt="" @load="imgLoad" />
          <div>{{ item.title }}</div>
        </a>
      </div>
      <con-bar :titles="titles" @curConBarIndex="curConBarIndex"></con-bar>
      <slot name="goodsList"></slot>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/scroll';

  import ConBar from './catConBar';
  export default {
    name: 'rightContent',
    props: {
      subcategories: {
        type: Object,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        titles: ['综合', '新品', '销量'],
        type: ['pop', 'new', 'sell']
      };
    },
    created() {
      this.$bus.$on('goodsItemImgLoad', () => {
        this.$refs.scroll.refresh();
      });
    },
    methods: {
      imgLoad() {
        this.$refs.scroll.refresh;
      },
      curConBarIndex(index) {
        let type = this.type[index];
        this.$emit('curConBarIndex', type);
      }
    },
    components: {
      Scroll,
      ConBar
    }
  };
</script>

<style scoped>
  .rightContent {
    height: 100vh;
    position: relative;
  }
  .conRight {
    position: absolute;
    right: 0px;
    top: 44px;
    bottom: 49px;
    width: 100%;
    overflow: hidden;
  }
  .subCat {
    display: flex;
    flex-wrap: wrap;
  }
  .subCat .catItem {
    flex: 1;
    text-align: center;
    font-size: 12px;
    margin: 10px 0px;
  }
  .subCat img {
    width: 60px;
  }
</style>
