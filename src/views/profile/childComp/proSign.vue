<template>
  <div class="sign">
    <div class="avatar">
      <img src="~assets/img/profile/avatar.svg" alt="" />
    </div>
    <div class="text">
      <div class="info">登录/注册</div>
      <div class="phone">
        <img src="~assets/img/profile/phone.svg" alt="" />
        <span>暂无绑定手机号</span>
      </div>
    </div>
    <div class="arrowLeft">
      <img src="~assets/img/common/arrow-left.svg" alt="" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Sign',
    data() {
      return {};
    }
  };
</script>

<style scoped>
  .sign {
    display: flex;
    background-color: var(--color-tint);
    align-items: center;
    height: 25%;
    position: relative;
  }
  .avatar {
    height: 60px;
    width: 60px;
    margin: 10px 10px;
  }
  .avatar img {
    width: 100%;
  }
  .text {
    display: flex;
    flex-direction: column;
    color: #fff;
  }
  .text img {
    width: 18px;
    height: auto;
  }
  .text .info {
    padding-left: 3px;
  }
  .text .phone {
    display: flex;
    align-items: center;
    font-size: 12px;
  }
  .arrowLeft {
    height: 20px;
    width: 20px;
    position: absolute;
    right: 20px;
  }
  .arrowLeft img {
    width: 100%;
  }
</style>
