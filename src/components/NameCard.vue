<template lang="pug">
v-card.mb-2
  v-card-text.text-xs-center.title
    div.w100(v-text="name")
</template>

<script>
export default {
  props: ['name']
}
</script>
