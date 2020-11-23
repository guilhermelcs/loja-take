<template>
    <router-link :to="routeTo">
        {{ buttonName }}
        <v-icon v-if="hasIcon" color="#000" weight="lighter">mdi-arrow-right</v-icon>
    </router-link> 
</template>

<script>

export default {
    props: {
        routeTo: String,
        buttonName: String,
        hasIcon: {
            type: Boolean,
            default: true,
            required: false
        }
    }
}
</script>

<style scoped>
    * {
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
        font-weight: light;
        text-decoration: none;
        color: #fff !important;
    }
</style>