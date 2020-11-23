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
                            <p @click="adicionarProduto(produto)" class="product-add">Adicionar Item <v-icon color="#fff">mdi-plus</v-icon></p>
                        </v-col>
                    </v-row>
                    <LinkButton class="mt-5 pt-5" :buttonName="'Ver mais produtos'" :route-to="'/produtos'" :has-icon="false"></LinkButton>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import eventBus from '../eventBus'
import Produto from '../components/Produto'
import LinkButton from '../components/LinkButton.vue'
export default {
    components: {
        LinkButton,
        Produto,
    },
    data() {
        return {
            produtos: [],
            produto: this.$route.query.produto
        }
    },
    methods: {
        adicionarProduto( produto ) {
            if ( JSON.parse(localStorage.getItem('produtos')) )
                this.produtos = JSON.parse(localStorage.getItem('produtos'))
    
            let incrementarQtd = this.produtos.find( obj => obj.id == produto.id )
            if( incrementarQtd ) {
                let index = this.produtos.indexOf(incrementarQtd)
                this.produtos[index].qtd++
            }
            else {
                this.produtos.push( produto )
            }
           
            const parsed = JSON.stringify(this.produtos)
            localStorage.setItem('produtos', parsed)
            eventBus.$emit('produtoAdicionado', this.produtos, this.updateQuantidadeCarrinho())
            this.produtos = []
        },
        updateQuantidadeCarrinho() {
            let qtd = 0
            let produtos = JSON.parse(localStorage.getItem('produtos'))
            for(let item of produtos) {
                qtd += item.qtd
            }
            return qtd
        }
    },
    mounted() {
        if( this.produto !== "[object Object]" ) {
            localStorage.setItem('produto', JSON.stringify(this.produto))
            console.log(this.produto)
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