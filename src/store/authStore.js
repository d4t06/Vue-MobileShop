import { defineStore } from "pinia";

export const useAuthStore = defineStore("AuthStore", {
   state: () => ({
      auth: {
         token: "",
      }
   }),
   actions: {
      storingAuth(payload) {
         console.log('payload authStore =', payload.token)
         this.auth.token = payload.token;
      },
   },
});
