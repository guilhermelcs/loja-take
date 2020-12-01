<template>
    <v-container>
        <v-row v-for="i in repeatFiltrado" :key="i">
            <v-col cols="12">
                <h1 class="nome-listagem">{{ nomeListagem }}</h1>
            </v-col>
            <v-row>
                <v-col cols="12">
                    <v-row>
                        <v-col cols="3" v-for="produto in produtosFiltrados" :key="produto.id">
                            <h1 v-if="categoria">{{ categoria }}</h1>
                            <Produto :produto="produto"></Produto>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col v-if=" i == repeat && showLinkButton " offset="9" cols="3" class="text-right">
                    <LinkButton routeTo="/produtos" buttonName="Ver Mais" />
                </v-col>
            </v-row>
        </v-row>
</v-container>
</template>

<script>

import Produto from './Produto'
import LinkButton from './LinkButton'

export default {
    components: {
        Produto,
        LinkButton
    },
    props: {
        nomeListagem: String,
        repeat: {
            type: Number,
            default: 1,
            required: false,
        },
        showLinkButton: {
            type: Boolean,
            default: true
        },
        categoria: {
            type: String, 
            Nullable: true,
            required: false
        }
    },
    computed: {
        produtos() {
            return this.$store.getters.getProdutos
        },
        produtosFiltrados() {
            return this.$store.getters.getProdutosDaCategoria(this.categoria)
        },
        repeatFiltrado() {
            return this.categoria ? 1 : this.repeat
        }
    },
}
</script>
<style scoped>
    .nome-listagem {
        font-size: 18px;
        font-weight: normal;
    }

    h1 {
        font-size: 22px;
        font-weight: normal;
        text-transform: capitalize;
        margin-bottom: 10px;
    }
</style>