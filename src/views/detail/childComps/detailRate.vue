<template>
  <div class="detailRate">
    <div class="title">
      <span>用户评价</span>
      <span><a href="">更多</a></span>
    </div>
    <div class="userInfo">
      <div class="avatar"><img :src="user.avatar" alt="" /></div>
      <div class="userName">{{ user.uname }}</div>
    </div>
    <div class="userRate">
      <div class="rateContent">{{ rateList.content }}</div>
      <div class="rateImg" v-show="hasRateImg">
        <img v-for="img in rateImages" :src="img" alt="" />
      </div>
      <div class="rateInfo">
        <div class="rateDate">{{ rateDate | showDate }}</div>
        <div class="rateStyle">{{ rateList.style }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { formatDate } from 'common/utils';

  export default {
    name: 'detailRate',
    props: {
      rate: {
        type: Object,
        defaule() {
          return {};
        }
      }
    },
    data() {
      return {
        rateList: {},
        user: {},
        hasRateImg: false,
        rateImages: [],
        rateDate: 0
      };
    },
    watch: {
      rate() {
        if (this.rate.hasOwnProperty('list')) {
          this.user = this.rate.list[0].user;
          this.rateList = this.rate.list[0];
          this.hasRateImg = this.rate.list[0].hasOwnProperty('images');
          this.rateDate = this.rate.list[0].created;
          if (this.hasRateImg) {
            this.rateImages = this.rate.list[0].images;
          }
        }
      }
    },
    filters: {
      showDate(value) {
        const date = new Date(value * 1000);
        return formatDate(date, 'yyyy-MM-dd');
      }
    }
  };
</script>

<style scoped>
  .detailRate {
    margin: 0px 5px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f6f6f6;
  }
  .title {
    padding: 20px 0px;
    font-size: 14px;
    border-bottom: 2px solid #f6f6f6;
  }
  .title span:last-child {
    float: right;
  }
  .userInfo {
    display: flex;
    margin: 10px 0px;
  }
  .userInfo div {
    flex: 0 0 auto;
  }
  .userInfo .avatar {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    overflow: hidden;
  }
  .userInfo .avatar img {
    width: 40px;
  }
  .userInfo .userName {
    font-size: 14px;
    margin-left: 10px;
    line-height: 40px;
  }
  .userRate {
    font-size: 13px;
  }
  .userRate .rateContent {
    margin-bottom: 10px;
  }
  .userRate .rateImg {
    border-radius: 5px;
    width: 40%;
    overflow: hidden;
  }
  .userRate .rateImg img {
    width: 100%;
  }
  .userRate .rateInfo {
    font-size: 13px;
    color: #aaa;
    display: flex;
  }
  .userRate .rateInfo .rateDate {
    margin-right: 10px;
  }
</style>
