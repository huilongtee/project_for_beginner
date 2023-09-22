<template>
    <div>
        <div style=" margin-bottom: 10px;">
            <el-input style="width: 200px; " placeholder="please enter the username" v-model="username"></el-input>
            <el-input style="width: 200px; margin: 0 10px;" placeholder="please enter the name" v-model="name"></el-input>
            <el-button type="primary" plain @click="load(1)">Search</el-button>
            <el-button type="info" plain @click="reset">Reset</el-button>
        </div>

        <div style=" margin-bottom: 10px;">
            <el-button type="primary" plain @click="handleAddUser">Add</el-button>
            <el-button type="danger" plain @click="handleDeleteBatch">Batch Delete</el-button>
        </div>
        <el-table @selection-change="handleSelectionChange" :data="users" stripe
            :header-cell-style="{ background: 'aliceblue', color: '#555' }">
            <el-table-column align="center" type="selection" width="55"></el-table-column>
            <el-table-column align="center" width="55" prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="Name"></el-table-column>
            <el-table-column prop="username" label="Username"></el-table-column>
            <el-table-column prop="address" label="Address"></el-table-column>

            <el-table-column label="Avatar">
                <template v-slot="scope">

                    <div style="display: flex; align-items: center; justify-content: center;">
                        <el-image style="width: 50px; height: 50px; border-radius: 50%;" v-if="scope.row.avatar"
                            :src="scope.row.avatar" :preview-src-list="[scope.row.avatar]"></el-image>
                    </div>
                </template>
            </el-table-column>

            <el-table-column prop="phone" label="Phone"></el-table-column>
            <el-table-column prop="email" label="Email"></el-table-column>
            <el-table-column prop="role" label="Role"></el-table-column>
            <el-table-column label="Action" align="center" width="150">
                <template v-slot="scope">
                    <el-button type="primary" plain size="mini" @click="handleEditUser(scope.row)">Edit</el-button>
                    <el-button type="danger" plain size="mini" @click="handleDeleteUser(scope.row.id)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block" style="margin-top: 10px;">
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNum"
                :page-sizes="[5, 10, 20, 50, 100]" :page-size="pageSize" layout="total,sizes, prev, pager, next"
                :total="total">
            </el-pagination>
        </div>

        <el-dialog title="Add User" :visible.sync="AddUserDialogVis">
            <el-card style="width: 100%;">
                <el-form :rules="rules" ref="addRef" :model="addUserForm" label-width="25%" style="padding-right: 20px;">


                    <el-form-item label="Username" prop="username">
                        <el-input v-model="addUserForm.username" placeholder="Please enter the username">
                        </el-input>
                    </el-form-item>



                    <el-form-item label="Phone" prop="phone">
                        <el-input v-model="addUserForm.phone" placeholder="Please enter the phone"> </el-input>
                    </el-form-item>

                    <el-form-item label="Email" prop="email">
                        <el-input v-model="addUserForm.email" placeholder="Please enter the email"> </el-input>
                    </el-form-item>

                    <el-form-item label="Address" prop="address">
                        <el-input type="textarea" v-model="addUserForm.address" placeholder="Please enter the address">
                        </el-input>

                    </el-form-item>

                    <el-form-item label="Password" prop="password">
                        <el-input prefix-icon="el-icon-lock" size="medium" show-password v-model="addUserForm.password"
                            placeholder="Please enter the password"></el-input>
                    </el-form-item>
                    <el-form-item label="Confirmation Password" prop="confirmationPassword">
                        <el-input prefix-icon="el-icon-lock" size="medium" show-password
                            v-model="addUserForm.confirmationPassword"
                            placeholder="Please enter the confirmation password"></el-input>
                    </el-form-item>
                    <el-form-item prop="role" label="Role">
                        <el-radio-group v-model="addUserForm.role">
                            <el-radio label="User"></el-radio>
                            <el-radio label="Business"></el-radio>
                        </el-radio-group>

                    </el-form-item>


                </el-form>
            </el-card>
            <div class="dialog-footer" slot="footer">
                <el-button type="danger" @click="closeForm">Cancel</el-button>
                <el-button type="primary" @click="add">{{ this.addUserForm.id ? 'Update' : 'Add' }}</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
