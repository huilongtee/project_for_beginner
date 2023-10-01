<template>
    <div>
        <div style=" margin-bottom: 10px;">
            <el-input style="width: 200px; " placeholder="please enter the title" v-model="title"></el-input>
            <el-button type="primary" plain @click="load(1)" style="margin-left: 10px;">Search</el-button>
            <el-button type="info" plain @click="reset">Reset</el-button>
        </div>

        <div style=" margin-bottom: 10px;">
            <el-button type="primary" plain @click="handleAddNews">Add</el-button>
            <el-button type="danger" plain @click="handleDeleteBatch">Batch Delete</el-button>

        </div>
        <el-table @selection-change="handleSelectionChange" :data="news" stripe
            :header-cell-style="{ background: 'aliceblue', color: '#555' }">
            <el-table-column align="center" type="selection" width="55"></el-table-column>
            <el-table-column align="center" width="55" prop="id" label="ID"></el-table-column>
            <el-table-column prop="title" label="Title"></el-table-column>
            <el-table-column prop="description" label="Description"></el-table-column>
            <el-table-column prop="content" label="Content"></el-table-column>
            <el-table-column prop="authorID" label="Author ID"></el-table-column>
            <el-table-column prop="time" label="Time"></el-table-column>

            <el-table-column label="Action" align="center" width="150">
                <template v-slot="scope">
                    <el-button type="primary" plain size="mini" @click="handleEditNews(scope.row)">Edit</el-button>
                    <el-button type="danger" plain size="mini" @click="handleDeleteNews(scope.row.id)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block" style="margin-top: 10px;">
            <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange"
                :current-page.sync="pageNum" :page-sizes="[5, 10, 20, 50, 100]" :page-size="pageSize"
                layout="total,sizes, prev, pager, next" :total="total">
            </el-pagination>
        </div>

        <el-dialog title="Add News" :visible.sync="AddNewsDialogVis">
            <el-card style="width: 100%;">
                <el-form :rules="rules" ref="addRef" :model="addNewsForm" label-width="25%" style="padding-right: 20px;">

                    <el-form-item label="Title" prop="title">
                        <el-input v-model="addNewsForm.title" placeholder="Please enter the title">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="Description" prop="description">
                        <el-input v-model="addNewsForm.description" placeholder="Please enter the description"> </el-input>
                    </el-form-item>

                    <el-form-item label="Content" prop="content">
                        <el-input v-model="addNewsForm.content" placeholder="Please enter the content"> </el-input>
                    </el-form-item>

                </el-form>
            </el-card>
            <div class="dialog-footer" slot="footer">
                <el-button type="danger" @click="closeForm">Cancel</el-button>
                <el-button type="primary" @click="add">{{ this.addNewsForm.id ? 'Update' : 'Add' }}</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
export default {
    name: 'News',
    data() {

        return {
            news: [],
            pageNum: 1,
            pageSize: 5,
            title: '',
            total: 0,
            rules: {
                title: [
                    { required: true, message: 'Please enter the title', trigger: 'blur' },
                ],

                description: [
                    { required: true, message: 'Please enter the description', trigger: 'blur' },
                ],
                content: [
                    { required: true, message: 'Please enter the content', trigger: 'blur' },
                ],

            },
            AddNewsDialogVis: false,
            addNewsForm: {
                title: '',
                description: '',
                content: '',

            },
            multipleSelection: [],
            currentUser: JSON.parse(localStorage.getItem('honey-user') || '{}'),

        }

    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val
            this.load()
        },

        handleDeleteBatch() {
            if (!this.multipleSelection.length) {
                this.$message.warning('Please select at least one news')
                return
            }
            this.$confirm('Are you sure you want to delete these news?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(response => {

                this.$request.delete('/news/delete/batch', { data: this.multipleSelection }).then(res => {
                    if (res.code === '200') {
                        this.$message.success('Delete successfully')
                        this.load()
                    } else {
                        this.$message.error('Delete failed')
                    }
                })

            }).catch(() => { })

        },
        handleSelectionChange(val) {
            this.multipleSelection = val.map(item => item.id)

        },
        handleDeleteNews(id) {
            this.$confirm('Are you sure you want to delete this news?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(response => {

                this.$request.delete('/news/delete/' + id).then(res => {
                    if (res.code === '200') {
                        this.$message.success('Delete successfully')
                        this.load()
                    } else {
                        this.$message.error('Delete failed')
                    }
                })

            }).catch(() => { })
        },
        handleEditNews(row) {
            this.addNewsForm = JSON.parse(JSON.stringify(row))
            this.AddNewsDialogVis = true
        },
        handleAddNews() {
            this.addNewsForm = {}
            this.AddNewsDialogVis = true
        },
        handlePreview(url) {
            window.open(url)
        },
        handleCurrentChange(pageNum) {
            this.load(pageNum)

        },
        load(pageNum) {
            if (pageNum) this.pageNum = pageNum

            this.$request.get('/news/selectByPage', {
                params: {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    title: this.title,

                }
            }).then(res => { 
                this.news = res.data.records
                this.total = res.data.total
               
            })
        },

        reset() {
            this.title = ''
            this.load()
        },
        add() {

            if(this.addNewsForm.id){
                console.log("update");
            }else{
                console.log("add");
            }
            
            //add to database
            this.$refs['addRef'].validate((valid) => {
                if (valid) {
                    //success in validtion
                    this.$request({
                        url: this.addNewsForm.id ? '/news/update' : '/news/add',
                        method: this.addNewsForm.id ? 'PUT' : 'POST',
                        data: this.addNewsForm
                    }).then(res => {
                        if (res.code === '200') {
                            this.$message.success(this.addNewsForm.id ? "Update successfully" : "Add successfully")
                            this.AddNewsDialogVis = false
                            this.load()
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                }
            })
        },
        closeForm() {
            this.AddNewsDialogVis = false
            this.addNewsForm.title = ''
            this.addNewsForm.description = ''
            this.addNewsForm.content = ''

        }
    },
    created() {

    },
    mounted() {

        this.load()

    },
}
</script>

<style></style>