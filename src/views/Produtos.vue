<template>
    <div>
        <ListagemProdutos :repeat="3" :showLinkButton="false" :categoria="categoria" />
    </div> 
</template>

<script>
import ListagemProdutos from '../components/ListagemProdutos'

export default {
    data() {
        return {
            categoria: null
        }
    },
    components: {
        ListagemProdutos,
    },
    created() {
        if( this.$route.query.categoria )
            this.categoria = this.$route.query.categoria
    },
}
</script>

<style>

</style>