<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/Button/index.vue'
import authRequest from '../../services/authService';

const authStore = useAuthStore()
const router = useRouter()

const logout = async () => {
        try {
            authStore.storingAuth({token: ''})
            await authRequest.get("/auth/logout")
        } catch (error) {
            console.log({messgae: error})
        }

        router.push('/')
}
</script>

<template>
    <h1>UserPage page</h1>
    <Button primary fill rounded :onClick="logout">Đăng xuất</Button>
</template>