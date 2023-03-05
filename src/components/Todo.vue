<script>
    import {ref} from 'vue'

    export default {
    setup() {
        const datas = ref([])

        return {
            datas
        }
    },

    data() {
        return {
            // datas: [],
            categories: [
                {
                    name: 'users'
                },
                {
                    name: 'posts'
                },
                {
                    name: 'todos'
                }
            ],

            curCategory: 'users',
            showGoTop: false,
        }
    },
    watch: {
        curCategory: {
            handler() {
            fetch("https://jsonplaceholder.typicode.com/"+this.curCategory)
                .then (res => res.json())
                .then (data => {
                    // console.log(data)
                    this.datas.value = data})

            },
            immediate: true,
        },
    },
    methods: {
       handleGetData:  function (category) {
        this.curCategory = category
        // console.log(this.datas)
       },
        handleScroll: function () {
            // console.log(window.scrollY)
            if (window.scrollY > 200) {
                this.showGoTop = true
            } else {
                this.showGoTop = false
            }
        },
        handleGoTop: function () {
            // window.scrollY = 0;
            console.log(this.$refs.inputRef)
        }
    },
    mounted: function () {
        // const handleScroll = () => {
        //     console.log(window.scrollY)
        // }
            // console.log(window.innerWidth)
        window.addEventListener("scroll", this.handleScroll)
    },
    unmounted: function () {
        // window.
        // console.log('unmounted')
        window.removeEventListener('scroll', this.handleScroll)
    }
}
</script>
<template>
    <button ref="inputRef" @click="handleGetData(item.name)" :class="{active: this.curCategory === item.name}" v-for="item in this.categories">{{item.name}}</button>
    <ul>
        <li v-for="(item, index) in datas.value" :key='index'>
            {{item.name || item.title}}
        </li>
    </ul>
    <button @click="handleGoTop" v-if="showGoTop" class="go-top-btn">go top</button>
</template>
<style scoped type="scss">
    button {
    padding: 5px 10px;
    border: none;
    font-size: 1.6rem;
}
    .active {
    color: #fff;
    background-color: #333;
}
.go-top-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
}
</style>