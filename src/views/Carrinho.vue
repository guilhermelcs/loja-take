<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>Meu Carrinho</h1>
                <ul>
                    <v-row v-for="(produto, index) in produtos" :key="index"  align="end">
                        <v-col cols="1" class="text-center">
                            <Produto :detailsOnHover="false" :produto="produto"></Produto>
                        </v-col>
                        <v-col cols="7" class="text-center">
                            <p class="text-left">{{ produto.nome }}</p>
                            <hr>
                        </v-col>
                        <v-col cols="1" class="text-center">
                            <p class="product-qtd my-auto">x {{ produto.qtd }}</p>
                        </v-col>
                        <v-col cols="2" class="text-center">
                            <p class="product-qtd my-auto">R$ {{ produto.preco }}</p>
                        </v-col>
                        <v-col cols="1">
                            <v-row>
                                <v-icon @click="adicionarProduto( produto )" color="#fff">mdi-plus</v-icon>
                                <v-icon @click="removerProduto( produto )" color="#fff">mdi-minus</v-icon>
                            </v-row>
                        </v-col>
                    </v-row>
                </ul>
            </v-col>
            <v-row v-if="produtosInicio > 0">
                <v-col cols="12" class="text-right">
                    <p class="total">Total: R${{ String( this.getPrecoTotal() ).replace('.',',') }}</p>
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
        </v-row>
    </v-container>
</template>

<script>
import LinkButton from '../components/LinkButton'
import Produto from '../components/Produto'
import Modal from '../components/Modal'
import eventBus from '../eventBus'
export default {
    components: {
        LinkButton,
        Produto,
        Modal
    },
    data() {
        return {
            produtos: {},
            produtosInicio: 0,
        }
    },
    beforeMount() {
        this.produtosInicio = JSON.parse(localStorage.getItem('produtos')) ? JSON.parse(localStorage.getItem('produtos')).length : 0
    },
    created() {
        if ( JSON.parse(localStorage.getItem('produtos')) ) 
            this.produtos = JSON.parse(localStorage.getItem('produtos'))
        eventBus.$on('produtoRemovido', (produtos)=> {
            if( produtos.length > 1 ) {
                for( var i = 0; i < produtos.length; i++){ 
                    if( produtos[i].qtd == 0 ) {
                        produtos.splice(i, 1); 
                    }
                }

                this.produtos = produtos
                const parsed = JSON.stringify(this.produtos)
                localStorage.setItem('produtos', parsed)
            }
        })
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
        },
        removerProduto( produto ) {
            if ( JSON.parse(localStorage.getItem('produtos')) )
                this.produtos = JSON.parse(localStorage.getItem('produtos'))
    
            let decrementarQtd = this.produtos.find( obj => obj.id == produto.id )
            if( decrementarQtd ) {
                let index = this.produtos.indexOf(decrementarQtd)
                this.produtos[index].qtd > 0 ? this.produtos[index].qtd-- : ''
            }
            else {
                this.produtos.push( produto )
            }

            const parsed = JSON.stringify(this.produtos)
            localStorage.setItem('produtos', parsed)
            eventBus.$emit('produtoAdicionado', this.produtos, this.updateQuantidadeCarrinho())
            eventBus.$emit('produtoRemovido', this.produtos)
        },
        updateQuantidadeCarrinho() {
            let qtd = 0
            let produtos = JSON.parse(localStorage.getItem('produtos'))
            for(let item of produtos) {
                qtd += item.qtd
            }
            return qtd
        },
        getPrecoTotal() {
            if ( JSON.parse(localStorage.getItem('produtos')) )
                var produtos = JSON.parse(localStorage.getItem('produtos'))
            let precoTotal = 0
            for(let item of produtos) {
                precoTotal += parseFloat( item.preco.replace(',','.') ) * item.qtd
            }
            return precoTotal.toFixed(2)
        }
    },
    watch: {
        produtos() {
            this.getPrecoTotal()
        }
    }
}
</script>

<style scoped>
    h1 {
        font-size: 20px;
        font-weight: 400;
    }
</style>