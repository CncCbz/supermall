<template>
  <div class="sku">
    <div class="preview" v-show="preImg != undefined">
      <div class="preImg"><img :src="preImg" alt="" /></div>
      <div class="prePrice">
        <span>￥</span>
        <em>{{ totalPrice / 100 }}</em>
        <span>.{{ totalPrice % 100 }}</span>
      </div>
      <div class="preText">
        <span>已选:</span>
        <span>{{ preStyle }}</span>
      </div>
    </div>
    <div class="props">
      <div v-for="prop in propInfos" class="prop" :name="prop.list[0].type">
        <span class="label">{{ prop.label }}</span>
        <div class="choices">
          <div
            :name="item.type + item.index"
            class="choice"
            v-for="(item, index) in prop.list"
            @click="choiceClick(item, index)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="counter">
        <span>数量</span>
        <div class="num">
          <div @click="counter++">+</div>
          <div class="curCounter">{{ counter }}</div>
          <div @click="counter--" v-show="counter > 0">-</div>
        </div>
      </div>
    </div>
    <div class="buttom">
      <div class="addCart" @click="addCart">加入购物车</div>
      <div class="buy" @click="buy">购买</div>
    </div>
    <div class="close" @click="close"></div>
  </div>
</template>

<script>
  export default {
    name: 'Sku',
    props: {
      skuInfo: {
        type: Object
      },
      iid: {
        type: String
      }
    },
    data() {
      return {
        propInfos: [],
        skus: [],
        counter: 1,
        current: { styleId: undefined, sizeId: undefined },
        styleCurDom: null,
        sizeCurDom: null,
        preImg: null,
        preStyle: null,
        prePrice: 0
      };
    },
    watch: {
      skuInfo() {
        this.propInfos = this.skuInfo.props;
        this.skus = this.skuInfo.skus;
      },
      'current.styleId': {
        handler(newId, oldId) {
          if (this.current.sizeId != undefined) {
            for (let item in this.skus) {
              if ((item.styleId == this.current.styleId) & (item.sizeId == this.current.sizeId)) {
                this.preImg = item.img;
                this.preStyle = item.size + item.style;
                this.prePrice = item.nowprice;
              }
            }
          }
        },
        deep: true,
        immediate: true
      },
      'current.sizeId': {
        handler(newId, oldId) {
          if (this.current.styleId != undefined) {
            for (let item of this.skus) {
              if ((item.styleId == this.current.styleId) & (item.sizeId == this.current.sizeId)) {
                this.preImg = item.img;
                this.preStyle = item.size + '-' + item.style;
                this.prePrice = item.nowprice;
              }
            }
          }
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      choiceClick(item, index) {
        let key = item.type + 'Id';
        let val = item[key];
        let str = 'this.current.' + key + "='" + val + "'";
        eval(str);
        console.log(this.current);
        let dom = document.getElementsByName(item.type)[0].getElementsByClassName('choice')[index];
        if (item.type == 'style') {
          if (this.styleCurDom) {
            this.styleCurDom.style.backgroundColor = '#e8e8e8';
            this.styleCurDom.style.color = 'var(--color-text)';
            this.styleCurDom = dom;
            this.styleCurDom.style.backgroundColor = 'red';
            this.styleCurDom.style.color = '#fff';
          } else {
            this.styleCurDom = dom;
            this.styleCurDom.style.backgroundColor = 'red';
            this.styleCurDom.style.color = '#fff';
          }
        } else if (item.type == 'size') {
          if (this.sizeCurDom) {
            this.sizeCurDom.style.backgroundColor = '#e8e8e8';
            this.sizeCurDom.style.color = 'var(--color-text)';
            this.sizeCurDom = dom;
            this.sizeCurDom.style.backgroundColor = 'red';
            this.sizeCurDom.style.color = '#fff';
          } else {
            this.sizeCurDom = dom;
            this.sizeCurDom.style.backgroundColor = 'red';
            this.sizeCurDom.style.color = '#fff';
          }
        }
      },
      close() {
        this.$emit('showInfoClose');
      },
      addCart() {
        if (
          (this.current.sizeId != undefined) &
          (this.current.styleId != undefined) &
          (this.counter != 0)
        ) {
          let iid = this.iid;
          let title = this.skuInfo.title;
          let img = this.preImg;
          let style = this.preStyle;
          let counter = this.counter;
          let price = this.prePrice;
          let cartInfo = {
            iid,
            title,
            img,
            style,
            counter,
            price
          };
          this.$store.commit('addCart', cartInfo);
          this.$emit('addCartSuccess');
        } else {
          alert('请正确选择款式!');
        }
      },
      buy() {
        alert('购买成功！');
      }
    },
    computed: {
      totalPrice() {
        return this.prePrice * this.counter;
      }
    }
  };
</script>

<style scoped>
  .sku {
    background-color: #fff;
    border-radius: 10px;
    /* height: 100px; */
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    box-shadow: 0 -2px 2px rgba(150, 150, 150, 1);
    padding-bottom: 10px;
  }
  .prop {
    margin: 10px 0px;
  }
  .label {
    font-weight: bold;
  }
  .choices {
    display: flex;
    flex-wrap: wrap;
  }
  .choices .choice {
    background-color: #e8e8e8;
    border-radius: 8px;
    padding: 5px 5px;
    margin: 5px 10px;
    font-size: 13px;
  }
  .counter span {
    font-weight: bold;
  }
  .counter .num {
    float: right;
  }
  .counter .num div {
    float: right;
    margin: 0px 5px;
    font-weight: bold;
  }
  .curCounter {
    background-color: #e8e8e8;
    padding: 0px 10px;
  }
  .preview {
    display: flex;
    position: relative;
    /* display: block; */
  }
  .preImg {
    width: 90px;
    height: 90px;
    overflow: hidden;
    border-radius: 10px;
  }
  .preImg img {
    width: 90px;
    height: auto;
  }
  .preview .preText {
    position: absolute;
    left: 100px;
    bottom: 0px;
  }
  .preview .prePrice {
    position: absolute;
    left: 100px;
    bottom: 30px;
    font-size: 30px;
    color: var(--color-high-text);
  }
  .preview .prePrice span {
    font-size: 17px;
  }
  .buttom {
    display: flex;
    margin-top: 10px;
  }
  .buttom div {
    color: #fff;
    flex: 1;
    text-align: center;
    margin: 0px 20px;
    border-radius: 20px;
    height: 30px;
    line-height: 30px;
  }
  .buttom .addCart {
    background-color: #f3d301;
    /* height: 10px; */
  }
  .buttom .buy {
    background-color: #fd7b83;
    /* height: 10px; */
  }
  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    height: 20px;
    width: 20px;
    background: url('~assets/img/detail/close.png');
    background-repeat: no-repeat;
    background-size: 30px 30px;
    background-position: center;
    border-radius: 100%;
  }
</style>
