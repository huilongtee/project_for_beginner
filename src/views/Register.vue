<template>
    <div
        style="height: 100vh; display: flex; justify-content: center; align-items: center; background-color: rgb(165, 127, 255);">
        <div style="display: flex; background-color: #fff; width: 50%; border-radius: 10px; overflow: hidden;">
            <div style="flex: 1;">
                <img src="@/assets/register.jpg" style="width: 100%;" alt="">
            </div>
            <div style="flex: 1; display: flex; align-items: center; justify-content: center;">
                <el-form :rules="rules" ref="registerRef" :model="user" style="width: 80%;">
                    <div style="font-size: 20px; font-weight: bold; text-align: center; margin-bottom: 20px;">Register an
                        account
                    </div>
                    <el-form-item prop="username">
                        <el-input prefix-icon="el-icon-user" size="medium" v-model="user.username"
                            placeholder="Please enter your username"></el-input>
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-input prefix-icon="el-icon-lock" size="medium" show-password v-model="user.password"
                            placeholder="Please enter your password"></el-input>
                    </el-form-item>
                    <el-form-item prop="confirmationPassword">
                        <el-input prefix-icon="el-icon-lock" size="medium" show-password v-model="user.confirmationPassword"
                            placeholder="Please enter your confirmation password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" style="width: 100%;" @click="register">Register</el-button>
                    </el-form-item>
                    <div style="display: flex;">
                        <div style="flex: 1;">Already registered an account? <span
                                style="color: rgb(165, 127, 255); cursor: pointer; " @click="$router.push('/Login')">Click
                                Here</span>
                        </div>

                    </div>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>

export default {
    name: 'Register',

    data() {

        const validatePassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter confirmation password'))
            } else if (value.toLowerCase() != this.user.password.toLowerCase()) {

                callback(new Error('Both password and confirmation password must be the same'))
            } else {
                callback()

            }
        }
        return {
            user: {
                username: '',
                password: '',
                confirmationPassword: ''
            },
            rules: {
                username: [
                    { required: true, message: 'Please enter your username', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: 'Please enter your password', trigger: 'blur' },
                ],
                confirmationPassword: [{ validator: validatePassword, trigger: 'blur' }]
            },
        }
    },
    created() {

    },
    methods: {
        register() {

            this.$refs['registerRef'].validate((valid) => {
                if (valid) {
                    //success in validtion
                    this.$request.post('/register', this.user).then(res => {

                        if (res.code === '200') {
                            this.$router.push('/')
                            this.$message.success("Register Successfully")
                            localStorage.setItem('honey-user', JSON.stringify(res.data))
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                }
            })
        },

    }
}
</script>

<style scoped></style>