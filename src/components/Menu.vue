<template>
    <div>
        <v-toolbar dense flat color="transparent">
            <v-container fluid>
                <v-row>
                    <v-col offset="1" cols="6">
                        <v-app-bar-nav-icon  v-if="!menuIsVisible"  @click="menuIsVisible = true" color="white"></v-app-bar-nav-icon>
                    </v-col>
                    <v-col cols="4" class="text-end align-self-center mt-2">
                        <router-link v-if="cartItems" to="/carrinho">
                            <v-badge :content="cartItems" :value="cartItems" color="red" overlap >
                                <v-icon color="white"> mdi-cart </v-icon>
                            </v-badge>
                        </router-link>
                        <router-link v-else to="/carrinho">
                            <v-icon color="white"> mdi-cart </v-icon>
                        </router-link>
                    </v-col>
                </v-row>
            </v-container>
        </v-toolbar>
        <div v-if="menuIsVisible" v-click-outside="{ handler: closeMenu}" class="menu-body">
            <v-container>
                <v-row>
                    <v-col cols="6">
                        <router-link to="/">
                            <p class="menu-title" @click="closeMenu">E-commerce</p>
                        </router-link>
                    </v-col>
                    <v-col cols="6" class="text-end pr-5">
                        <v-icon @click="menuIsVisible = false" color="white">
                            mdi-close
                        </v-icon>
                    </v-col>
                </v-row>
                <v-row>
                    <ul>
                        <li v-for="item in menuItems" :key="item">
                            {{ item }}
                        </li>
                    </ul>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
    import eventBus from '../eventBus'
    export default {
        data() {
            return {
                menuIsVisible: false,
                menuItems: [''],
                cartItems: 0
            }
        },
        methods: {
            closeMenu() {
                if( this.menuIsVisible )
                    this.menuIsVisible = false
            }
        },
        watch: {
            menuIsVisible() {
                eventBus.$emit("menuOpen", this.menuIsVisible)
            }
        },
        created() {
            if ( JSON.parse(localStorage.getItem('produtos')) ) {
                let qtd = 0
                let produtos = JSON.parse(localStorage.getItem('produtos'))
                for(let item of produtos) {
                    qtd += item.qtd
                }
                this.cartItems = qtd
            }
                
        },
        mounted() {
            eventBus.$on('produtoAdicionado', (produtos, produtosQtd) => {
                this.cartItems = produtosQtd
            })
        }
    }
</script>

<style lang="scss" scoped>
    .menu-body {
        position: fixed;
        width: 30%;
        top: 0;
        height: 100vh;
        background: linear-gradient(to left, #05282d, #299d8b);
        z-index: 900
    }

    ul li {
        list-style: none;
        font-weight: lighter;
        margin-top: 8px;
        cursor: pointer;
    }

    ul li:hover {
        font-weight: bold;
        transition: .3s;
    }

    .menu-title {
        font-size: 24px;
        font-weight: bold;
    }

    a {
        text-decoration: none;
        color: #fff !important;
    }
</style>