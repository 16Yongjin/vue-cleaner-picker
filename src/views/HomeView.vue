<template lang="pug">
v-container.pb-2.h100(fluid grid-list-lg)
  v-layout.h100(wrap)
    control-panel
    picker-panel
    people-edit-dialog
</template>

<script>
import draggable from 'vuedraggable'
import ControlPanel from '@/components/ControlPanel'
import PickerPanel from '@/components/PickerPanel'
import PeopleEditDialog from '@/components/PeopleEditDialog'

export default {
  components: {
    draggable,
    ControlPanel,
    PickerPanel,
    PeopleEditDialog
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
  min-height: 100px;
}
</style>
