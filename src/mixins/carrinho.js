import eventBus from '../eventBus'
export default {
    data() {

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
    }
}