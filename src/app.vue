<template>
    <el-container>
        <el-header class="header">
            <div class="header__logo">
                <img :src="logoSrc" alt="Travel">
            </div>
            <div class="header__links">
                <div>
                    <router-link class="header__link" to="/tickets" active-class="header__link--active">Список</router-link>
                    <router-link class="header__link" to="/map" active-class="header__link--active">Карта</router-link>
                </div>
                <router-link class="header__link" to="/about" active-class="header__link--active">О проекте</router-link>
            </div>
        </el-header>
        <el-main class="main">
            <router-view/>
        </el-main>
    </el-container>
</template>

<script>
    import logoSrc from './assets/logo.svg';

    export default {
        name: 'app',
        data: () => ({
            logoSrc,
        }),
    }
</script>

<style>
    html, body {
        font-family: system-ui, sans-serif;
        margin: 0;
    }

    body * {
        box-sizing: border-box;
    }

    /* todo: убрать */
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>

<style scoped>
    .header {
        padding: 0 150px 0 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #409EFF;
    }

    .header__logo {
        flex-basis: 25%;
        font-size: 30px;
        font-weight: 500;
        color: #FFFFFF;
    }

    .header__links {
        flex-basis: 75%;
        display: flex;
        justify-content: space-between;
    }

    .header__link {
        margin-left: 40px;
        text-decoration: none;
        color: #FFFFFF;
    }

    .header__link--active {
        border-bottom: 2px solid #FFFFFF;
    }

    .main {
        padding: 0;
    }
</style>
