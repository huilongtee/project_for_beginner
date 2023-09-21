<template>
    <div>

        <el-card style="width: 50%;">
            <el-form :rules="rules" ref="updateRef" :model="currentUser" label-width="25%" style="padding-right: 20px;">
                <div style=" margin: 10px 0; text-align: center;">
                    <el-upload class="avatar-uploader" action="http://localhost:9090/file/upload"
                        :on-success="handleAvatarSuccess" :show-file-list="false" :headers="{ token: currentUser.token }">
                        <img v-if="currentUser.avatar" :src="currentUser.avatar" class="avatar" alt="">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>

                <el-form-item label="Username" prop="username">
                    <el-input v-model="currentUser.username" placeholder="Please enter your username" disabled> </el-input>
                </el-form-item>

                <el-form-item label="Name" prop="name">
                    <el-input v-model="currentUser.name" placeholder="Please enter your name"> </el-input>
                </el-form-item>

                <el-form-item label="Phone" prop="phone">
                    <el-input v-model="currentUser.phone" placeholder="Please enter your phone"> </el-input>
                </el-form-item>

                <el-form-item label="Email" prop="email">
                    <el-input v-model="currentUser.email" placeholder="Please enter your email"> </el-input>
                </el-form-item>

                <el-form-item label="Address" prop="address">
                    <el-input type="textarea" v-model="currentUser.address" placeholder="Please enter your address">
                    </el-input>

                </el-form-item>
                <div style="text-align: center; margin: 10px 0;">
                    <el-button type="primary" @click="update">Update</el-button>
                </div>

            </el-form>
        </el-card>

    </div>
</template>

<script>
export default {
    name: 'Person',
    data() {
        return {
            currentUser: JSON.parse(localStorage.getItem('honey-user') || '{}'),
            rules: {
                name: [
                    { required: true, message: 'Please enter your name', trigger: 'blur' },
                ],

                email: [
                    { required: true, message: 'Please enter your email', trigger: 'blur' },
                ],
                address: [
                    { required: true, message: 'Please enter your address', trigger: 'blur' },
                ],
                phone: [
                    { required: true, message: 'Please enter your phone', trigger: 'blur' },
                ],
            },
        }

    },
    methods: {
        handleAvatarSuccess(res, file, fileList) {
            this.currentUser.avatar = res.data
        },
        update() {
            //update to database
            this.$refs['updateRef'].validate((valid) => {
                if (valid) {
                    //success in validtion
                    this.$request.put('/user/update', this.currentUser).then(res => {
                        if (res.code === '200') {
                            this.$message.success("Update successfully")
                            localStorage.setItem('honey-user', JSON.stringify(this.currentUser))

                            //trigger parent component(Manager) function 
                            this.$emit('update:user',this.currentUser)
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                }
            })
        }
    },
    created() {

    }
}
</script>

<style scoped>
.el-form-item__label {
    font-weight: bold;
}

.el-upload {
    border-radius: 50%;

}

.avatar-uploader .el-upload,.avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

 .avatar-uploader .el-upload:hover,.avatar-uploader:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border-radius: 50%;

}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
    border-radius: 50%;

}
</style>