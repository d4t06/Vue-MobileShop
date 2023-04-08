<script setup>
import { watch } from 'vue';
import authRequest from '../services/authService';
import {useAuthStore} from '../store/authStore'


const authStore = useAuthStore();

useEffect(authStore, () => {
        const requestIntercept = authRequest.interceptors.request.use(
            config => {
                 // Do something before request is sent
                 console.log("handle before request sent");
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `bearer ${auth?.token}`
                }

                console.log("auth =", auth)
                return config
            },
            (err) => Promise.reject(err) // Do something with response error
        )

        const responseIntercept = authRequest.interceptors.response.use(
            response => response,  // Do something with response data

            async (err) => { // Do something with response error
                const prevRequest = err?.config

                if (err?.response?.status === 403 && !prevRequest?.sent) {
                    console.log("handle response err");
                    prevRequest.sent = true;
                    const newToken = await refresh()
                    prevRequest.headers['Authorization'] = `bearer ${newToken}`;

                    return authRequest(prevRequest)
                }
                return Promise.reject(err)
            }
        )

        // return () => {
        //     authRequest.interceptors.request.eject(requestIntercept)
        //     authRequest.interceptors.response.eject(responseIntercept)
        // }
    })

    return authRequest
</script>
