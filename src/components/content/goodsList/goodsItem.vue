<template>
  <div class="goodsItem" @click="goodsItemClick">
    <img :src="showImg" alt="" @load="imgLoad" />
    <div class="goodsInfos">
      <p>{{ goodsItem.title }}</p>
      <p>
        <span class="price">{{ goodsItem.price }}</span>
        ☆
        <span class="cfav">{{ goodsItem.cfav }}</span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'goodsItem',
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {};
        }
      }
      // path: {
      //   type: String,
      //   required: true
      // }
    },
    data() {
      return {};
    },
    methods: {
      goodsItemClick() {
        let iid = this.goodsItem.item_id;
        if (iid == undefined) {
          iid = this.goodsItem.iid;
          this.$emit('goodsItemClick');
          this.$router.push('/detail/' + iid);
        } else {
          alert('没有数据，别点啦！！！');
        }
        // let iid = this.goodsItem.iid;
        // this.$emit('goodsItemClick');
        // this.$router.push('/detail/' + iid);
      },
      imgLoad() {
        this.$bus.$emit('goodsItemImgLoad');
      }
    },
    computed: {
      showImg() {
        return this.goodsItem.image || this.goodsItem.img || this.goodsItem.show.img;
      }
    }
  };
</script>

<style scoped>
  .goodsItem {
    width: 48%;
  }
  .goodsItem img {
    width: 100%;
    border-radius: 2%;
  }
  .goodsInfos p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
  }
  .goodsItem span {
    font-size: 14px;
  }
  .goodsInfos .price {
    color: var(--color-high-text);
  }
</style>
