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
                <!--v-col v-if=" i == repeat && showLinkButton " offset="9" cols="3" class="text-right">
                    <LinkButton routeTo="/produtos" buttonName="Ver Mais" />
                </v-col-->
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
        produtosFiltrados() {
            if( this.categoria )
                return this.produtos.filter( obj => obj.categoria == this.categoria )
            return this.produtos
        },
        repeatFiltrado() {
            if( this.categoria ) 
                return 1
            return this.repeat
        }
    },
    data() {
        return {
            produtos: [
                {   
                    id: 1,
                    nome: 'Xampu em barra',
                    qtd: 1,
                    preco: '43,35', 
                    imagem: require('../assets/images/take-prod-1.jpeg'),
                    descricao: 'Xampu em barra limpa sem agredir os fios, elaborado a frio, também conhecido como cold. Produto 100% feito à mão, natural e vegetal. Elaborado com as técnicas milenares de saboaria e cosmetologia com manteigas, óleos vegetais e óleos essenciais.',
                    categoria: 'xampus'
                },
                {   
                    id: 2,
                    nome: 'Sabonete em barra', 
                    qtd: 1,
                    preco: '26,99', 
                    imagem: require('../assets/images/take-prod-2.jpeg'),
                    descricao: 'Sabonete em barra elaborado no processo a frio. Limpa sem agredir e mantém a oleosidade natural da pele. Produto 100% feito à mão, natural e vegetal. Elaborado com as técnicas milenares de saboaria e cosmetologia com manteigas e óleos vegetais, óleos essenciais e argilas.',
                    categoria: 'sabonetes'
                },
                {   
                    id: 3,
                    nome: 'Condicionador sólido', 
                    qtd: 1,
                    preco: '43,35', 
                    imagem: require('../assets/images/take-prod-3.jpeg'),
                    descricao: 'Condicionador sólido para cabelos: 100% feito à mão, natural e vegetal. Agora você tem um condicionador em barra para fazer dupla com o seu xampu natural e vegetal. Os novos condicionadores da take podem ser utilizados em todos os tipos de cabelo. Além de hidratar, nutrem, fecham as cutículas, reduzem as pontas duplas, ajudam a desembaraçar os fios e proporcionam brilho e maciez por dias.',
                    categoria: 'condicionadores'
                },
                {   
                    id: 4,
                    nome: 'Kit Hidrata', 
                    qtd: 1,
                    preco: '99,90', 
                    imagem: require('../assets/images/take-prod-5.jpeg'),
                    descricao: 'Hidratação é o destaque dos sabonetes, shampoo, e condicionador do Kit. O kit vem com 4 barras naturais, vegetais e feitos à mão elaborados no processo a frio, também conhecido como cold. Caso algum sabonete esteja sem estoque no momento da separação do seu pedido, seu kit poderá conter 1 sabonete repetido ou substituido por outro tipo. Kit em barra: limpa sem agredir e mantém a oleosidade natural da pele. Produto 100% feito à mão, natural e vegetal. Elaborado com as técnicas milenares de saboaria e cosmetologia com manteigas e óleos vegetais, óleos essenciais e argilas.',
                    categoria: 'kits'
                },
            ]
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