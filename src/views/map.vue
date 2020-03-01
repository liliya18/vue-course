<template>
    <div class="map">
        <div class="map__services services">
            <el-carousel class="services__carousel" height="400px" trigger="click">
                <el-carousel-item>
                    <img class="services__carousel-img" src="assets/carousel/1.jpeg" alt="Самолет">
                </el-carousel-item>
                <el-carousel-item>
                    <img class="services__carousel-img" src="assets/carousel/2.jpg" alt="Озеро">
                </el-carousel-item>
                <el-carousel-item>
                    <img class="services__carousel-img" src="assets/carousel/3.jpg" alt="Горы">
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

    export default {
        name: 'map',
        components: {
            MapForm,
            MapDirections,
        },
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

