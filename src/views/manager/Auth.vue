<template>
    <div>
        
        <div style="display: flex; justify-content: center; align-items: center; min-height: calc(100vh - 100px);">
            <div style="text-align: center;">
                <h1>Access Denied</h1> <router-link to="/">Back to Home Page</router-link>

            </div>


        </div>
    </div>
</template>

<script>
export default {
    name: 'Auth',
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