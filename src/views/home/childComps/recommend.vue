<template>
  <div class="recommend">
    <div v-for="item in recommend" class="recommendItem">
      <a :href="item.link">
        <img :src="item.image" alt="" />
      </a>
      <div>{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Recommend',
    props: {
      recommend: {
        type: Array,
        default: []
      }
    },
    data() {
      return {};
    }
  };
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    padding: 10px 0px 15px 0px;
  }
  .recommendItem {
    flex: 1;
    font-size: 14px;
  }

  .recommend a img {
    height: 65px;
    width: 65px;
    margin-bottom: 5px;
  }
</style>
