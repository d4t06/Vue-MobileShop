import { defineStore } from "pinia";

export const useFiltersStore = defineStore("filterStore", {
    state: () => ({
        filters: {brand: '', price: ''},
        sort: {column: '', type: ''},
    }),
    actions: {
        storingFilters(payload) {
            console.log("pay load storing filter =", payload)
            this.filters.brand = payload.filters.brand || '',
            this.filters.price = payload.filters.price || '',
            this.sort.column = payload.sort.column || '',
            this.sort.type = payload.sort.type || ''
        }
    }
})