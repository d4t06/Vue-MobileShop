<script setup>
	
</script>
<template>
	<div class='col col-3'>
         <div class='product-filter'>
            <div class='filter-section'>
               <h2 class='filter-title'>Hãng sản xuất</h2>
               <div class='filter-list'>
                  {/* {filterContiments.brand.map((item, index) => {}) */}
                  {/* phai render data lay ra tu checkbox component */}
                  {/* tại vì mỗi checkbook có một state riêng, state lấy dữ liệu từ nhiều item, nhưng không thể render nhiều checkbox */}
                  {/* ban đầu render nhiều checkbox */}
                  {/* fix: chỉ có mỗi checkbox nhưng trong checkbox có nhiều item */}
                  <!-- <Checkbox
                     data={brand[category]}
                    
                  /> -->
                  {/* truyền handleFilter vào cop Checkbox, chực hiện sau trể về đối số là filter sau đó tt*/}
               </div>
            </div>
            <div class='filter-section'>
               <h2 class='filter-title'>Mức giá</h2>
               <div class='filter-list price'>
                  <!-- <Radiobox
                     data={price[category]}
                  /> -->
               </div>
            </div>

        <!-- <div class='filter-section'>
					<h2 class='filter-title'>Tính năng đặc biệt</h2>
					<div class='filter-list'>
					<Checkbox/>
					</div> -->
          <!-- </div> -->
         </div>
      </div>
</template>

<style lang="scss">
</style>