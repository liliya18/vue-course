<template>
    <el-form class="form" :model="formData" :rules="rules" ref="form" label-width="160px" label-position="left">
        <el-form-item label="Город вылета" prop="origin">
            <el-autocomplete
                    class="form__autocomplete"
                    v-model="formData.origin"
                    value-key="name"
                    clearable
                    :trigger-on-focus="false"
                    :fetch-suggestions="fetchSuggestions"
                    placeholder="Откуда"
                    @select="handleSelectOrigin"
            />
        </el-form-item>
        <el-form-item label="Без обратного билета" prop="oneWay">
            <el-switch v-model="formData.oneWay"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSubmit">Найти</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: 'map-form',
        data: () => ({
            rules: {
                origin: [
                    {required: true, message: 'Укажите город вылета', trigger: 'change'},
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
            handleSubmit() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        await this.$store.dispatch('getMapCoordinates', {
                            origin: this.formData.originCode,
                            oneWay: this.formData.oneWay,
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

    .form__autocomplete {
        width: 220px;
    }
</style>
