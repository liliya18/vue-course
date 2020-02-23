<template>
    <div>{{ message }}</div>
</template>

<script>
import axios from 'axios';

    export default {
        name: 'App',
        data: () => ({
            message: 'Loading...',
        }),
        mounted() {
            this.getText();
        },
        methods: {
            async getText() {
                const response = await axios.get('/api');
                this.message = response.data.text;
            },
        }
    }
</script>