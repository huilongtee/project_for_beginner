<template>
    <div>
        <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh;">
            <div style="text-align: center;">
                <h1>Page not Found</h1> <router-link to="/">Back to Home Page</router-link>

            </div>


        </div>


    </div>
</template>

<script>
export default {
    name: '404',
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