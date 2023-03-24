<script setup>
import { checkCompatEnabled } from '@vue/compiler-core';
import {ref} from 'vue'
const continents = [
   {
      id: 1,
      value: 'Mới nhất',
      column: '',
      type: '',
   },
   {
      id: 2,
      value: 'Giá thấp',
      column: 'cur_price',
      type: 'asc',
   },
   {
      id: 3,
      value: 'Giá cao',
      column: 'cur_price',
      type: 'desc',
   },
   {
      id: 4,
      value: 'Trả góp 0%',
      column: 'intallment',
      type: true,
   },
];

const checked = ref(1)

const handleToggle = (id) => {
   checked.value = id;
}

</script>

<template>
   <div class='product-sort'>
         <h1>Xem theo</h1>
         <ul class='btn-group'>
                  <li
                  v-for="item, index in continents"
                     class ='sort-btn'
                     :class="{active: item.id === checked}"
                     @click="() => handleToggle(item.id)"
                  >
                     {{item.value}}
                  </li>
         </ul>
      </div>
</template>
<style lang="scss">
.btn-group, .product-sort {
   display: flex;
   
}
.product-sort {
   margin-top: 15px;
   align-items: center;
   h1 {
       margin-right: 20px;
   }
}
.btn-group {
   border: 1px solid #e1e1e1;
   .sort-btn {
       padding: 5px 10px;
       font-size: 1.6rem;
       border: 1px solid transparent;
       border-left-color: #e1e1e1;
       cursor: pointer;
       &:hover {
           border-color: #cd1818;
       }
   }
   .sort-btn.active {
       background-color: #cd1818;
       color: #fff;
       border-left-color: #cd1818

   }
}
</style>