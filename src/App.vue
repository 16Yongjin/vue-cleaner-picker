<template lang="pug">
v-app
  v-toolbar(app='')
    v-toolbar-title.headline.text-uppercase
      span Vuetify
      span.font-weight-light MATERIAL DESIGN
    v-spacer
    v-btn(flat='', href='https://github.com/vuetifyjs/vuetify/releases/latest', target='_blank')
      span.mr-2 Latest Release
      v-icon open_in_new
  v-content
    helloworld
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    HelloWorld
  },
  data() {
    return {
      //
    };
  }
};
</script>
