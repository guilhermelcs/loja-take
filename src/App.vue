<template>
  <v-app>
    <v-main :class="{ 'menu-opened': menuIsOpen }">
      <Menu/>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Menu from "./components/Menu";
import eventBus from "./eventBus";

export default {
  name: "App",

  components: {
    Menu
  },

  data: () => ({
	menuIsOpen: false
  }),

  created() {
    eventBus.$on("menuOpen", (menuState) => {
		this.menuIsOpen = menuState
	});
  },
};
</script>

<style>
#app {
  color: #fff;
  font-family: "Roboto", sans-serif;
  background: linear-gradient(to left, #05282d, #299d8b);
  background-repeat: no-repeat;
}

.menu-opened {
	z-index: 0;
	background-color: #0000005e;
}
</style>
