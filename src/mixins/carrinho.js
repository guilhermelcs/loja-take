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