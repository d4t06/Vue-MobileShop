<script setup>
import { reactive, ref } from "vue";
import { useAuthStore } from "../../store/authStore";
import request from "../../services/authService";
import { useRouter } from "vue-router";
import Button from '../../components/Button/index.vue'

const data = reactive({
   username: "",
   password: "",
});
const authStore = useAuthStore();
const router = useRouter();
const errorMsg = ref("");
const formRef = ref("");
const LOGIN_URL = "/auth/login";

const handleSubmit = async (e) => {
   if (!data.username || !data.password) {
      errorMsg.value = "Login fail, please check your info";
      return;
   }
   try {
      const response = await request.post(LOGIN_URL, data);

      if (response?.data?.token) {
         authStore.storingAuth({ token: response.data.token });
         router.push("/");
      }
   } catch (error) {
      if (!error?.response) {
         errorMsg.value = "No server response";
      } else if (error?.response.status === 401) {
         errorMsg.value = "Tên hoặc mật khẩu không chính xác";
      } else {
         errorMsg.value = "Đăng nhâp thất bại";
      }
   }
};
</script>
<template>
   <div class="register-page col-half">
      <h2 class="error-msg" v-if="errorMsg">{{ errorMsg }}</h2>
      <h1>Đăng nhập</h1>
      <form ref="formRef" class="form df mt15">
         <div class="input-group df">
            <label for="">Tên đăng nhâp</label>
            <input name="username" v-model="data.username" type="text" />
         </div>
         <div class="input-group df">
            <label for="">Mật khẩu</label>
            <input name="password" v-model="data.password" type="password" />
         </div>
      </form>
      <div class="mt15 form-cta">
         <Button :onClick="handleSubmit"> Đăng nhập </Button>
         <p class="switch">
            Chứa có tài khoản ?,
            <RouterLink to="/register">Đăng ký ngay</RouterLink>
         </p>
      </div>
   </div>
</template>
<style scoped lang="scss">
.register-page {
   margin: 30px auto 0;
}
   @import './otherPages.scss'
</style>
