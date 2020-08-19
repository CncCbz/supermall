<template>
  <div id="Cart">
    <nav-bar class="cartNav">
      <div class="center" slot="center">购物车({{ cartList.length }})</div>
    </nav-bar>
    <scroll class="content">
      <div v-for="(item, index) in cartList" class="item" :name="item.iid + '_' + index">
        <div class="checkBox" @click="checked(item.iid, index, item.price * item.counter)">
          <img src="~assets/img/cart/tick.svg" alt="" />
        </div>
        <div class="itemImg">
          <img :src="item.img" alt="" />
        </div>
        <div class="itemInfos">
          <div class="title">{{ item.title }}</div>
          <div class="style">{{ item.style }}</div>
          <div class="price">
            <span>¥</span>
            <em>{{ parseInt(item.price / 100) }}</em>
            <span>.{{ item.price % 100 }}</span>
            <span class="delete" @click="deleteItem(item.iid, item.style)">删除</span>
            <span class="counter">x{{ item.counter }}</span>
          </div>
        </div>
      </div>
    </scroll>
    <div class="pay clearFixed">
      <div
        class="allCheckBox"
        @click="checkedAll"
        :style="{ backgroundColor: isAllChecked ? 'var(--color-tint)' : '#fff' }"
      >
        <img src="~assets/img/cart/tick.svg" alt="" />
      </div>
      <span v-if="isAllChecked">全不选</span>
      <span v-else>全选</span>
      <div class="totalPrice">
        总计:
        <span v-if="checkList.length == 0">¥0.00</span>
        <span v-else>¥{{ totalPrice / 100 }}</span>
      </div>
      <div class="payBtn" @click="buy">去结算{{ checkListLength }}件</div>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import Scroll from 'components/common/scroll/scroll';

  export default {
    name: 'Cart',
    created() {
      this.cartList = this.$store.state.cartList;
    },
    watch: {
      checkListLength: {
        handler(newList, oldList) {
          if (newList.length <= 0) {
            this.isShow = false;
          } else {
            this.isShow = true;
          }
        },
        deep: true,
        immediate: true
      }
    },
    data() {
      return {
        cartList: [],
        checkList: [],
        isShow: false
      };
    },
    components: {
      NavBar,
      Scroll
    },
    methods: {
      deleteItem(iid, style) {
        this.$store.commit('deleteCart', { iid, style });
      },
      checked(iid, index, price) {
        let name = iid + '_' + index;
        let obj = { name, price };
        let dom = document.getElementsByName(name)[0].getElementsByClassName('checkBox')[0];
        let checkedIndex = this.checkList.findIndex(val => val.name === name);
        if (checkedIndex == -1) {
          dom.style.backgroundColor = 'var(--color-tint)';
          this.checkList.push(obj);
        } else {
          dom.style.backgroundColor = null;
          this.checkList.splice(checkedIndex, 1);
        }
      },
      checkedAll() {
        let doms = document.getElementsByClassName('checkBox');
        if (this.isAllChecked) {
          for (let dom of doms) {
            dom.style.backgroundColor = '#fff';
            this.checkList.splice(0, this.checkList.length);
          }
        } else {
          this.checkList.splice(0, this.checkList.length);
          this.checkList = this.checkList.concat(this.allCheckList);
          let doms = document.getElementsByClassName('checkBox');
          for (let dom of doms) {
            dom.style.backgroundColor = 'var(--color-tint)';
          }
        }
      },
      buy() {
        this.$store.commit('deleteAll');
        this.checkList.splice(0, this.checkList.length);
        alert('购买成功！');
      }
    },
    computed: {
      allCheckList() {
        let list = [];
        for (let index in this.cartList) {
          let name = this.cartList[index].iid + '_' + index;
          let price = this.cartList[index].counter * this.cartList[index].price;
          let obj = {
            name,
            price
          };
          list.push(obj);
        }
        console.log(list);
        return list;
      },
      checkListLength() {
        return this.checkList.length;
      },
      totalPrice() {
        let sum = 0;
        for (let item of this.checkList) sum += item.price;
        return sum;
      },
      isAllChecked() {
        return this.checkListLength == this.allCheckList.length && this.allCheckList.length > 0;
      }
    }
  };
</script>

<style scoped>
  #Cart {
    overflow: hidden;
    position: relative;
    height: 100vh;
  }
  .cartNav {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: bolder;
    z-index: 9;
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
  .content .item {
    padding-top: 10px;
    display: flex;
  }
  .content .item:last-child {
    padding-bottom: 50px;
  }
  .content .item .checkBox {
    margin: 32.5px 3px;
    height: 20px;
    width: 20px;
    border-radius: 100%;
    box-shadow: 0 0px 3px rgba(150, 150, 150, 1);
  }
  .content .item .checkBox img {
    margin-left: 2px;
    margin-top: 2px;
  }
  .content .item .itemImg {
    height: 85px;
    width: 70px;
    overflow: hidden;
    border-radius: 5px;
    box-shadow: 0 0px 3px rgba(150, 150, 150, 1);
  }
  .content .item .itemImg img {
    width: 100%;
    height: auto;
  }
  .content .itemInfos {
    width: calc((100%-20px -70px) * 0.6);
    margin-left: 15px;
  }
  .content .itemInfos .title {
    margin-top: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
  }
  .content .itemInfos .style {
    white-space: nowrap;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 15px 0px;
  }
  .content .itemInfos .price {
    color: var(--color-high-text);
  }
  .content .itemInfos .price span {
    font-size: 12px;
  }
  .content .itemInfos .price em {
    font-size: 17px;
  }
  .content .itemInfos .price .counter {
    float: right;
    color: #666666;
    font-size: 16px;
  }
  .content .itemInfos .price .delete {
    float: right;
    text-align: center;
    margin: 3px 5px;
  }
  .pay {
    position: absolute;
    background-color: #fff;
    box-shadow: 0 0px 3px rgba(150, 150, 150, 1);
    width: 100%;
    display: flex;
    justify-content: flex-end;
    bottom: 49px;
    border-radius: 5px;
    opacity: 0.8;
  }

  .pay .allCheckBox {
    height: 16px;
    width: 16px;
    margin-top: 15px;
    border-radius: 100%;
    box-shadow: 0 0px 4px rgba(150, 150, 150, 1);
  }
  .pay span {
    margin: 5px 5px;
    line-height: 35px;
    font-size: 14px;
    height: 35px;
    color: red;
  }

  .pay .totalPrice {
    height: 35px;
    line-height: 35px;
    margin: 5px 10px;
    text-align: center;
    font-size: 12px;
    font-weight: bolder;
  }
  .pay .payBtn {
    height: 35px;
    line-height: 35px;
    padding: 0px 10px;
    border-radius: 20px;
    margin: 5px 10px;
    background-color: red;
    text-align: center;
    color: #fff;
    font-size: 12px;
    font-weight: bolder;
  }
</style>
