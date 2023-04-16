import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
   state: () => ({
      auth: {
         token: "",
         //others info
      }
   }),
   actions: {
      storingAuth(payload) {
         console.log('payload authStore =', payload.token)
         this.auth.token = payload.token;
      },
   },
});
