<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Button from "../../components/Button/index.vue";
import request from "../../services/authService";

const data = reactive({
   username: "",
   password: "",
   confirmPassword: "",
});
const router = useRouter();
const errorMsg = ref("");
const REGIS_URL = "auth/register";

const handleSubmit = async () => {
   if (
      !data.username ||
      !data.password ||
      data.password != data.confirmPassword
   ) {
      errorMsg.value = "Register fail, please check your info";
      return;
   }
   try {
      console.log("submit");
      // if (!data.name || !data.password) return;
      const response = await request.post(REGIS_URL, {
         username: data.username,
         password: data.password,
      });
      alert("Register Succesful");
      router.push("/login");
   } catch (error) {
      console.log(error);
      if (!error?.response) {
         errorMsg.value = "No server response";
      } else if (error?.response.status === 409) {
         errorMsg.value = "Tên tài khoản đã tồn tại";
         prevUser.current = user;
      } else {
         errorMsg.value = "Đăng ký thất bại";
      }
   }
};
</script>
<template>
   <div class="login-page col-half">
      <h2 class="error-msg tac" v-if="errorMsg">{{ errorMsg }}</h2>
      <h1 class="title">Đăng ký</h1>
      <form class="form df mt15">
         <div class="input-group df">
            <label for="">Tên đăng nhâp</label>
            <input name="username" v-model="data.username" type="text" />
         </div>
         <div class="input-group df">
            <label for="">Mật khẩu</label>
            <input name="password" v-model="data.password" type="text" />
         </div>
         <div class="input-group df">
            <label for="">Nhập lại mật khẩu</label>
            <input
               name="confirm-password"
               v-model="data.confirmPassword"
               type="text"
            />
         </div>
      </form>
      <div class="mt15 form-cta">
         <Button :onClick="handleSubmit"> Đăng ký </Button>
         <h2 class="switch">
            Đã có tài khoản ?,
            <RouterLink to="/login">Đăng nhập ngay</RouterLink>
         </h2>
      </div>
   </div>
</template>
<style scoped lang="scss">
   .login-page {
      margin: 30px auto 0;
   }
   @import './otherPages.scss'
</style>
