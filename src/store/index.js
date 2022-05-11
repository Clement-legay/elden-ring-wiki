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
      locations: [],
    },
    opened: false,
    user: undefined
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
    getLocations: state => state.allItems.locations,
    getUser: state => state.user
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
    setBosses: (state, payload) => {
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
    setLocations: (state, payload) => {
      state.allItems.locations = payload
    },
    setUser: (state, payload) => {
      state.user = payload
    }
  },
  actions: {
    async getLogin(state, payload) {
      const result = await axios.post('http://192.168.1.23:3000/api/user/login', payload)
      return result.data
    },
    async getRegister(state, payload) {
      const result = await axios.post('http://192.168.1.23:3000/api/user/register', payload)
      return result.data
    },
    disconnect(state) {
      state.commit('setUser', undefined)
      Vue.$cookies.remove('user')
    },
    async getPreciseItem(state, payload) {
      const result = await axios.get(`http://192.168.1.23:3000/api/${payload.path}/get/${payload.name}`)
      return result.data
    },
    login(state, payload) {
      Vue.$cookies.set('user', payload)
      state.commit('setUser', payload)
    },
    async checkToken(state, payload) {
      const result = await axios.post('http://192.168.1.23:3000/api/user/checkToken', payload)
      if (await result.data.status === 'success') {
        state.commit('setUser', payload.token)
      } else {
        Vue.$cookies.remove('user')
      }
    },
    async setEverybody(state, payload) {
      const setGeneral = async (path) => {
        const result = (await axios.get(`http://192.168.1.23:3000/api/${path}/get`, { params: { limit: 100, page: 0 } }))

        let items = result.data.data
        let count = result.data.count
        let page = 1
        while (count === 100) {
          const pages = (await axios.get('http://192.168.1.23:3000/api/' + path + '/get', { params: { limit: 100, page: page } }))
          items = items.concat(pages.data.data)
          count = pages.data.count
          page++
        }

        return items
      }


      state.commit(`set${payload.path.charAt(0).toUpperCase() + payload.path.slice(1)}`, setGeneral(payload.path))
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
