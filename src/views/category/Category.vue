<template>
  <div id="category">
    <nav-bar class="navbar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <left-nav
        class="leftNav"
        :categoryList="categoryList"
        :curIndex="curIndex"
        @categoryClick="changeIndex"
      ></left-nav>
      <right-content
        class="rightContent"
        :subcategories="showSubcategory"
        @curConBarIndex="getDetail"
      >
        <div slot="goodsList">
          <detail-goods-list :goodsList="showCategoryDetail"></detail-goods-list>
        </div>
      </right-content>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';

  import LeftNav from './childComps/catLeftNav';
  import RightContent from './childComps/catContent';
  import DetailGoodsList from './childComps/catDetail';

  import { getCategory, getSubcategory, getSubcatDetail } from 'network/category.js';
  export default {
    name: 'Category',
    created() {
      this._getCategory();
    },
    data() {
      return {
        categoryList: [],
        categoryData: {},
        curIndex: -1,
        curType: 'pop'
      };
    },
    computed: {
      showSubcategory() {
        if (this.curIndex === -1) return {};
        return this.categoryData[this.curIndex].subcategories;
      },
      showCategoryDetail() {
        if (this.categoryData[this.curIndex])
          return this.categoryData[this.curIndex].categoryDetail[this.curType];
      }
    },
    methods: {
      changeIndex(index) {
        this.curIndex = index;
        this._getSubcategory(index);
      },
      getDetail(type) {
        this.curType = type;
      },

      _getCategory() {
        getCategory().then(res => {
          this.categoryList = res.data.category.list;
          // 初始化每个类别的子数据
          for (let i = 0; i < this.categoryList.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                pop: [],
                new: [],
                sell: []
              }
            };
          }
          this._getSubcategory(0);
        });
      },
      _getSubcategory(index) {
        this.curIndex = index;
        let maitkey = this.categoryList[index].maitKey;
        getSubcategory(maitkey).then(res => {
          this.categoryData[index].subcategories = res.data;
          this.categoryData = { ...this.categoryData };
          this._getSubcatDetail('pop');
          this._getSubcatDetail('sell');
          this._getSubcatDetail('new');
        });
      },
      _getSubcatDetail(type) {
        let miniWallkey = this.categoryList[this.curIndex].miniWallkey;
        getSubcatDetail(miniWallkey, type).then(res => {
          this.categoryData[this.curIndex].categoryDetail[type] = res;
          this.categoryData = { ...this.categoryData };
        });
      }
    },
    components: {
      NavBar,
      LeftNav,
      RightContent,
      DetailGoodsList
    }
  };
</script>

<style scoped>
  .navbar {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
  }
  .content {
    display: flex;
    position: relative;
    height: 100vh;
  }
  .content .leftNav {
    width: 30%;
  }
  .content .rightContent {
    flex: 1;
  }
</style>
