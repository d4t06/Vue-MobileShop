<script>

export default {
	name: 'Todo',
    data() {
        return {
            job: '',
            jobs: []
        }
    },
    mounted: function () {
    	console.log("mounted")
    },
    methods: {
        addJob: function () {
            this.jobs.push(this.job)
            this.job=''
            this.$refs.inputRef.focus()
        },
        deleteJob: function (index) {
            this.jobs.splice(index, 1)
        }
    },
}
</script>
<template>
    <input ref='inputRef' type="text" v-model="job">
    <button @click='addJob()'>add</button>
    <ul>
        <li v-for="(job, index) in jobs" :key='index'>
            <span>{{job}}</span>
            <button :id="index" @click="deleteJob(index)">xoa</button>
        </li>
    </ul>
</template>
<style scoped>
</style>