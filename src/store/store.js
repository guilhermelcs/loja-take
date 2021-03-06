import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        produtos: [
            {   
                id: 1,
                nome: 'Xampu em barra',
                qtd: 1,
                preco: 43.35, 
                imagem: require('../assets/images/take-prod-1.jpeg'),
                descricao: 'Xampu em barra limpa sem agredir os fios, elaborado a frio, também conhecido como cold. Produto 100% feito à mão, natural e vegetal. Elaborado com as técnicas milenares de saboaria e cosmetologia com manteigas, óleos vegetais e óleos essenciais.',
                categoria: 'xampus'
            },
            {   
                id: 2,
                nome: 'Sabonete em barra', 
                qtd: 1,
                preco: 26.99, 
                imagem: require('../assets/images/take-prod-2.jpeg'),
                descricao: 'Sabonete em barra elaborado no processo a frio. Limpa sem agredir e mantém a oleosidade natural da pele. Produto 100% feito à mão, natural e vegetal. Elaborado com as técnicas milenares de saboaria e cosmetologia com manteigas e óleos vegetais, óleos essenciais e argilas.',
                categoria: 'sabonetes'
            },
            {   
                id: 3,
                nome: 'Condicionador sólido', 
                qtd: 1,
                preco: 43.35, 
                imagem: require('../assets/images/take-prod-3.jpeg'),
                descricao: 'Condicionador sólido para cabelos: 100% feito à mão, natural e vegetal. Agora você tem um condicionador em barra para fazer dupla com o seu xampu natural e vegetal. Os novos condicionadores da take podem ser utilizados em todos os tipos de cabelo. Além de hidratar, nutrem, fecham as cutículas, reduzem as pontas duplas, ajudam a desembaraçar os fios e proporcionam brilho e maciez por dias.',
                categoria: 'condicionadores'
            },
            {   
                id: 4,
                nome: 'Kit Hidrata', 
                qtd: 1,
                preco: 99.90, 
                imagem: require('../assets/images/take-prod-5.jpeg'),
                descricao: 'Hidratação é o destaque dos sabonetes, shampoo, e condicionador do Kit. O kit vem com 4 barras naturais, vegetais e feitos à mão elaborados no processo a frio, também conhecido como cold. Caso algum sabonete esteja sem estoque no momento da separação do seu pedido, seu kit poderá conter 1 sabonete repetido ou substituido por outro tipo. Kit em barra: limpa sem agredir e mantém a oleosidade natural da pele. Produto 100% feito à mão, natural e vegetal. Elaborado com as técnicas milenares de saboaria e cosmetologia com manteigas e óleos vegetais, óleos essenciais e argilas.',
                categoria: 'kits'
            },
        ],
        produtosNoCarrinho: []
    },
    getters: {
        getProdutos(state) {
            return state.produtos
        },
        getProdutosDaCategoria: (state, getters) => (categoria = false) => {
            return categoria ? getters.getProdutos.filter( obj => obj.categoria == categoria ) : getters.getProdutos
        },
        getProdutosNoCarrinho(state) {
            return state.produtosNoCarrinho
        },
        getQuantidadeProdutosCarrinho(state, getters) {
            return getters.getProdutosNoCarrinho.reduce((acumulador, produto) => acumulador + produto.qtd, 0)
        },
        getPrecoTotal(state, getters) {
            return getters.getProdutosNoCarrinho.reduce((acumulador, produto) => acumulador + ( produto.qtd * produto.preco ), 0)
        }
    },
    mutations: {
        settarProdutosNoCarrinho(state) {
            state.produtosNoCarrinho = JSON.parse(localStorage.getItem('produtos')) ? JSON.parse(localStorage.getItem('produtos')) : []
        },
        adicionarProdutoAoCarrinho(state, produto) {
            state.produtosNoCarrinho.push(produto)
        },
        adicionarProdutoExistenteAoCarrinho(state, produto) {
            state.produtosNoCarrinho = state.produtosNoCarrinho.map( obj => obj.id == produto.id ? obj = produto : obj)
        },
        removerProdutoDoCarrinho(state, index ) {
            state.produtosNoCarrinho.splice(index, 1)
        },
    },
    actions: {
        adicionarProdutoAoCarrinho({ commit, getters }, produto) {
            let produtoJaAdicionado = false
            getters.getProdutosNoCarrinho.map( obj => {
                if( obj.id == produto.id ) {
                    produtoJaAdicionado = true
                    obj.qtd++
                }
            })
            
            produtoJaAdicionado == false ? commit('adicionarProdutoAoCarrinho', produto) : ''
        },
        removerProdutoDoCarrinho({ commit, getters }, produto) {
            let produtoIndex = null
            getters.getProdutosNoCarrinho.map( (obj, index) => {
                if( obj.id == produto.id ) {
                    obj.qtd > 1 ? obj.qtd-- : produtoIndex = index
                }
            })
            
            produtoIndex !== null ? commit('removerProdutoDoCarrinho', produtoIndex) : ''
        }
    }
})