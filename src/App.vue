<template>
  <div id="app">
    <header>
      <h1>Book app</h1>
      <router-link to="/">Home</router-link>  |
      <router-link to="/random">Random</router-link>  |
      <router-link to="/about">About me</router-link>
    </header>
    <main>
      <router-view/>
    </main>
    <footer>
      <router-link 
        v-for="(item, index) in items" 
        :key="index" 
        :to="item.path"
      >
        {{ item.name }}
      </router-link>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Route } from '@/model/Routes'

@Component({
  components: {
    
  },
})
export default class Home extends Vue {
  private items: Route[] = [];

  mounted(): void  {
    this.$router.options.routes?.forEach(route => {
      this.items.push({
        name: route.name,
        path: route.path
      })
    })
  }
}
</script>



<style lang="scss">
@import '@/assets/styles.scss';
</style>
