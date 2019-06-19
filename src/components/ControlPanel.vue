<template lang="pug">
v-flex(xs12 md4)
  v-sheet(elevation="6" height="100%")
    v-card(elevation=0)
      v-card-title.pb-2.headline 공공구역
      v-text-field.pr-2.pl-2(v-model="publicAreaName" label="공공구역" solo)

    v-divider

    v-card(elevation=0)
      v-card-title.pb-2.headline 청소자
      v-card-text.pt-0
        draggable(v-model="cleaners" group="cleaner")
          name-card(v-for="cleaner in cleaners" :name="cleaner" :key="cleaner")

    v-divider

    v-card(elevation=0)
      v-card-title.pb-2.headline 휴가/근무자
      v-card-text.pt-0
        draggable(v-model="workers" group="cleaner")
          name-card(v-for="worker in workers" :name="worker" :key="worker")
</template>

<script>
import draggable from 'vuedraggable'
import NameCard from '@/components/NameCard'

export default {
  components: {
    draggable,
    NameCard
  },
  computed: {
    publicAreaName: {
      get () {
        return this.$store.state.publicAreaName
      },
      set (value) {
        this.$store.dispatch('updatePublicAreaName', value)
      }
    },
    workers: {
      get () {
        return this.$store.state.workers
      },
      set (workers) {
        this.$store.dispatch('updateWorkers', workers)
      }
    },
    cleaners: {
      get () {
        return this.$store.state.cleaners
      },
      set (cleaners) {
        this.$store.commit('updateCleaners', cleaners)
      }
    }
  }
}
</script>
