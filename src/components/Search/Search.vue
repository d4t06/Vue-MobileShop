<script setup>
   import debounce from 'lodash.debounce'
   import {ref, watch} from 'vue'

   const searchRef = ref('')
   
   const saveSearchChange = debounce(() => {
      console.log("send api");
   }, 500)

   watch(searchRef, saveSearchChange);


</script>
<template>
 <div className='wrap'>
            <form className='form'>
               <input
                  className='input'
                  type="text"
                  placeholder="Hôm nay bạn muốn tìm gì..."
                  v-model="searchRef"
                  
               />
               <!-- {loading && query && (
                  <button className='loading-btn'>
                     {/* <FontAwesomeIcon icon={faSpinner} /> */}
                  </button>
               
               {!loading && query && (
                  <button
                     className='clear-btn'
                     onClick={(e) => handleClear(e
                  >
                     {/* <FontAwesomeIcon icon={faCircleXmark} /> */}
                  </button>
                -->
               <button className='search-btn'>
					<span class="ti-search"></span>
               </button>
            </form>
         </div>
</template>

<style lang="scss">
	@import './Search.module.scss'
</style>