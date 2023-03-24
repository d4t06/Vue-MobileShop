import { defineStore } from "pinia";

export const useProductStore = defineStore("productStore", {
    state: () => ({
        products: {},
        category: '',
        page: 1,
        filters: '',
        sort: '',
        status: ''
        }),
    actions: {
        store(payload) {
            // console.log("payload  =", payload);
            this.products = payload.products || []
            this.page = payload.page || 1
            this.filters = payload.filters || '',
            this.sort = payload.sort || '',
            this.status = payload.status || ''
        }
    }
})