// import eventBus from '../eventBus'
export default {
    created() {
        this.$store.commit('settarProdutosNoCarrinho')
    },
    computed: {
        produtos() {
            return this.$store.getters.getProdutosNoCarrinho
        },
        quantidadeProdutosCarrinho() {
            return this.$store.getters.getQuantidadeProdutosCarrinho
        }
    },
    filters: {
        paraReal(value) {
            return `R$ ${ String( value.toFixed(2) ).replace('.',',') }`
        }
    },
    methods: {
        adicionarProduto( produto ) {
            this.$store.dispatch('adicionarProdutoAoCarrinho', produto)
           
            const parsed = JSON.stringify(this.produtos)
            localStorage.setItem('produtos', parsed)
        },
        removerProduto( produto ) {
            this.$store.dispatch('removerProdutoDoCarrinho', produto)

            const parsed = JSON.stringify(this.produtos)
            localStorage.setItem('produtos', parsed)
        },
    }
}