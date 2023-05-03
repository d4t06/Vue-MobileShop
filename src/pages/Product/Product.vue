<script setup>
import { useRoute } from "vue-router";
import { watch, ref, computed } from "vue";
import { storeToRefs } from "pinia";
// action
import { getAllAndStoring } from "@/store/actions/";
// store
import { useProductsStore } from "@/store/productStore";
import { useFiltersStore } from "@/store/filterStore";
import { useAuthStore } from "../../store/authStore";

// component
import { banners } from "@/assets/data";
import NoProduct from "./NoProduct.vue";
import ImageSlider from "@/components/ImageSlider/ImageSlider.vue";
import ProductItem from "@/components/ProductItem/ProductItem.vue";
import ProductFilter from "@/components/ProductFilter/ProductFilter.vue";
import Button from "@/components/Button/index.vue";
import QuickFilter from "@/components/QuickFilter/QuickFilter.vue";
import ProductSort from "../../components/ProductSort/ProductSort.vue";

const productsStore = useProductsStore();
const filtersStore = useFiltersStore();
const route = useRoute();
const curCategory = ref('undefine');

const { products, page, status, category } = storeToRefs(productsStore);
const { filters, sort } = storeToRefs(filtersStore);

const countProduct = computed(
   () => products.value.count - page.value * products.value.page_size
);

const isFiltered = computed(
   () => !!(filters.value.brand || filters.value.price)
);

const handleFilter = computed(() => {
   if (!isFiltered.value) return '';

   if (!filters.value.brand && isFiltered) {
      return { price: filters.value.price }
   }
   if (!filters.value.price && isFiltered) {
      return { brand: filters.value.brand }
   }

   return filters.value
})

watch(
   route,
   async () => {
      curCategory.value = route.params.category;

      // nếu chuyển từ categoty khác
      if (category.value !== curCategory.value) {
         getAllAndStoring(productsStore, {
            category: curCategory.value,
            page: 1
         })
      } else
      // nếu cùng category
      getAllAndStoring(productsStore, {
         filters: isFiltered.value ? filters.value : "",
         sort: sort.value.column ? sort.value : "",
         category: curCategory.value,
         page: page.value || 1,
      });
   },
   { immediate: true }
);

const bannerImages = computed(() => {
   return banners[curCategory.value]
      .slice(0, banners[curCategory.value].length - 5)
      .split("*and*");
});

const handleGetMore = () => {
   getAllAndStoring(productsStore, {
      filters: handleFilter.value,
      sort: sort.value.column ? sort.value : "",
      category: curCategory.value,
      page: page.value + 1,
   });
};
</script>
<template>
   <div class="product-container">
      <ImageSlider :data="bannerImages" banner />

      <div class="product-body row">
         <div class="col col-9">
            <h1 class="mt10">
               {{ curCategory === "dtdd" ? "Điện thoại " : "Laptop " }}
               (
               <strong style="color: red">{{ products.count }}</strong>
               ) sản phẩm
            </h1>
            <QuickFilter />
            <ProductSort />

            <ProductItem v-if="products.rows.length" :data="products.rows" />

            <div class="pagination" v-if="products.rows.length">
               <Button
                  outline
                  rounded
                  :count="countProduct < 0 ? 0 : countProduct"
                  describe="sản phẩm"
                  @click="() => handleGetMore()"
                  :disable="!!(countProduct <= 0)"
                  hasIcon
                  :loading="status === 'loading'"
               >
                  Xem thêm
               </Button>
            </div>

            <NoProduct v-if="!products.rows.length" />
         </div>

         <ProductFilter :category="curCategory" />
      </div>
   </div>
</template>

<style scoped lang="scss">
@import "./Product.module.scss";
</style>
