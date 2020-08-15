<template>
  <div class="ShopInfo">
    <div class="services">
      <div v-for="service in services" class="service">
        <img :src="service.icon" alt="" />
        <span>{{ service.name }}</span>
      </div>
    </div>
    <div class="store">
      <div class="logo"><img :src="shopInfo.shopLogo" alt="" /></div>
      <div class="name">
        <span>{{ shopInfo.name }}</span>
      </div>
    </div>
    <div class="storeInfo">
      <div class="storeFans">
        <div class="cSells">
          <p class="num">{{ (shopInfo.cSells / 10000).toFixed(1) }}万</p>
          <p class="text">总销量</p>
        </div>
        <div class="cGoods">
          <p class="num">{{ shopInfo.cGoods }}</p>
          <p class="text">全部宝贝</p>
        </div>
      </div>
      <div class="storeScore">
        <div v-for="item in shopInfo.score" class="scoreItem">
          <div>{{ item.name }}</div>
          <div class="score" :style="{ color: item.isBetter ? 'var(--color-high-text)' : 'green' }">
            {{ item.score }}
          </div>
          <div
            :style="{ backgroundColor: item.isBetter ? 'var(--color-high-text)' : 'green' }"
            class="better"
          >
            {{ item.isBetter ? '高' : '低' }}
          </div>
        </div>
      </div>
    </div>
    <p class="shopUrl"><a :href="shopInfo.shopUrl">进店逛逛</a></p>
  </div>
</template>

<script>
  export default {
    name: 'detailShopInfo',
    props: {
      shopInfo: {
        type: Object,
        required: true
      }
    },
    data() {
      return {};
    },
    computed: {
      services() {
        if (this.shopInfo.services != undefined) {
          return this.shopInfo.services.reverse();
        }
      }
    }
  };
</script>

<style scoped>
  .ShopInfo {
    margin: 0px 5px;
    margin-bottom: 20px;
  }
  .services {
    font-size: 12px;
    text-align: center;
    display: flex;
    padding: 15px 0px;
    border-bottom: 4px solid #f6f6f6;
  }
  .services .service {
    flex: 1;
  }
  .services .service:first-child {
    text-align: left;
  }
  .services .service:last-child {
    text-align: right;
  }
  .service span {
    margin-bottom: 2px;
  }
  .service img {
    height: 15px;
    width: 15px;
    margin-top: 2px;
  }
  .store {
    display: flex;
    margin-top: 10px;
  }
  .store .logo {
    height: 50px;
    width: 50px;
    border-radius: 100%;
    overflow: hidden;
    border: 2px solid #f6f6f6;
  }
  .store .logo img {
    width: 100%;
    height: auto;
  }
  .store .name {
    margin-left: 10px;
    font-size: 16px;
    line-height: 50px;
  }
  .storeInfo {
    display: flex;
  }

  .storeFans {
    display: flex;
    width: 50%;
    text-align: center;
  }
  .storeFans div {
    padding: 0px 20px;
    margin: 20px 0px;
  }
  .storeFans div:last-child {
    padding-left: 0px;
    border-right: 2px solid #f6f6f6;
  }
  .storeFans .num {
    font-size: 16px;
  }
  .storeFans .text {
    font-size: 12px;
  }
  .storeScore {
    width: 50%;
    font-size: 12px;
    padding: 10px 20px;
  }
  .storeScore .scoreItem {
    display: flex;
  }
  .storeScore .scoreItem div {
    flex: 1 1 auto;
    margin: 4px 4px;
  }
  .storeScore .scoreItem .score {
    width: 25px;
  }
  .storeScore .scoreItem .better {
    border-radius: 20%;
    color: #fff;
  }
  .shopUrl a {
    font-size: 12px;
    text-align: center;
    margin-left: 90px;
    line-height: 20px;
    display: block;
    height: 20px;
    width: 130px;
    background-color: #f0f0f0;
  }
</style>
