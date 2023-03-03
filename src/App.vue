<template>
    <h1>{{$filters.moneyFormat(total)}}</h1>
    <Button @click="handleShow()" primary outline rounded>{{text}}</Button>
    <br>
    <Todo v-if="isShow" />
</template>

<script>
import Todo from './components/Todo.vue'
import Button from './components/Button/index.vue'
// import moneyFormat from './utils/moneyFormat'

export default {
    components: { Todo, Button },
    data() {
        return {
            isShow: false,
            text: 'show',
            total: 100000,
        }
    },
    methods: {
        handleShow: function() {
            this.isShow = !this.isShow;
            this.text = this.isShow ? 'hide' : 'show'
        }
    },
    
}
</script>

<style scoped>
</style>