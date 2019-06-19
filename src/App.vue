<template lang="pug">
v-app
  v-toolbar(app)
    v-toolbar-title.headline
      span 청소 인원 뽑기
    v-spacer
    v-btn(icon flat @click="openDialog")
      v-icon person_add
  v-content
    home-view
</template>

<script>
import HomeView from './views/HomeView'

export default {
  name: 'App',
  components: {
    HomeView
  },
  methods: {
    openDialog () {
      this.$store.commit('updateDialog', true)
    }
  }
}
</script>
