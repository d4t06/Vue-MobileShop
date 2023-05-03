<script setup>
import { useAuthStore } from '../store/authStore';

const authStore = useAuthStore();
const useRefresh = () => {
    const refresh = async () => {
        try {
            const response = await request.get("/auth/refresh")
            
            const newToken = response.data.token
            authStore.storingAuth({token: newToken})
            return response.data.token
        } catch (error) {
            console.log({message: error})
        }
    }
    return refresh
}
module.export = useRefresh
</script>