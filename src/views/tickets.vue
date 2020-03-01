<template>
    <div class="tickets">
        <div class="tickets__services services">
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

    export default {
        name: 'tickets',
        components: {
            TicketsForm,
            TicketsDirections,
        },
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
