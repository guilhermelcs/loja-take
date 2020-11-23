<template>
    <v-container>
        <v-row>
            <v-col>
                <ListagemProdutos nomeListagem="Mais Vendidos"></ListagemProdutos>
            </v-col>
        </v-row>
</v-container>
</template>

<script>
import ListagemProdutos from '../components/ListagemProdutos'

export default {
    components: {
        ListagemProdutos,
    }
}
</script>

<style scoped>

</style>