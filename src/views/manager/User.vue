<template>
    <div>
        <el-table :data="users" stripe>

            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="Name"></el-table-column>
            <el-table-column prop="username" label="Username"></el-table-column>
            <el-table-column prop="address" label="Address"></el-table-column>

            <el-table-column label="Avatar">
                <template v-slot="scope">
                 
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <el-image style="width: 50px; height: 50px; border-radius: 50%;" v-if="scope.row.avatar" :src="scope.row.avatar" :preview-src-list="[scope.row.avatar]"></el-image>
                    </div>
                </template>
            </el-table-column>

            <el-table-column prop="phone" label="Phone"></el-table-column>
            <el-table-column prop="email" label="Email"></el-table-column>
            <el-table-column prop="role" label="Role"></el-table-column>
            <el-table-column label="Action">
                <template v-slot="scope">
                    <el-button type="primary" plain size="mini">Edit</el-button>
                    <el-button type="danger" plain size="mini">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>


    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            currentUser: JSON.parse(localStorage.getItem('honey-user') || '{}'),
            users: [],
        }

    },
    methods: {
        handlePreview(url) {
            window.open(url)
        },
        
    },
    created() {

    },
    mounted() {
        // axios.get('http://localhost:9090/user/selectAll').then(res => {
        //   this.users = res.data.data

        // })

        this.$request.get('/user/selectAll').then(res => {
            this.users = res.data
        })
    },
}
</script>

<style></style>