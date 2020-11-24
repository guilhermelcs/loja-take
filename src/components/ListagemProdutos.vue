<template>
    <v-container>
        <v-row v-for="i in repeat" :key="i">
            <v-col cols="12">
                <h1 class="nome-listagem">{{ nomeListagem }}</h1>
            </v-col>
            <v-row>
                <v-col cols="3" v-for="produto in produtos" :key="produto.id">
                    <Produto :produto="produto"></Produto>
                </v-col>
                <v-col v-if=" i == repeat && showLinkButton " offset="9" cols="3" class="text-right">
                    <LinkButton routeTo="/produtos" buttonName="Ver Mais" />
                </v-col>
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
    },

    data() {
        return {
            produtos: [
                {   
                    id: 1,
                    nome: 'Nome do Produto 1',
                    qtd: 1,
                    preco: '21,89', 
                    imagem: require('../assets/images/take-prod-1.jpeg'),
                    descricao: 'item de maquiagem queridinho, o delineador tem o poder de realçar ainda mais a beleza dos olhos. Versátil, ele pode aparecer na sua make em diferentes formatos, cores e versões, das mais clássicas às mais ousadas e fashionistas.'
                },
                {   
                    id: 2,
                    nome: 'Nome do Produto 2', 
                    qtd: 1,
                    preco: '74,95', 
                    imagem: require('../assets/images/take-prod-3.jpeg'),
                    descricao: 'item de maquiagem queridinho, o delineador tem o poder de realçar ainda mais a beleza dos olhos. Versátil, ele pode aparecer na sua make em diferentes formatos, cores e versões, das mais clássicas às mais ousadas e fashionistas.'
                },
                {   
                    id: 3,
                    nome: 'Nome do Produto 3', 
                    qtd: 1,
                    preco: '86,70', 
                    imagem: require('../assets/images/take-prod-4.jpeg'),
                    descricao: 'item de maquiagem queridinho, o delineador tem o poder de realçar ainda mais a beleza dos olhos. Versátil, ele pode aparecer na sua make em diferentes formatos, cores e versões, das mais clássicas às mais ousadas e fashionistas.'
                },
                {   
                    id: 4,
                    nome: 'Nome do Produto 4', 
                    qtd: 1,
                    preco: '148,90', 
                    imagem: require('../assets/images/take-prod-5.jpeg'),
                    descricao: 'item de maquiagem queridinho, o delineador tem o poder de realçar ainda mais a beleza dos olhos. Versátil, ele pode aparecer na sua make em diferentes formatos, cores e versões, das mais clássicas às mais ousadas e fashionistas.'
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
</style>