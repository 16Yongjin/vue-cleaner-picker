<template lang="pug">
v-flex(xs12 md8)
  v-sheet(elevation="6" height="100%")
    v-toolbar
      v-toolbar-title.headline 청소구역
    v-layout.pa-3(row wrap)
      v-flex(xs12 md6 v-for="areaName in cleaningAreas" :key="areaName")
        v-card
          v-card-title.headline.text-xs-center
            div(v-text="areaKoreanName(areaName)")
            v-spacer
            div(v-text="areaPeopleNumberInfo(areaName)")
          v-card-text(height="100%" transition="slide-y-reverse-transition")
            draggable.mh100px(v-model="areaCleaners[areaName]" v-bind="dragOption(areaName)")
              v-card.mb-2(v-for="cleaner in areaCleaners[areaName]" :key="cleaner")
                v-card-text.text-xs-center.title
                  div.w100(v-text="cleaner")
      v-btn.pt-2(color="blue" fab fixed dark bottom right @click="resetCleaners")
        v-icon(large) refresh
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  computed: {
    cleaningAreas () {
      return this.$store.getters.cleaningAreas
    },
    areaCleaners () {
      return this.$store.state
    }
  },
  methods: {
    areaKoreanName (areaName) {
      return this.$store.getters.areaKoNames[areaName]
    },
    areaPeopleNumberInfo (areaName) {
      const currentPeopleNum = this.$store.state[areaName].length
      if (areaName !== 'publicArea') {
        return `${currentPeopleNum} / 1`
      } else {
        const cleanerSum = this.$store.getters.cleanerSum
        const cleanAreaNumber = this.$store.getters.cleaningAreas.length
        const publieAreaCleanerNumber = cleanerSum - cleanAreaNumber + 1

        return `${currentPeopleNum} / ${publieAreaCleanerNumber}`
      }
    },
    dragOption (areaName) {
      return {
        group: {
          name: 'cleaner',
          put: areaName !== 'publicArea' ? to => to.el.children.length < 1 : true
        }
      }
    },
    resetCleaners () {
      this.$store.dispatch('resetCleaners')
    }
  }
}
</script>

<style scoped>
.h100 {
  height: 100%;
}

.w100 {
  width: 100%;
}

.mh100px {
  min-height: 80px;
}
</style>
