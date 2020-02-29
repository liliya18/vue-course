<template>
    <el-form class="form" v-if="formData" :model="formData" :rules="rules" ref="form">
        <div class="form__item-group">
            <el-form-item label="Город вылета" prop="origin">
                <el-autocomplete
                        class="form__autocomplete"
                        v-model="formData.origin"
                        value-key="name"
                        clearable
                        :trigger-on-focus="false"
                        :fetch-suggestions="fetchSuggestions"
                        @select="handleSelectOrigin"
                />
            </el-form-item>
            <el-form-item label="Город прибытия" prop="destination">
                <el-autocomplete
                        class="form__autocomplete"
                        v-model="formData.destination"
                        value-key="name"
                        clearable
                        :trigger-on-focus="false"
                        :fetch-suggestions="fetchSuggestions"
                        @select="handleSelectDestination"
                />
            </el-form-item>
        </div>
        <div class="form__item-group">
            <el-form-item label="Дата отправления" prop="departDate">
                <el-date-picker
                        v-model="formData.departDate"
                        type="month"
                        value-format="yyyy-MM"
                />
            </el-form-item>
            <el-form-item label="Дата возвращения" prop="returnDate">
                <el-date-picker
                        v-model="formData.returnDate"
                        type="month"
                        value-format="yyyy-MM"
                />
            </el-form-item>
        </div>
        <el-form-item class="form__button-group">
            <el-button type="primary" @click="handleSubmit">Найти</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: 'tickets-form',
        data: () => ({
            rules: {
                origin: [
                    {required: true, message: 'Укажите город вылета', trigger: 'change'},
                ],
                destination: [
                    {required: true, message: 'Укажите город прибытия', trigger: 'change'},
                ],
            },
        }),
        computed: {
            formData: {
                get() {
                    return this.$store.getters.formData;
                },
                set(value) {
                    this.$store.dispatch('setFormData', value);
                }
            },
        },
        methods: {
            async fetchSuggestions(term, callback) {
                try {
                    await this.$store.dispatch('getPlaces', term);
                    callback(this.$store.getters.places(term));
                } catch (e) {
                    console.error('Error:', e);
                }
            },
            handleSelectOrigin({code}) {
                this.formData.originCode = code;
            },
            handleSelectDestination({code}) {
                this.formData.destinationCode = code;
            },
            handleSubmit() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        await this.$store.dispatch('getDirections', {
                            origin: this.formData.originCode,
                            destination: this.formData.destinationCode,
                            departDate: this.formData.departDate,
                            returnDate: this.formData.returnDate,
                        });
                    }
                });
            },
        }
    }
</script>

<style scoped>
    .form {
        padding: 20px;
    }

    .form__item-group {
        display: flex;
        justify-content: space-between;
    }

    .form__button-group {
        display: flex;
        justify-content: center;
    }

    .form__autocomplete {
        width: 220px;
    }
</style>
