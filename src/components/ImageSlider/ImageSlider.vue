<script setup>
import { ref, onMounted, computed, watch } from "vue";

const props = defineProps({
  data: Array,
  banner: Boolean,
});

const checked = ref(0);
const curScroll = ref(0);
const imageSliderRef = ref();
const curIndex = ref(1);



const imageWidth = props.banner ? 1100 : 625;
const maxScroll = imageWidth * (props.data.length - 1);

console.log(maxScroll);

watch(curScroll, () => {
  console.log("curScroll change");
  imageSliderRef.value.scrollLeft = curScroll.value;
});

const nextImage = () => {
  if (curScroll.value >= maxScroll) {
    curScroll.value = 0;
    curIndex.value = 0;
  } else {
     curScroll.value += 1100;
     curIndex.value += 1;
  }
  //   checked.value += 1;
};

const prevImage = () => {
  if (curScroll.value == 0) {
     curScroll.value = maxScroll;
     curIndex.value = data.length;
  } else {
     curScroll.value -= 1100;
     curIndex.value -= 1;
  }
};

onMounted(() => {});

console.log(checked.value);
</script>

<template>
  <div class="image-slider-frame">
    <div :class="{ banner: props.banner }" ref="imageSliderRef" class="image-slider">
      <div class="left-arrow slider-control" @click="prevImage()">
        <span class="ti-angle-left"></span>
      </div>
      <div class="right-arrow slider-control" @click="nextImage()">
        <span class="ti-angle-right"></span>
      </div>

      <div class='slider-index'>
               <span>{{curIndex}}</span> / <span>{{data.length}}</span>
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
// @import '../../assets/themify-icons/themify-icons.css';
@import "./ImageSlider.module.scss";
</style>
