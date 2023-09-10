<template>
    <div>
        <!-- gutter = gap within the el-row -->

        <!-- <el-row>
            <el-col :span="12">
                <div style="width: 100%; height: 300px; background-color: dodgerblue;"> </div>
                
            </el-col>
            <el-col :span="12">
                <div style="width: 100%; height: 300px; background-color: red;"> </div>
                
            </el-col>
        </el-row> -->

        <el-row gutter="10">

            <el-col :span="6">
                <div style="padding:10px; background-color: beige;"><img src="@/assets/logo.png" style="width:100%" alt="">
                    <p style="text-align: center;">This is the sentences in the first div</p>
                </div>
            </el-col>

            <el-col :span="6">
                <div style="padding:10px; border:solid 1px grey"><img src="@/assets/logo.png" style="width:100%" alt="">
                    <p style="text-align: center;">This is the sentences in the first div</p>
                </div>
            </el-col>
            <el-col :span="6">
                <div style="padding:10px; border:solid 1px grey"><img src="@/assets/logo.png" style="width:100%" alt="">
                    <p style="text-align: center;">This is the sentences in the first div</p>
                </div>
            </el-col>
            <el-col :span="6">
                <div style="padding:10px; border:solid 1px grey"><img src="@/assets/logo.png" style="width:100%" alt="">
                    <p style="text-align: center;">This is the sentences in the first div</p>
                </div>
            </el-col>
        </el-row>
        <hr>
        <el-row>
            <el-col :span="24">
                <el-button>First button</el-button>
                <el-button type="primary">Primary button</el-button>
                <el-button type="success">Success button</el-button>
                <el-button type="info">Info button</el-button>
                <el-button type="warning">Warning button</el-button>
                <el-button type="danger">Danger button</el-button>

                <el-button circle icon="el-icon-search" type="primary"></el-button>
            </el-col>
        </el-row>
        <hr>
        <el-row>
            <el-col>
                <el-input style="width:50%" v-model="value" placeholder="Please enter your name"></el-input>
                <el-input show-password style="width:50%" v-model="password"
                    placeholder="Please enter your password"></el-input>
                <!-- <textarea v-model="textarea" style="width:50%" name="" id="" cols="30" rows="10" ></textarea> -->
                <el-input style="width:50%" v-model="search" placeholder="Please enter your search term"
                    prefix-icon="el-icon-search"></el-input>
                <el-input clearable style="width:50%" v-model="search" placeholder="Please enter your search term"
                    suffix-icon="el-icon-search"></el-input>
            </el-col>
        </el-row>
        <hr>
        <el-row>
            <el-autocomplete v-model="autoCompleteSearch" :fetch-suggestions="querySearch" :trigger-on-focus="false"
                placeholder="Please enter your search term"></el-autocomplete>
        </el-row>
        <hr>
        <el-row>
            <el-select v-model="select" @change="change" placeholder="Please select">

                <el-option v-for="item in fruits" :key="item.id" :value="item.id" :label="item.value"></el-option>


            </el-select>

            <el-select v-model="select" @change="change" multiple placeholder="Please select">

                <el-option v-for="item in fruits" :key="item.id" :value="item.id" :label="item.value"></el-option>


            </el-select>

            <el-select v-model="select" @change="change" filterable placeholder="Please select">

                <el-option v-for="item in fruits" :key="item.id" :value="item.id" :label="item.value"></el-option>


            </el-select>
        </el-row>
        <hr>
        <el-row>
            <el-radio-group v-model="radio" @change="changeRadio">
                <el-radio label="Male"></el-radio>
                <el-radio label="Female"></el-radio>
            </el-radio-group>
        </el-row>

        <hr>
        <el-row>
            <el-checkbox-group v-model="checkbox" @change="changeCheckbox">
                <el-checkbox label="Male"></el-checkbox>
                <el-checkbox label="Female"></el-checkbox>
            </el-checkbox-group>
        </el-row>
        <hr>
        <el-date-picker v-model="date" type="date" placeholder="Pick a day" value-format="yyyy-MM-dd" @change="changeDate">
        </el-date-picker>

        <el-date-picker v-model="datetime" type="datetime" placeholder="Pick a day and time"
            value-format="yyyy-MM-dd HH:mm:ss" @change="changeDateTime"> </el-date-picker>

        <el-date-picker v-model="dateRange" type="daterange" placeholder="Pick a day range" start-placeholder="Start date"
            end-placeholder="End date" @change="changeDateRange" value-format="yyyy-MM-dd"> </el-date-picker>
        <hr>
        <el-row>
            <el-table :data="tableData" :header-cell-style="{ background: 'lightblue', fontSize: '16px' }">
                <el-table-column label="Id" prop="id"></el-table-column>
                <el-table-column label="Name" prop="name"></el-table-column>
                <el-table-column label="Age" prop="age"></el-table-column>
                <el-table-column label="Address" prop="address"></el-table-column>
                <el-table-column label="Operation">
                    <template v-slot="scope">
                        <el-button type="primary" @click="handleClick(scope.row)">Edit</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'Element',
    data() {

        return {
            value: '',
            textArea: '',
            password: '',
            search: '',
            autoCompleteSearch:'',
            coffee: [{ value: "1Americano" }, { value: "2Latte" }, { value: "3Cappuccino" }, { value: "4Espresso" }],
            select: '',
            fruits: [{ id: 1, value: "apple" }, { id: 2, value: "banana" }, { id: 3, value: "orange" }],
            radio: '',
            checkbox: [],
            date: '',
            datetime: '',
            dateRange: '',
            tableData: [{ name: '张三', address: '北京市', id: 1, age: 23 }, { name: '张三', address: '北京市', id: 2, age: 23 }],
        }

    },
    methods: {
        querySearch(queryString, cb) {
            console.log(queryString)
            let results = queryString ? this.coffee.filter(v => v.value.includes(queryString)) : this.coffee;
            console.log(results)
            cb(results)

        },
        change() {
            console.log(this.select)


        }
        ,
        changeRadio() {
            console.log(this.radio)
        }
        ,
        changeCheckbox() {
            console.log(this.checkbox)
        },
        changeDate() {
            console.log(this.date)
        },
        changeDateTime() {
            console.log(this.datetime)
        },
        changeDateRange() {
            console.log(this.dateRange)
        },
        handleClick(row) {
            console.log(row.name)
            // alert(row.id)
            // this.$message.success(row.name)
            // this.$message.warning(row.name)
            // this.$message.info(row.name)
            // this.$message.error(row.name)
            // this.$notify.error(row.name)

            // this.$notify({
            //     title: 'Success',
            //     message: row.name,
            //     type: 'success'

            // })
            this.$confirm('Are you sure to click this button?', 'Tips', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: 'Clicked OK!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Clicked Cancel!'
                });
            });

        }
    }
}
</script>