<template>
    <div class="map">
        <div class="map__services services">
            <el-carousel class="services__carousel" height="400px" trigger="click">
                <el-carousel-item v-for="img in carousel">
                    <img class="services__carousel-img" :src="img.src" :alt="img.alt">
                </el-carousel-item>
            </el-carousel>
            <map-form class="services__filter"/>
        </div>
        <el-divider class="map__divider"/>
        <map-directions class="map__directions"/>
    </div>
</template>

<script>
    import MapForm from '../components/map/map-form';
    import MapDirections from '../components/map/map-directions';

    // @TODO
    import img1 from '../assets/carousel/1.jpeg';
    import img2 from '../assets/carousel/2.jpg';
    import img3 from '../assets/carousel/3.jpg';

    export default {
        name: 'map',
        components: {
            MapForm,
            MapDirections,
        },
        data: () => ({
            carousel: [
                {src: img1, alt: 'Самолет'},
                {src: img2, alt: 'Озеро'},
                {src: img3, alt: 'Горы'},
            ],
        }),
        mounted() {
            this.$store.dispatch('getCountries');
        },
    }
</script>

<style scoped>
    .map__divider {
        margin: 0;
    }

    .services {
        display: flex;
    }

    .services__carousel {
        flex-basis: 60%;
    }

    .services__filter {
        flex-basis: 40%;
    }

    .services__carousel-img {
        width: 100%;
    }
</style>

