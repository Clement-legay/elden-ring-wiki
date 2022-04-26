import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selected: '',
    allItems: {
      talismans: [],
      sorceries: [],
      armors: [],
      mobs: [],
      boss: [],
      others: [],
      items: [],
      NPCs: [],
      weapons: [],
      shields: [],
      incantations: [],
      ashesWar: [],
      spirits: [],
    },
    opened: false,
  },
  getters: {
    getTalismans: state => state.allItems.talismans,
    getSorceries: state => state.allItems.sorceries,
    getArmors: state => state.allItems.armors,
    getMobs: state => state.allItems.mobs,
    getBoss: state => state.allItems.boss,
    getOthers: state => state.allItems.others,
    getItems: state => state.allItems.items,
    getNPCs: state => state.allItems.NPCs,
    getWeapons: state => state.allItems.weapons,
    getSelected: state => state.selected,
    getOpened: state => state.opened,
    getShields: state => state.allItems.shields,
    getIncantations: state => state.allItems.incantations,
    getAshesWar: state => state.allItems.ashesWar,
    getSpirits: state => state.allItems.spirits,
  },
  mutations: {
    setSelected: (state, payload) => {
      state.selected = payload
    },
    setOpened: (state, payload) => {
      state.opened = payload
    },
    setTalismans: (state, payload) => {
      state.allItems.talismans = payload
    },
    setSorceries: (state, payload) => {
      state.allItems.sorceries = payload
    },
    setArmors: (state, payload) => {
      state.allItems.armors = payload
    },
    setMobs: (state, payload) => {
      state.allItems.mobs = payload
    },
    setBoss: (state, payload) => {
      state.allItems.boss = payload
    },
    setOthers: (state, payload) => {
      state.allItems.others = payload
    },
    setItems: (state, payload) => {
      state.allItems.items = payload
    },
    setNPCs: (state, payload) => {
      state.allItems.NPCs = payload
    },
    setWeapons: (state, payload) => {
      state.allItems.weapons = payload
    },
    setShields: (state, payload) => {
      state.allItems.shields = payload
    },
    setIncantations: (state, payload) => {
      state.allItems.incantations = payload
    },
    setAshesWar: (state, payload) => {
      state.allItems.ashesWar = payload
    },
    setSpirits: (state, payload) => {
      state.allItems.spirits = payload
    },
  },
  actions: {
    async setEverybody(state) {
      const setGeneral = async (path) => {
        const result = (await axios.get('https://eldenring.fanapis.com/api/' + path + '?limit=100'))
        let items = result.data.data
        let count = result.data.count
        let page = 1
        while (count === 100) {
          const pages = (await axios.get('https://eldenring.fanapis.com/api/' + path + '?limit=100&page=' + page))
          items = items.concat(pages.data.data)
          count = pages.data.count
          page++
        }

        if (path === 'armors') {
          items.find(armor => armor.category === "Gauntlet").category = "Gauntlets"
        } else if (path === 'shields') {
          items.find(weapon => weapon.category === "Small Shields").category = "Small Shield"
        }
        return items
      }
      state.commit('setTalismans', await setGeneral('talismans'))
      state.commit('setSorceries', await setGeneral('sorceries'))
      state.commit('setArmors', await setGeneral('armors'))
      state.commit('setMobs', await setGeneral('creatures'))
      state.commit('setBoss', await setGeneral('bosses'))
      state.commit('setItems', await setGeneral('items'))
      state.commit('setNPCs', await setGeneral('npcs'))
      state.commit('setWeapons', await setGeneral('weapons'))
      state.commit('setShields', await setGeneral('shields'))
      state.commit('setIncantations', await setGeneral('incantations'))
      state.commit('setAshesWar', await setGeneral('ashes'))
      state.commit('setSpirits', await setGeneral('spirits'))
    },
    setOthers(state, search) {
      let result = [];
      result = result.concat(this.state.allItems.armors.filter(armor => armor.name.toLowerCase().includes(search.toLowerCase())))
      result = result.concat(this.state.allItems.mobs.filter(mob => mob.name.toLowerCase().includes(search.toLowerCase())))
      result = result.concat(this.state.allItems.boss.filter(boss => boss.name.toLowerCase().includes(search.toLowerCase())))
      result = result.concat(this.state.allItems.sorceries.filter(sorcery => sorcery.name.toLowerCase().includes(search.toLowerCase())))
      result = result.concat(this.state.allItems.talismans.filter(talisman => talisman.name.toLowerCase().includes(search.toLowerCase())))
      result = result.concat(this.state.allItems.NPCs.filter(NPC => NPC.name.toLowerCase().includes(search.toLowerCase())))
      result = result.concat(this.state.allItems.items.filter(item => item.name.toLowerCase().includes(search.toLowerCase())))
      result = result.concat(this.state.allItems.weapons.filter(weapon => weapon.name.toLowerCase().includes(search.toLowerCase())))
      result = result.concat(this.state.allItems.shields.filter(shield => shield.name.toLowerCase().includes(search.toLowerCase())))
      result = result.concat(this.state.allItems.incantations.filter(incantation => incantation.name.toLowerCase().includes(search.toLowerCase())))
      result = result.concat(this.state.allItems.ashesWar.filter(ashes => ashes.name.toLowerCase().includes(search.toLowerCase())))
      result = result.concat(this.state.allItems.spirits.filter(spirit => spirit.name.toLowerCase().includes(search.toLowerCase())))
      state.commit('setOthers', result)
    },
    setSelected(state, name) {
      state.commit('setSelected', name)
    },
    setOpened(state, payload) {
      state.commit('setOpened', payload)
    },
  },
  modules: {
  }
})
