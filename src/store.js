import Vue from 'vue'
import Vuex from 'vuex'
import { difference, pick, flatten, intersection } from 'lodash'
Vue.use(Vuex)

const getCleaningArea = (n) => {
  if (n >= 6) return ['trash', 'sweep', 'mopInside', 'mopOutsize', 'publicArea']
  else if (n === 5) return ['trash', 'sweep', 'mop', 'publicArea']
  else if (n === 4 || n === 3) return ['trashAndSweep', 'mop', 'publicArea']
  else return ['publicArea']
}

export default new Vuex.Store({
  state: {
    people: ['호빈', '인호', '용진', '찬호', '성문', '우성', '재훈'],
    publicAreaName: '세건실💩',
    workers: ['호빈'],
    cleaners: ['찬호', '인호', '용진', '성문', '우성', '재훈'],
    trash: [],
    trashAndSweep: [],
    sweep: [],
    mop: [],
    mopInside: [],
    mopOutsize: [],
    publicArea: [],
    peopleEditDialog: false
  },
  mutations: {
    updatePublicAreaName (state, value) {
      state.publicAreaName = value
    },
    updateWorkers (state, workers) {
      console.log('updatedWorkers')
      state.workers = workers
    },
    updateCleaners (state, cleaners) {
      console.log('updatedCleaners')
      state.cleaners = cleaners
    },
    addCleaners (state, cleaners) {
      state.cleaners.push(...cleaners)
    },
    updatePeople (state, people) {
      state.people = people
    },
    updateDialog (state, value) {
      state.peopleEditDialog = value
    }
  },
  actions: {
    updateWorkers ({ state, getters, commit, dispatch }, newWorkers) {
      console.log(getters.cleaningArea)
      const previousAreas = getCleaningArea(getters.cleanerSum)
      const nextAreas = getCleaningArea(state.people.length - newWorkers.length)
      const dismissableAreas = difference(previousAreas, nextAreas)
      const dismissedCleaners = flatten(Object.values(pick(state, dismissableAreas)))
      if (dismissedCleaners.length) {
        dismissableAreas.forEach(area => (state[area] = []))
        commit('addCleaners', dismissedCleaners)
      }
      commit('updateWorkers', newWorkers)

      dispatch('saveLocalData')
    },
    updatePeople ({ state, commit, dispatch }, payload) {
      dispatch('resetCleaners')
      commit('updatePeople', payload)

      commit('updateWorkers', intersection(state.workers, state.people))
      commit('updateCleaners', difference(state.people, state.workers))
      dispatch('saveLocalData')
    },
    updatePublicAreaName ({ commit, dispatch }, payload) {
      commit('updatePublicAreaName', payload)
      dispatch('saveLocalData')
    },
    saveLocalData ({ state }) {
      const { people, workers, publicAreaName } = state
      const localData = JSON.stringify({ people, workers, publicAreaName })
      localStorage.setItem('data', localData)
    },
    loadLocalData ({ state, commit }) {
      const localData = localStorage.getItem('data')
      if (localData) {
        console.log('load localData', localData)
        const { people, workers, publicAreaName } = JSON.parse(localData)
        commit('updatePublicAreaName', publicAreaName)
        commit('updatePeople', people)
        commit('updateWorkers', workers)
        commit('updateCleaners', difference(people, workers))
      }
    },
    resetCleaners ({ state, getters, commit }) {
      getters.cleaningAreas.forEach(area => (state[area] = []))
      commit('updateCleaners', getters.allCleaners)
    }
  },
  getters: {
    cleanerSum (state) {
      return state.people.length - state.workers.length
    },
    allCleaners (state) {
      return difference(state.people, state.workers)
    },
    cleaningAreas (_state, getters) {
      const areaNames = getCleaningArea(getters.cleanerSum)
      return areaNames
    },
    areaKoNames (state) {
      return {
        trash: '🗑️ 쓰레기통',
        trashAndSweep: '🗑️&🧹 쓰레기통 & 쓸기',
        sweep: '🧹 쓸기',
        mop: '밀기💦',
        mopInside: '생활관 밀기💦',
        mopOutsize: '복도 밀기💦',
        publicArea: state.publicAreaName
      }
    }
  }
})
