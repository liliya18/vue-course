<template>
    <div class="tickets">
        <div class="tickets__services services">
            <el-carousel class="services__carousel" height="400px" trigger="click">
                <el-carousel-item v-for="img in carousel">
                    <img class="services__carousel-img" :src="img.src" :alt="img.alt">
                </el-carousel-item>
            </el-carousel>
            <tickets-form class="services__filter"/>
        </div>
        <el-divider class="tickets__divider"/>
        <div class="tickets__directions">
            <tickets-directions
                    v-for="(direction, directionCode) in directions"
                    :key="`direction-${directionCode}`"
                    :direction-code="directionCode"
                    :direction="direction"
            />
        </div>
    </div>
</template>

<script>
    import TicketsForm from '../components/tickets/tickets-form';
    import TicketsDirections from '../components/tickets/tickets-directions';

    // @TODO
    import img1 from '../assets/carousel/1.jpeg';
    import img2 from '../assets/carousel/2.jpg';
    import img3 from '../assets/carousel/3.jpg';

    export default {
        name: 'tickets',
        components: {
            TicketsForm,
            TicketsDirections,
        },
        data: () => ({
            carousel: [
                {src: img1, alt: 'Самолет'},
                {src: img2, alt: 'Озеро'},
                {src: img3, alt: 'Горы'},
            ],
        }),
        mounted() {
            this.$store.dispatch('getCities');
        },
        computed: {
            directions() {
                return this.$store.getters.directions;
            },
        },
    }
</script>

<style scoped>
    .tickets__divider {
        margin: 0;
    }

    .tickets__directions {
        padding: 24px 0;
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
