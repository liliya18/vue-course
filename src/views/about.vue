<template>
    <div class="about">
        <div class="about__text">Учебный проект по курсу VueJS.</div>
        <div class="about__text">Тема проекта - Сервис по поиску авиабилетов.</div>
        <div class="about__text">
            Используемые API:
            <ul class="about__api-list">
                <li v-for="link in api">
                    <el-link type="primary" :href="link.href">
                        {{ link.name }}
                    </el-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'about',
        data: () => ({
            api: [
                {
                    name: 'API от Travelpayouts',
                    href: 'https://support.travelpayouts.com/hc/ru/sections/360004490151-API-%D0%BE%D1%82-Travelpayouts'
                },
                {
                    name: 'API данных от Aviasales',
                    href: 'https://support.travelpayouts.com/hc/ru/sections/201008338-API-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85-%D0%BE%D1%82-Aviasales'
                },
                {
                    name: 'API 2gis',
                    href: 'https://api.2gis.ru/doc/maps/ru/quickstart/'
                },
            ],
        }),
    }
</script>

<style scoped>
    .about {
        padding: 40px;
    }

    .about__text {
        line-height: 1.5;
    }

    .about__api-list {
        margin: 0;
        list-style: none;
    }
</style>
