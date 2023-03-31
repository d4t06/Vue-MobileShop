import { defineStore } from "pinia";

export const useFiltersStore = defineStore("filterStore", {
    state: () => ({
        filters: '',
        sort: '',
    }),
    actions: {
        storingFilters(payload) {
            console.log("payload filterStore  =", payload);

            this.filters = payload.filters || '',
            this.sort = payload.sort || ''
        }
    }
})