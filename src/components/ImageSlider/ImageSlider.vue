<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
   data: Array,
   banner: Boolean,
});

const route = useRoute();
const checked = ref(0);
const curScroll = ref(0);
const imageSliderRef = ref();
const curIndex = ref(1);

const imageWidth = props.banner ? 1100 : 625;
const maxScroll = computed(() => imageWidth * (props.data.length - 1));

watch(curScroll, () => {
   console.log("curScroll change");
   imageSliderRef.value.scrollLeft = curScroll.value;
});
watch(route, () => {
   curIndex.value = 1;
});

const nextImage = () => {
   if (curScroll.value >= maxScroll.value) {
      curScroll.value = 0;
      curIndex.value = 1;
   } else {
      curScroll.value += imageWidth;
      curIndex.value += 1;
   }
   //   checked.value += 1;
};

const prevImage = () => {
   if (curScroll.value == 0) {
      curScroll.value = maxScroll.value;
      curIndex.value = props.data.length;
   } else {
      curScroll.value -= imageWidth;
      curIndex.value -= 1;
   }
};
</script>

<template>
   <div class="image-slider-frame">
      <div
         :class="{ banner: props.banner }"
         ref="imageSliderRef"
         class="image-slider"
      >
         <div class="left-arrow slider-control" @click="prevImage()">
            <i class="material-icons">chevron_left</i>
         </div>
         <div class="right-arrow slider-control" @click="nextImage()">
            <i class="material-icons">chevron_right</i>
         </div>

         <div class="slider-index">
            <span>{{ curIndex }}</span> / <span>{{ data.length }}</span>
         </div>

         <div
            class="slider-item"
            :class="{ active: index === checked }"
            v-for="(image, index) in data"
         >
            <img :src="image" alt="" />
         </div>
      </div>
   </div>
</template>

<style lang="scss">
@import "./ImageSlider.module.scss";
</style>
