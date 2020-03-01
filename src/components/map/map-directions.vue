<template>
    <el-container>
        <el-aside class="aside" width="calc(100vw - 1000px)">
            <ul class="aside__directions directions">
                <li
                        class="direction"
                        v-for="(direction, countryCode) in mapDirections"
                        :key="countryCode"
                        @click="handleSelectCountry(direction)"
                >
                    <div class="direction__country">{{ getCountry(countryCode).name }}</div>
                    <div class="direction__description">{{ getCities(direction) }}</div>
                </li>
            </ul>
        </el-aside>
        <el-main class="main">
            <div v-show="Object.keys(mapDirections).length" class="main__map" ref="map"></div>
        </el-main>
    </el-container>
</template>

<script>
    import DG from '2gis-maps';

    export default {
        name: 'map-directions',
        data: () => ({
            map: null,
            markers: null,
        }),
        mounted() {
            this.initMap();
        },
        computed: {
            mapDirections() {
                return this.$store.getters.mapDirections;
            },
        },
        methods: {
            getCountry(code) {
                return this.$store.getters.country(code);
            },
            getCities(direction) {
                return direction.map(city => city.name).join(', ');
            },
            handleSelectCountry(cities) {
                this.markers.eachLayer(n => this.markers.removeLayer(n));

                const city = cities[0];
                this.map.setView([city.coordinates[1], city.coordinates[0]]);

                cities.forEach(city => {
                    const {
                        name,
                        coordinates,
                    } = city;

                    DG.marker([coordinates[1], coordinates[0]], {
                        label: name,
                    }).addTo(this.markers);
                });
            },
            initMap() {
                this.map = DG.map(this.$refs.map, {
                    center: [54.98, 82.89],
                    zoom: 5
                });

                this.markers = DG.featureGroup();
                this.markers.addTo(this.map);
            },
        },
    }
</script>

<style scoped>
    .aside {
        max-height: 100vh;
    }

    .directions {
        margin: 0;
        padding: 0;
    }

    .direction {
        padding: 14px 20px;
    }

    .direction:not(:last-child) {
        border-bottom: 1px solid #DCDFE6;
    }

    .direction__country {
        font-weight: 500;
        line-height: 1.5;
    }

    .direction__description {
        font-size: 13px;
        color: #a0b0b9;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .main {
        padding-top: 0;
        padding-bottom: 0;
    }

    .main__map {
        width: 950px;
        height: 100vh;
    }
</style>
