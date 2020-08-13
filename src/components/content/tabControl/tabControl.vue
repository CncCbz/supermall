<template>
  <div class="tabControl">
    <div
      class="tabControlItem"
      v-for="(title, index) of titles"
      :class="{ active: current_index === index }"
      @click="spClick(index)"
    >
      <span>
        {{ title }}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        current_index: 0
      };
    },
    props: {
      titles: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    methods: {
      spClick(index) {
        this.current_index = index;
        this.$emit('tabClick', index);
      }
    }
  };
</script>

<style scoped>
  .tabControl {
    display: flex;
    text-align: center;
  }
  .tabControl .tabControlItem {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    padding: 5px;
    border-bottom: 2px solid var(--color-tint);
  }
</style>
