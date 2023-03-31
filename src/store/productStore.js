import { defineStore } from "pinia";

export const useProductsStore = defineStore("productStore", {
    state: () => ({
        products: {rows:'', count:''},
        category: '',
        page: 1,
        status: ''
    }),
    getters: {
        getCount() {
            return this.products.count
        }
    },
    actions: {
        storingProducts(payload) {
            console.log("payload productStore  =", payload);
            this.products = payload.products || ''
            this.page = payload.page || 1
            this.category = payload.category || ''
            this.status = payload.status || ''
        },
        getMoreProducts(payload) {
            this.products.rows.push(...payload.products.rows)
            this.products.count = payload.products.count
            this.page = payload.page || 1
            this.category = payload.category || ''
            this.status = payload.status || ''
        }
    }
})