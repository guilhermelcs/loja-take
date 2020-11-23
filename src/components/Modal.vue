<template>
  <div class="text-right">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <p v-bind="attrs" v-on="on">
          Finalizar Compra
        </p>
      </template>

      <v-card>
        <v-card-title class="headline lighten-2">
          Finalizar Compra 
        </v-card-title>

        <v-card-text>
            Este é um site funcionando apenas no lado do cliente, finalizar a compra irá zerar o seu carrinho e voltar para a página inicial.<br>
            Obrigado por usar este site :)
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="resetarSite()">Finalizar a compra </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import eventBus from '../eventBus'
export default {
    data () {
      return {
        dialog: false,
      }
    },
    methods: {
        resetarSite() {
            this.$router.push('/')
            localStorage.setItem('produtos', null)
            eventBus.$emit('produtoAdicionado', null)
        }
    }
}
</script>

<style>
</style>