<script setup>
import { ref } from "vue";
import Checkbox from "./childs/Checkbox.vue";
import Radiobox from "./childs/Radiobox.vue";
import { brands, prices } from "./childs/continents";
</script>

<template>
  <div class="col col-3">
    <div class="product-filter">
      <div class="filter-section">
        <h2 class="filter-title">Hãng sản xuất</h2>
        <div class="filter-list">
          <Checkbox :data="brands['dtdd']" />
          <!-- truyền handleFilter vào cop Checkbox, chực hiện sau trể về đối số là filter sau đó tt -->
        </div>
      </div>
      <div class="filter-section">
        <h2 class="filter-title">Mức giá</h2>
        <div class="filter-list price">
          <Radiobox :data="prices['dtdd']" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product-filter {
  padding: 10px;
  padding-top: 15px;
  margin-top: 15px;
  margin-left: 30px;
}
.filter-section {
  margin-bottom: 25px;
  padding-left: 5px;
}
.filter-title {
  margin-bottom: 15px;
  font-weight: 600;
}
.filter-list {
  display: flex;
  flex-wrap: wrap;
  column-gap: 15px;
  row-gap: 17px;
}
.price {
  flex-direction: column;
}
</style>
