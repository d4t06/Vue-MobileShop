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

watch(curScroll, () => {
  console.log("curScroll change");
  imageSliderRef.value.scrollLeft = curScroll.value;
});

const nextImage = () => {
  if (curScroll.value >= maxScroll) {
    curScroll.value = 0;
    curIndex.value = 1;
  } else {
     curScroll.value += 1100;
     curIndex.value += 1;
  }
  //   checked.value += 1;
};

const prevImage = () => {
  if (curScroll.value == 0) {
     curScroll.value = maxScroll;
     curIndex.value = props.data.length;
  } else {
     curScroll.value -= 1100;
     curIndex.value -= 1;
  }
};

</script>

<template>
  <div class="image-slider-frame">
    <div :class="{ banner: props.banner }" ref="imageSliderRef" class="image-slider">
      <div class="left-arrow slider-control" @click="prevImage()">
        <i class="material-icons">chevron_left</i>

      </div>
      <div class="right-arrow slider-control" @click="nextImage()">
        <i class="material-icons">chevron_right</i>
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
