<template>
  <div class="itemParams">
    <div v-for="rules in ruleTables" class="rules">
      <div v-for="item in rules" class="rulesItem">{{ item }}</div>
    </div>
    <div v-for="item in product_info" class="product_info">
      <div>{{ item.key }}</div>
      <div>{{ item.value }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'itemParams',
    props: {
      itemParams: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        ruleTables: [],
        product_info: []
      };
    },
    watch: {
      itemParams() {
        this.ruleTables = this.itemParams.rule.tables[0];
        this.product_info = this.itemParams.info.set;
      }
    }
  };
</script>

<style scoped>
  .itemParams {
    margin: 0px 5px;
  }
  .rules {
    display: flex;
  }
  .rules .rulesItem {
    flex: 1;
    padding: 10px 0px;
    border-bottom: 2px solid #f6f6f6;
    font-size: 14px;
    text-align: center;
  }
  .rules div:first-child {
    flex: 0 0 100px;
    text-align: left;
  }
  .rules:last-child {
    border-bottom: 2px solid #e0e0e0;
  }
  .product_info {
    display: flex;
  }
  .product_info div {
    flex: 1;
    font-size: 14px;
    padding: 10px 0px;
    border-bottom: 2px solid #f6f6f6;
    text-align: left;
  }
  .product_info div:first-child {
    flex: 0 0 100px;
  }
  .product_info div:last-child {
    color: var(--color-high-text);
  }
</style>
