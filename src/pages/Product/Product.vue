<script setup>
    import ImageSlider from '../../components/ImageSlider/ImageSlider.vue';
    import ProductItem from '../../components/ProductItem/ProductItem.vue';
    import ProductFilter from '../../components/ProductFilter/ProductFilter.vue';
    import { banners } from '../../assets/data';

    const rows = [
        {
            "href": "samsung-galaxy-s23-ultra",
            "brand": "samsung",
            "name": "Samsung Galaxy S23 Ultra 5G",
            "category": "dtdd",
            "image": "https://cdn.tgdd.vn/Products/Images/42/249948/samsung-galaxy-s23-ultra-1-600x600.jpg",
            "feature": "6.8\"*and*Quad HD+ (2K+)*and*",
            "old_price": null,
            "cur_price": 31990000,
            "product_label": "https://cdn.tgdd.vn/ValueIcons/label-moi-ra-mat-fnal.png",
            "intallment": null,
            "label": null,
            "gift": null,
            "pre_order": false
        },
        {
            "href": "oppo-reno8-t-5g-256gb",
            "brand": "oppo",
            "name": "OPPO Reno8 T 5G",
            "category": "dtdd",
            "image": "https://cdn.tgdd.vn/Products/Images/42/301642/oppo-reno8t-vang1-thumb-600x600.jpg",
            "feature": "6.7\"*and*Full HD+*and*",
            "old_price": null,
            "cur_price": 10990000,
            "product_label": "https://cdn.tgdd.vn/ValueIcons/Label_01-05.png",
            "intallment": null,
            "label": null,
            "gift": null,
            "pre_order": false
        }
   ]
</script>
<template>
    <div class="product-container">
        <ImageSlider :data="banners['dtdd']" banner/>

        <div className='product-body row'>

            <div className="col col-9">
               <!-- <BrandSort category={category} count={count} /> -->

               <ProductItem :data="rows" />

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

<style scoped>
.product-container {
    margin-top: 20px;
    min-height: 100vh;
}
</style>