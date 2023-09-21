<template>
    <div>
        <div style="display: flex; ">
            <el-card style="width: 100%;">
                <div class="clearfix" slot="header">
                    <span>Buttons</span>
                    <span>{{ currentUser.name }}</span>
                </div>
                <div>
                    <div style="margin-top: 20px;">
                        <div style="margin: 10px 0;"><strong>Theme color</strong></div>
                        <el-button type="primary">Button</el-button>
                        <el-button type="success">Button</el-button>
                        <el-button type="warning">Button</el-button>
                        <el-button type="danger">Button</el-button>
                        <el-button type="info">Button</el-button>
                    </div>
                </div>
            </el-card>


        </div>

        
    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            currentUser: JSON.parse(localStorage.getItem('honey-user') || '{}'),

        }

    },
    methods: {

    },
    created() {

    }
}
</script>

<style></style>