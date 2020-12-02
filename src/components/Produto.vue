<template>
    <div @mouseover="showDetails = true" @mouseleave="showDetails = false"  class="produto-wrapper">
        <div class="produto-details" v-if=" detailsOnHover && showDetails">
            <v-container class="mb-0 pt-0">
                <v-row class="mt-0 pt-0">
                    <v-col cols="12">
                        <h1 class=details-name> {{ produto.nome }} </h1>
                        <p class="details-description mb-0 pb-0">
                            {{  ! produto.descricao > 100 ? produto.descricao : produto.descricao.substring(0,100) + "..." }}
                        </p>
                        <v-row>
                            <v-col cols="6" class="mb-0 pb-0">
                                <p class="details-price"> R${{ produto.preco }}</p>
                            </v-col>
                            <v-col cols="6" class="text-right mb-0 pb-0">
                                <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon @click="adicionarProduto( produto )" v-bind="attrs" v-on="on" color="#000">mdi-cart-arrow-down</v-icon>
                                </template>
                                <span>Adicionar Item</span>
                                </v-tooltip>
                            </v-col>
                            <v-col cols="12" class="mt-0 pt-0">
                                <router-link :to="{ path: '/produto/' + produto.id, query: { produto: produto } }">
                                    <p class="details-more">
                                        Detalhes
                                        <v-icon color="#000" weight="lighter">mdi-arrow-right</v-icon>
                                    </p>
                                </router-link>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </div>

        <v-img aspect-ratio="1" :src="produto.imagem" :alt="produto.name">
             <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
      </template>    
        </v-img>    
    </div>
</template>

<script>
import carrinho from '../mixins/carrinho'

export default {
    props: {
        produto: {
            type: [Object, String,],
            required: true
        },
        detailsOnHover: {
            type: Boolean,
            default: true,
            required: false
        }
    },
    mixins: [ carrinho ],
    data() {
        return {
            showDetails: false,
        }
    },
}
</script>

<style scoped>
    .produto-wrapper {
        position: relative;
    }

    .produto-details {
        position: absolute;
        color: #000;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: #ffffffb9;
        z-index: 800;
    }

    .details-name {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 0;
    }

    .details-description {
        font-size: 12px;
        font-weight: lighten;
        margin-top: 0;
        padding-top: 0;
    }
    
    .details-price {
        font-size: 16px;
        font-weight: bold;
        margin-top: 0;
        padding-top: 0;
    }

    .details-more{
        font-size: 16px;
        font-weight: light;
        margin-top: 0;
        padding-top: 0;
    }

    a {
        text-decoration: none;
        font-size: 16px;
        font-weight: light;
        color: #000 !important;
    }    
</style>