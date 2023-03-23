<script setup>
import ImageSlider from "../../components/ImageSlider/ImageSlider.vue";
import ProductItem from "../../components/ProductItem/ProductItem.vue";
import ProductFilter from "../../components/ProductFilter/ProductFilter.vue";
import Button from '../../components/Button/index.vue'
import { banners } from "../../assets/data";

const rows = [
  {
    href: "samsung-galaxy-s23-ultra",
    brand: "samsung",
    name: "Samsung Galaxy S23 Ultra 5G",
    category: "dtdd",
    image: "https://cdn.tgdd.vn/Products/Images/42/249948/samsung-galaxy-s23-ultra-1-600x600.jpg",
    feature: '6.8"*and*Quad HD+ (2K+)*and*',
    old_price: null,
    cur_price: 31990000,
    product_label: "https://cdn.tgdd.vn/ValueIcons/label-moi-ra-mat-fnal.png",
    intallment: null,
    label: null,
    gift: null,
    pre_order: false,
  },
  {
    href: "oppo-reno8-t-5g-256gb",
    brand: "oppo",
    name: "OPPO Reno8 T 5G",
    category: "dtdd",
    image: "https://cdn.tgdd.vn/Products/Images/42/301642/oppo-reno8t-vang1-thumb-600x600.jpg",
    feature: '6.7"*and*Full HD+*and*',
    old_price: null,
    cur_price: 10990000,
    product_label: "https://cdn.tgdd.vn/ValueIcons/Label_01-05.png",
    intallment: null,
    label: null,
    gift: null,
    pre_order: false,
  },
  {
    href: "iphone-14-pro-max",
    brand: "iphone",
    name: "iPhone 14 Pro Max",
    category: "dtdd",
    image: "https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-vang-thumb-600x600.jpg",
    feature: '6.7"*and*Super Retina XDR*and*',
    old_price: 34490000,
    cur_price: 29490000,
    product_label: null,
    intallment: null,
    label: "GIẢM THÊM 1 TRIỆU",
    gift: null,
    pre_order: false,
  },
];

const bannerImages = banners["dtdd"].slice(0, banners["dtdd"].length - 5).split("*and*");
</script>
<template>
  <div class="product-container">
    <ImageSlider :data="bannerImages" banner />

    <div class="product-body row">
      <div class="col col-9">
        <!-- <BrandSort category={category} count={count} /> -->

        <ProductItem :data="rows" />

        <div class='pagination'>
          <Button
              outline
              rounded
              :count="10"
              describe="sản phẩm"
          >
              Xem thêm
          </Button>
        </div>

        <!-- <div className='pagination'>
                  <Button outline rounded :count="countProduct" describe="sản phẩm">
                     Xem thêm
                  </Button>
               </div> -->
      </div>

      <ProductFilter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.product-container {
  margin-top: 20px;
}

.product-header {
  padding: 0 20px;
  border-bottom: 1px solid #cd1818;
  margin-top: 20px;

  p {
      font-size: 2.3rem;
      font-weight: 500;
  }
}
.product-body {
  margin-top: 15px;
}
.pagination {
  margin-top: 15px;
  text-align: center;
}
.no-product {
  text-align: center;
  margin-top: 50px;
  .image-frame {
      width: 100%;
      height: 184px;
      img {
          height: 100%;
      }
  }
}
</style>