export default {
    name: 'User',
    data() {
        const validatePassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter confirmation password'))
            } else if (value != this.addUserForm.password) {

                callback(new Error('Both new password and confirmation password must be the same'))
            } else {
                callback()

            }
        }
        return {
            users: [],
            pageNum: 1,
            pageSize: 5,
            username: '',
            name: '',
            total: '',
            rules: {
                username: [
                    { required: true, message: 'Please enter the username', trigger: 'blur' },
                ],

                email: [
                    { required: true, message: 'Please enter the email', trigger: 'blur' },
                ],
                address: [
                    { required: true, message: 'Please enter the address', trigger: 'blur' },
                ],
                phone: [
                    { required: true, message: 'Please enter the phone', trigger: 'blur' },
                ],
                confirmationPassword: [
                    { required: true, validator: validatePassword, trigger: 'blur' },
                ],
                password: [{ required: true, message: 'Please enter the password', trigger: 'blur' }],
                role: [{ required: true, message: 'Please select the role', trigger: 'blur' }],

            },
            AddUserDialogVis: false,
            addUserForm: {
                username: '',
                phone: '',
                email: '',
                address: '',
                password: '',
                confirmationPassword: '',
                role: '',
            },
            multipleSelection: [],
            currentUser: JSON.parse(localStorage.getItem('honey-user') || '{}'),

        }

    },
    methods: {
        handleDeleteBatch() {
            if (!this.multipleSelection.length) {
                this.$message.warning('Please select at least one user')
                return
            }
            this.$confirm('Are you sure you want to delete these users?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(response => {
                //find whether the current user is in the list
                if (this.multipleSelection.includes(this.currentUser.id)) {
                    this.$message.warning('You cannot delete yourself')
                } else {
                    this.$request.delete('/user/delete/batch', { data: this.multipleSelection }).then(res => {
                        if (res.code === '200') {
                            this.$message.success('Delete successfully')
                            this.load()
                        } else {
                            this.$message.error('Delete failed')
                        }
                    })
                }
            }).catch(() => { })

        },
        handleSelectionChange(val) {
            this.multipleSelection = val.map(item => item.id)

        },
        handleDeleteUser(id) {
            this.$confirm('Are you sure you want to delete this user?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(response => {
                if (id === this.currentUser.id) {
                    this.$message.warning('You cannot delete yourself')
                    return

                }
                this.$request.delete('/user/delete/' + id).then(res => {
                    if (res.code === '200') {
                        this.$message.success('Delete successfully')
                        this.load()
                    } else {
                        this.$message.error('Delete failed')
                    }
                })

            }).catch(() => { })
        },
        handleEditUser(row) {
            this.addUserForm = JSON.parse(JSON.stringify(row))
            this.AddUserDialogVis = true
        },
        handleAddUser() {
            this.addUserForm = { role: 'User' }
            this.AddUserDialogVis = true
        },
        handlePreview(url) {
            window.open(url)
        },
        handleCurrentChange(pageNum) {
            this.load(pageNum)
        },
        load(pageNum) {
            if (pageNum) this.pageNum = pageNum

            this.$request.get('/user/selectByPage', {
                params: {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    username: this.username,
                    name: this.name,

                }
            }).then(res => {
                this.users = res.data.records
                this.total = res.data.total
            })
        },
        reset() {
            this.username = ''
            this.name = ''
            this.load()
        },
        add() {
            //add to database
            this.$refs['addRef'].validate((valid) => {
                if (valid) {
                    //success in validtion
                    this.$request({
                        url: this.addUserForm.id ? '/user/update' : '/register',
                        method: this.addUserForm.id ? 'PUT' : 'POST',
                        data: this.addUserForm
                    }).then(res => {
                        if (res.code === '200') {
                            this.$message.success(this.addUserForm.id ? "Update successfully" : "Add successfully")
                            this.AddUserDialogVis = false
                            this.load()
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                }
            })
        },
        closeForm() {
            this.AddUserDialogVis = false
            this.addUserForm.username = ''
            this.addUserForm.phone = ''
            this.addUserForm.email = ''
            this.addUserForm.address = ''
            this.addUserForm.password = ''
            this.addUserForm.confirmationPassword = ''
            this.addUserForm.role = ''
        }
    },
    created() {

    },
    mounted() {
        // axios.get('http://localhost:9090/user/selectAll').then(res => {
        //   this.users = res.data.data

        // })
        this.load()

    },
}
</script>

<style></style>