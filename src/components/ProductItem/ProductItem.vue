<script setup>
   import { useRoute } from 'vue-router'
const props = defineProps({
   data: Array,
   search: Boolean
});
const route = useRoute()

</script>

<template>
   <div class="product-container">
      <div class="row">
         <div v-for="item in data" :class="['col', {'col-3' : search, 'col-4': !search}]">
            <div class="product-item">
               <RouterLink :to="`/${route.params.category}/${item.href}`" class="product-item-frame">
                  <img class="product-item-image" :src="item.image"/>
               </RouterLink>
               <div class="product-item-event">
                  <span v-if="item.label" class="event-label"> {{ item.label }} </span>
               </div>

               <div v-if="item.intallment" class="product-item-installment">
                  <span>Trả góp 0%</span>
               </div>

               <div class="product-item-body">
                  <h4 class="product-item_name">{{item.name}}</h4>

                  <div class="product-item_tags">
                     <p
                     v-for="tag in item.feature
                     .slice(0, item.feature.length - 5)
                     .split('*and*')"
                     class="tag"
                     >
                     {{tag}}</p>
                  </div>

                  <div class="product-item_price">
                     <div v-if="item.old_price" class="price-top">
                        <span class="product-item_price--old"> {{ $filter.moneyFormat(item.old_price) }} </span>
                     </div>

                     <h1 class="product-item_price--current">{{ $filter.moneyFormat(item.cur_price) }}</h1>
                  </div>
               </div>

            </div>
         </div>
      </div>
   </div>
</template>

<style scoped lang="scss">
@import './ProductItem.module.scss';
</style>
