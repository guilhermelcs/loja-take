<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <h1>Meu Carrinho</h1>
                    <transition-group name="slide">
                        <v-row v-for="(produto) in produtos" :key="produto.id"  align="end">
                            <v-col cols="1" class="text-center">
                                <router-link :to="{ path: '/produto/' + produto.id, query: { produto: produto } }">
                                    <Produto :detailsOnHover="false" :produto="produto"></Produto>
                                </router-link>
                            </v-col>
                            <v-col cols="7" class="text-center">
                                <p class="text-left">{{ produto.nome }}</p>
                                <hr>
                            </v-col>
                            <v-col cols="1" class="text-center">
                                <p class="product-qtd my-auto">x {{ produto.qtd }}</p>
                            </v-col>
                            <v-col cols="2" class="text-center">
                                <p class="product-qtd my-auto">{{ produto.preco | paraReal }}</p>
                            </v-col>
                            <v-col cols="1">
                                <v-row>
                                    <v-icon @click="adicionarProduto( produto )" color="#fff">mdi-plus</v-icon>
                                    <v-icon @click="removerProduto( produto )" color="#fff">mdi-minus</v-icon>
                                </v-row>
                            </v-col>
                        </v-row>
                    </transition-group>
                </v-col>
            </v-row>
        </v-container>
        <div class="fixed-bottom-options">
            <v-container>
                <v-row>
                    <v-col cols="col-12">
                        <v-row v-if="quantidadeProdutosCarrinho > 0">
                            <v-col cols="12" class="text-right">
                                <p class="total">Total: {{ this.getPrecoTotal | paraReal }}</p>
                            </v-col>
                            <v-col cols="6" class="text-left">
                                <LinkButton routeTo="/" :buttonName="'Ver mais produtos'" :hasIcon="false"></LinkButton>
                            </v-col>
                            <v-col offset="4" cols="2" class="text-right">
                                <Modal></Modal>
                            </v-col>
                        </v-row>
                        <v-row v-else>
                            <v-col cols="12" class="text-center">
                                <p>O seu carrinho está vazio, que tal selecionar alguns produtos para você?</p>
                                <LinkButton class="text-left" routeTo="/produtos" :buttonName="'Ver produtos'" :hasIcon="true"></LinkButton>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
import LinkButton from '../components/LinkButton'
import Produto from '../components/Produto'
import Modal from '../components/Modal'
import carrinho from '../mixins/carrinho'
export default {
    components: {
        LinkButton,
        Produto,
        Modal
    },
    mixins: [carrinho],
    computed: {
        getPrecoTotal() {
            return this.$store.getters.getPrecoTotal
        }
    },
}
</script>

<style scoped>
    h1 {
        font-size: 20px;
        font-weight: 400;
    }

    @keyframes slide-in {
        from { transform: translateX(-100%) };
        to { transform: translateX(0%) };
    }

    @keyframes slide-out {
        to { transform: translateX(-100%) };
        from { transform: translateX(0%) };
    }

    .slide-enter, .slide-leave-to {
        opacity: 0;
    }

    .slide-enter-to, .slide-leave {
        opacity: 1;
    }

    .slide-enter-active {
        animation: slide-in 1s;
        transition: opacity 1s;
    }

    .slide-leave-active {
        position: absolute;
        animation: slide-out 1s;
        transition: opacity 1s;
    }

    .slide-move {
        transition: transform 1s
    }

    .fixed-bottom-options {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
    }
</style>