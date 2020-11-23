<template>
    <div>
        <ListagemProdutos :repeat="3" :showLinkButton="false" />
    </div> 
</template>

<script>
import ListagemProdutos from '../components/ListagemProdutos'

export default {
    components: {
        ListagemProdutos,
    }
}
</script>

<style>

</style>