<template>
  <div class="conbar">
    <div v-for="(title, index) in titles" class="title" @click="barClick(index)">
      <span :class="{ isActive: index == curConBarIndex }">{{ title }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ConBar',
    props: {
      titles: {
        type: Array
      }
    },
    data() {
      return {
        curConBarIndex: 0
      };
    },
    methods: {
      barClick(index) {
        if (this.curConBarIndex != index) this.$emit('curConBarIndex', index);
        this.curConBarIndex = index;
      }
    }
  };
</script>

<style scoped>
  .conbar {
    display: flex;
  }
  .conbar .title {
    flex: 1;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 13px;
  }
  .conbar .title span {
    padding: 5px 3px;
  }
  .isActive {
    border-bottom: 1.5px solid var(--color-high-text);
  }
</style>
