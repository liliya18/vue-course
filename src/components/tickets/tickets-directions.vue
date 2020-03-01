<template>
    <el-row :gutter="24">
        <el-col :span="8" v-for="(ticket, index) in direction" :key="`ticket-${index}`">
            <el-card class="ticket">
                <div class="ticket__info">
                     <span class="ticket__info-item">
                        <span class="ticket__title">
                            {{ formData.originCode }}
                            <br>
                            {{ getCity(formData.originCode).name }}
                        </span>
                        <span class="ticket__time">{{ timeFormatter(ticket.departure_at) }}</span>
                        <span class="ticket__date">{{ dateFormatter(ticket.departure_at) }}</span>
                    </span>
                    <img src="assets/travel.svg" alt="Путь">
                    <span class="ticket__info-item">
                        <span class="ticket__title">
                            {{ formData.destinationCode }}
                            <br>
                            {{ getCity(formData.destinationCode).name }}
                        </span>
                        <span class="ticket__time">{{ timeFormatter(ticket.return_at) }}</span>
                        <span class="ticket__date">{{ dateFormatter(ticket.return_at) }}</span>
                    </span>
                </div>
                <el-divider/>
                <div class="ticket__info">
                    <div class="ticket__airport-info">
                        <img class="ticket__airline" :src="getLogo(ticket.airline)" :alt="ticket.airline">
                        <span class="ticket__flight">{{ ticket.flight_number }}</span>
                    </div>
                    <span :class="getPriceClasses(ticket.price)">{{ ticket.price }} &#8381;</span>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    import {mapState} from 'vuex';

    import logoApi from '../../__data__/actions/get-static-data';

    export default {
        name: 'tickets-directions',
        props: {
            direction: {
                type: Object,
                required: true,
            },
            directionCode: {
                type: String,
                required: true,
            },
        },
        computed: {
            ...mapState(['formData']),
            cheap() {
                return Object.values(this.direction).reduce((prev, curr) => prev.price < curr.price ? prev : curr);
            },
            expensive() {
                return Object.values(this.direction).reduce((prev, curr) => prev.price > curr.price ? prev : curr);
            },
        },
        methods: {
            getPriceClasses(price) {
                return {
                    'ticket__price': true,
                    'ticket__price--cheap': this.cheap.price === price,
                    'ticket__price--expensive': this.expensive.price === price
                };
            },
            dateFormatter(value) {
                const date = new Date(value);
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear().toString().padStart(4, '0');
                return `${day}.${month}.${year}`;
            },
            timeFormatter(value) {
                const date = new Date(value);
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                return `${hours}:${minutes}`;
            },
            getCity(code) {
                return this.$store.getters.city(code);
            },
            getLogo(iata) {
                return logoApi.getLogo({
                    width: 100,
                    height: 100,
                    iata,
                });
            },
        }
    }
</script>

<style>
    .el-row {
        margin-left: 12px !important;
        margin-right: 12px !important;
    }

    .el-col {
        margin-bottom: 20px;
    }
</style>

<style scoped>
    .ticket__info {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .ticket__icon {
        color: #409EFF;
    }

    .ticket__info-item {
        display: flex;
        flex-direction: column;
    }

    .ticket__title {
        font-size: 20px;
        line-height: 1.2;
        color: #929292;
    }

    .ticket__time {
        font-weight: bold;
        font-size: 18px;
        line-height: 1.5;
        color: #1977f2;
    }

    .ticket__date {
        font-size: 13px;
        line-height: 1.5;
        color: #a0b0b9;
    }

    .ticket__airport-info {
        display: flex;
        align-items: center;
    }

    .ticket__airline {
        width: 40px;
        height: 40px;
    }

    .ticket__flight {
        margin-left: 16px;
        color: #a0b0b9;
    }

    .ticket__price {
        font-weight: bold;
        font-size: 16px;
        color: #f2af2d;
    }

    .ticket__price--cheap {
        color: #52b269;
    }

    .ticket__price--expensive {
        color: #f4566e;
    }
</style>
