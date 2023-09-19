<template>
    <div style="height: 100vh; display: flex; justify-content: center; align-items: center; background-color: rgb(127, 208, 255);">
        <div style="display: flex; background-color: #fff; width: 50%; border-radius: 10px; overflow: hidden;">
            <div style="flex: 1;">
                <img src="@/assets/login.jpg" style="width: 100%;" alt="">
            </div>
            <div style="flex: 1; display: flex; align-items: center; justify-content: center;">
                <el-form :rules="rules" ref="loginRef" :model="user" style="width: 80%;">
                    <div style="font-size: 20px; font-weight: bold; text-align: center; margin-bottom: 20px;">Welcome to
                        Administrator System
                    </div>
                    <el-form-item prop="username">
                        <el-input prefix-icon="el-icon-user" size="medium" v-model="user.username"
                            placeholder="Please enter your username"></el-input>
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-input prefix-icon="el-icon-lock" size="medium" show-password v-model="user.password"
                            placeholder="Please enter your password"></el-input>
                    </el-form-item>
                    <el-form-item prop="code">
                        <div style="display: flex;">
                            <el-input placeholder="Please enter validation code" v-model="user.code" prefix-icon="el-icon-circle-check" size="medium"
                                style="flex: 1;"></el-input>
                            <div style="flex: 1; height: 36px;">
                                <valid-code @update:value="getCode" />
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="width: 100%;" @click="login">Login</el-button>
                    </el-form-item>
                    <div style="display: flex;">
                        <div style="flex: 1;">Doesn't have an account? <span style="color: #0f9876; cursor: pointer;" @click="$router.push('/Register')">Click Here</span>
                        </div>
                        <div style="flex: 1; text-align: right;"><span style="color: #0f9876; ">Forget Password</span></div>
                    </div>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
import ValidCode from '@/components/ValidCode.vue'

export default {
    name: 'Login',
    components: {
        ValidCode
    },
    data() {

        // validation of validation code
        // callback means validated
        const validateCode = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter validation code'))
            } else if (value.toLowerCase() != this.code) {

                callback(new Error('Validation code is wrong'))
            } else {
                callback()

            }
        }

        return {
            code: '',//code from validCode component
            user: {
                username: '',
                password: '',
                code: '' //code from what user input

            },
            rules: {
                username: [
                    { required: true, message: 'Please enter your username', trigger: 'blur' },

                ],

                password: [
                    { required: true, message: 'Please enter your password', trigger: 'blur' },

                ],
                code: [{ validator: validateCode, trigger: 'blur' }]
            },
        }
    },


    created() {

    },
    methods: {
        login() {
            // console.log(this.user.username)
            // console.log(this.user.password)
            // this.$request.post('/login', this.user).then(res => {
            //     console.log(res)
            // })
            this.$refs['loginRef'].validate((valid) => {
                if (valid) {
                    //success in validtion
                    this.$request.post('/login', this.user).then(res => {
                        console.log(res)
                        console.log(res.code)
                        if (res.code === '200') {
                            this.$router.push('/')
                            this.$message.success("Login Successfully")
                            localStorage.setItem('honey-user', JSON.stringify(res.data))
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                }
            })
        },
        getCode(code) {
            console.log(code)
            this.code = code.toLowerCase()
            console.log(this.code)
        }
    }
}
</script>

<style scoped></style>