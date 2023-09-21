<template>
    <div>

        <el-card style="width: 50%;">
            <el-form :rules="rules" ref="updateRef" :model="currentUser" label-width="25%" style="padding-right: 20px;">


                <el-form-item label="Original Password" prop="password">
                    <el-input show-password v-model="currentUser.password" placeholder="Please enter your password">
                    </el-input>
                </el-form-item>

                <el-form-item label="New Password" prop="newPassword">
                    <el-input show-password v-model="currentUser.newPassword" placeholder="Please enter your new password">
                    </el-input>
                </el-form-item>

                <el-form-item label="Confirmation Password" prop="confirmationPassword">
                    <el-input show-password v-model="currentUser.confirmationPassword"
                        placeholder="Please enter your confirmation password"> </el-input>
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
    name: 'Password',
    data() {
        const validatePassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter new password'))
            } else if (value != this.currentUser.confirmationPassword) {

                callback(new Error('Both new password and confirmation password must be the same'))
            } else {
                callback()

            }
        }
        return {
            currentUser: JSON.parse(localStorage.getItem('honey-user') || '{}'),
            rules: {
                password: [
                    { required: true, message: 'Please enter your password', trigger: 'blur' },
                ],
                confirmationPassword: [
                    { required: true, message: 'Please enter your confirmation password', trigger: 'blur' },
                ],
                newPassword: [{ required: true, validator: validatePassword, trigger: 'blur' }],


            },
            // confirmationPassword:'',
            // newPassword:'',
        }

    },
    methods: {

        update() {
            //update to database
            this.$refs['updateRef'].validate((valid) => {
                if (valid) {
                    this.currentUser.password = this.currentUser.newPassword
                    //success in validtion
                    this.$request.put('/user/update', this.currentUser).then(res => {
                        if (res.code === '200') {
                            this.$message.success("Update successfully")
                            this.$router.push('/login')
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

<style>
.el-form-item__label {
    font-weight: bold;
}
</style>