### Friday 3/3/2023

-  ref="inputRef" => this.$refs.inputRef
-  #click="addJob" or #click="addJob()" dieu duoc

### Saturday 4/3/2023

-  watch -> mount

### update thứ 6 31/3/2023

-  Thêm action getMoreProducts
-  Thêm component QuickFilter, BrandList, FilteredItem
-  Computed => tính toán lại một khi re-render
-  watch source ex: filterStore not filterStore.value
-  Xử lí indexOf khi chọn tất cả ở Checkbox: Fetch data filters = '' nhưng trong store lưu init object
-  Store lúc nào cũng phải giữ nguyên cấu trúc dữ liệu ban đầu

### update thứ 7 8/4/2023

-  Thêm trang notFound
-  Thêm trang login và register
-  Thêm authStore lưu thông tin được trả về sau khi đăng nhập
-  Thêm axios interceptors nhưng chưa xong

### update thứ 4 19/4/2023

-  Sửa dụng page_size do server trả về
-  Thêm chức năng search, hiện thị kết quả tìm kiếm
-  Thêm trang hiện kết quả search
-  issue: Nếu search không có query thì không hiện
-  Các detail page cùng dạng url thì không re-render

### update thứ 5 20/4/2023

-  Lọc các filter nào có giá trị nhưng chưa xong

### update chủ nhật 30/4/1975
- Khi sort, filter thì page = 1
- Fix thứ tự khi sort ở trang trở lên
- Thêm loading tăng trải nghiệm người dùng

### update thứ 4 3/5/2023
- Thêm persistent login
- Thêm trang dashboard demo chức năng phân quyền
- Fix không rerender khi cùng route detail page