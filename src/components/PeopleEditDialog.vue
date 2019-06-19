<template lang="pug">
v-dialog(v-model="dialog" max-width="600px")
  v-card
    v-toolbar
      v-toolbar-title 인원 수정
    v-card-title
      v-combobox(v-model="people" :items="[]" hide-selected label="인원을 입력하세요" multiple small-chips solo)
        template(v-slot:selection="{ item, parent, selected }")
          v-chip(label)
            span.pr-2 {{ item }}
            v-icon(small @click="deletePeople(item)") close
    v-card-actions
      v-spacer
      v-btn(flat @click="closeDialog") 취소
      v-btn(color="primary" @click="updatePeople") 확인

</template>

<script>
export default {
  data () {
    return {
      people: [...this.$store.state.people]
    }
  },
  computed: {
    dialog: {
      get () {
        return this.$store.state.peopleEditDialog
      },
      set (value) {
        this.$store.commit('updateDialog', value)
      }
    }
  },
  methods: {
    closeDialog () {
      this.$store.commit('updateDialog', false)
      this.people = [...this.$store.state.people]
    },
    updatePeople () {
      this.$store.dispatch('updatePeople', this.people)
      this.closeDialog()
    },
    deletePeople (name) {
      this.people = this.people.filter(n => n !== name)
    }
  }
}
</script>
