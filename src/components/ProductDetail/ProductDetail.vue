<script setup>
import { computed, ref, watchEffect } from "vue";

import ImageSlider from "../../components/ImageSlider/ImageSlider.vue";
import Button from "../../components/Button/index.vue";

import * as productServices from "../../services/productServices";

const props = defineProps({
   data: Object,
});

const category = ref(props.data.category);
const suggestProducts = ref();

watchEffect(async () => {
   suggestProducts.value = await productServices.getSuggest({
      category: category.value,
   });
});

const images = computed(() => {
   return props.data.data[0]?.images
      .slice(0, props.data.data[0].images.length - 5)
      .split("*and*");
});

const paramsIndex = {
   dtdd: [
      "Màn hình",
      "Hệ điều hành",
      "Camera sau",
      "Camera trước",
      "CPU",
      "Bộ nhớ Ram",
      "Dung lượng",
      "Sim",
      "Pin",
   ],
   laptop: [
      "CPU",
      "Bộ nhớ Ram",
      "Ổ cứng",
      "Màn hình",
      "Card đồ họa",
      "Cổng kết nối",
      "Đặt biệt",
      "Hệ điều hành",
      "Thiết kế",
      "Kích thước, khối lượng",
      "Thời điểm ra mắt",
   ],
};

const params = computed(() =>
   props.data.data[0].params
      .slice(0, props.data.data[0]?.params.length - 5)
      .replaceAll("//", ", ")
      .split("*and*")
);

const colors = computed(() => {
   props.data.data[0].colors
      ? props.data.data[0].colors
           .slice(0, props.data.data[0]?.colors.length - 5)
           .split("*and*")
      : "";
});

const memories = computed(
   () =>
      props.data.data[0]?.memories
         ?.slice(0, props.data.data[0].memories.length - 5)
         .split("*and*") || ""
);
</script>
<template>
   <div class="product-header">
      <p>
         {{ category === "dtdd" ? "Điện thoại " : "Laptop " }}
         {{ props.data.name }}
      </p>
      <div class="header-box">
         <span>
            <i class="material-icons star">star</i>
            <i class="material-icons star">star</i>
            <i class="material-icons star">star</i>
            <i class="material-icons star">star</i>
            <i class="material-icons star black">star</i>
         </span>
         <sp class="rate-count">49 đánh giá</sp>
      </div>
   </div>
   <div class="row main-contain">
      <div class="col-large col-7 box_left">
         <ImageSlider :data="images" />

         <div class="detail-image">
            <img
               :src="
                  props.data.data[0].param_image ||
                  'https://cdn.tgdd.vn/Products/Images/44/279259/Kit/asus-tuf-gaming-fx506lhb-i5-hn188w-note.jpg'
               "
               alt=""
            />
         </div>
         <div class="product-detail">
            <div class="col-full content">
               <p class="content-title">
                  Thông tin
                  {{ category === "dtdd" ? "Điện thoại " : "Laptop " }}
                  {{ props.data.name }}
               </p>
               <p class="content-text">
                  Được xem là một trong những phiên bản iPhone "giá rẻ" của bộ 3
                  iPhone 11 series nhưng iPhone 11 128GB vẫn sở hữu cho mình rất
                  nhiều ưu điểm mà hiếm có một chiếc smartphone nào khác sở hữu
               </p>
               <div class="image-frame content-image">
                  <img
                     :src="
                        props.data.data[0].param_image ||
                        'https://cdn.tgdd.vn/Products/Images/44/279259/Kit/asus-tuf-gaming-fx506lhb-i5-hn188w-note.jpg'
                     "
                     alt=""
                  />
               </div>
            </div>
            <button class="more-detail-btn">Xem chi tiết</button>
         </div>
      </div>
      <div class="col-large col-5 box_right">
         <div class="product-price">
            <p class="cur-price">
               {{ $filter.moneyFormat(props.data.cur_price) }}
            </p>
            <span v-if="props.data.old_price" class="old-price">
               {{ $filter.moneyFormat(props.data?.old_price) }}
            </span>
            <span class="vat-tag"> Đã bao gồm 10% VAT </span>
         </div>
         <div class="product-options">
            <h2 v-if="memories">Phiên bản:</h2>
            <div v-if="memories" class="option-group">
               <div
                  v-for="(item, index) in memories"
                  :class="['option', { active: index == 0 }]"
               >
                  <p>{{ item }}</p>
                  <span>+ 500.000₫</span>
               </div>
            </div>

            <h2 v-if="colors">Màu:</h2>
            <div class="option-group">
               <div
                  v-for="(item, index) in colors"
                  :class="['option', { active: index == 0 }]"
               >
                  <p>{{ item }}</p>
                  <span>+ 200.000₫</span>
               </div>
            </div>
         </div>
         <div class="product-cta">
            <Button fill rounded full>Mua Ngay</Button>
         </div>
         <div class="product-policy">
            <h1 class="policy-title">Chính Sách Bảo Hành</h1>
            <ul>
               <li>
                  <div class="icon-frame">
                     <div class="policy-icon icon-doimoi"></div>
                  </div>
                  <span>
                     Hư gì đổi nấy 12 tháng tại 3384 siêu thị toàn quốc
                  </span>
               </li>
               <li>
                  <div class="icon-frame">
                     <div class="policy-icon icon-baohanh"></div>
                  </div>
                  <span>
                     Bảo hành chính hãng điện thoại 12 tháng tại các trung tâm
                     bảo hành hãng
                  </span>
               </li>
               <li>
                  <div class="icon-frame">
                     <div class="policy-icon icon-box"></div>
                  </div>
                  <span>
                     Bộ sản phẩm gồm: Hộp, Sách hướng dẫn, Cây lấy sim, Cáp Type
                     C
                  </span>
               </li>
            </ul>
         </div>
         <div class="product-params">
            <h1>Thông số {{ props.data.name }}</h1>
            <table class="params-table">
               <tbody>
                  <tr>
                     <th style="width: 35%"></th>
                     <th></th>
                  </tr>
                  <tr v-for="(item, index) in params">
                     <td>{{ paramsIndex[category][index] }}:</td>
                     <td>{{ item.slice(0, -2) }}</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   </div>
   <div class></div>
</template>

<style scoped lang="scss">
@import "./ProductDetail.module.scss";
</style>
