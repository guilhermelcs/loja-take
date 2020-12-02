<template>
    <div>
        <v-container class="mt-5">
            <v-row>
                <v-col offset="1" cols="5">
                    <Produto :produto="produto" :detailsOnHover="false"></Produto>
                </v-col>
                <v-col cols="6">
                    <h1 class="product-name">{{ produto.nome }}</h1>
                    <p class="product-description">{{ produto.descricao }}</p>
                    <v-row>
                        <v-col cols="6">
                            <p class="product-price">R${{ produto.preco }}</p>
                        </v-col>
                        <v-col cols="6 mb-5 pb-5 text-right">
                            <p @click="adicionarProduto(produto); snackbar = true" class="product-add">Adicionar Item <v-icon color="#fff">mdi-plus</v-icon></p>
                        </v-col>
                    </v-row>
                    <LinkButton class="mt-5 pt-5" :buttonName="'Ver mais produtos'" :route-to="'/produtos'" :has-icon="false"></LinkButton>
                </v-col>
            </v-row>
        </v-container>
        <v-expand-x-transition>
            <v-snackbar v-model="snackbar" :timeout="timeout">
                Produto adicionado ao carrinho
                <template v-slot:action="{ attrs }">
                    <v-btn
                    color="pink"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                    >
                    Ok
                    </v-btn>
                </template>
            </v-snackbar>
        </v-expand-x-transition>
    </div>
</template>

<script>
import Produto from '../components/Produto'
import LinkButton from '../components/LinkButton.vue'
import carrinho from '../mixins/carrinho'
export default {
    components: {
        LinkButton,
        Produto,
    },
    mixins: [ carrinho ],
    data() {
        return {
            produto: this.$route.query.produto,
            snackbar: false,
            timeout: 3500,
        }
    },
    mounted() {
        if( this.produto !== "[object Object]" ) {
            localStorage.setItem('produto', JSON.stringify(this.produto))
        }
        if( localStorage.getItem('produto') ) {
            this.produto = JSON.parse(localStorage.getItem('produto'))
        }
    }
}
</script>

<style scoped>
    .product-name {
        font-size: 20px;
        margin-bottom: 10px;
    }
    .product-description {
        font-size: 16px;
        font-weight: light;
    }
    .product-price {
        font-size: 20px;
        font-weight: 600;
    }
    .product-add {
        font-size: 20px;
        font-weight: 600;
        cursor: pointer
    }

    a {
        font-size: 18px;
        font-weight: 400
    }
</style>