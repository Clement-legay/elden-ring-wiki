<template>
    <v-fade-transition>
    <v-container v-if="show">
        <v-row>
            <v-col>
                <v-text-field :prepend-icon="icon.magnify" label="Find" dark v-model="search"></v-text-field>
            </v-col>
            <v-col>
                <v-select label="Filters" :items="filters.items" v-model="filter" :prepend-icon="icon.filter" dark></v-select>
            </v-col>
        </v-row>
        <v-row justify="center" v-if="size >= 50">
            <v-btn color="white" icon tile v-on:click="page--" :disabled="page === 1">
                <v-icon>{{icon.left}}</v-icon>
            </v-btn>
            <v-btn icon tile color="white" v-on:click="page = index" v-for="index in Math.ceil(size / 50)" :key="index">
                {{index}}
            </v-btn>
            <v-btn icon color="white" tile v-on:click="page++" :disabled="page === Math.ceil(size / 50)">
                <v-icon>{{icon.right}}</v-icon>
            </v-btn>
        </v-row>
        <v-row justify="center">
            <v-col class="pa-4" v-for="(element, index) in chosen($store.getters.getSelected)" :key="index" cols="8" sm="6" md="4" lg="3" xl="2">
                <v-card v-on:click="doIt(element);" min-width="220" max-width="300" color="rgba(0, 0, 0, 0.87)" height="225">
                    <v-card-title>
                        <v-spacer></v-spacer>
                        <h4 class="item_name">{{element.name}}</h4>
                        <v-spacer></v-spacer>
                    </v-card-title>
                    <v-card-text>
                        <v-row justify="center">
                            <v-spacer></v-spacer>
                            <v-col>
                                <v-img :src="'http://192.168.1.23:3000' + element.img" max-height="200" max-width="200"></v-img>
                            </v-col>
                            <v-spacer></v-spacer>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="mt-16" justify="center" v-if="size >= 50">
            <v-btn color="white" icon tile v-on:click="page--" :disabled="page === 1">
                <v-icon>{{icon.left}}</v-icon>
            </v-btn>
            <v-btn icon tile color="white" v-on:click="page = index" v-for="index in Math.ceil(size / 50)" :key="index">
                {{index}}
            </v-btn>
            <v-btn icon color="white" tile v-on:click="page++" :disabled="page === Math.ceil(size / 50)">
                <v-icon>{{icon.right}}</v-icon>
            </v-btn>
        </v-row>
        <v-dialog height="auto" width="auto" v-if="clicked !== null" v-on:click:outside="close" v-model="$store.getters.getOpened">
            <opened-item :item="clicked" ></opened-item>
        </v-dialog>
    </v-container>
    </v-fade-transition>
</template>

<script>
import {mdiMagnify, mdiFilter, mdiChevronLeft, mdiChevronRight} from '@mdi/js'
import OpenedItem from "@/components/openedItem";
import Vue from "vue";

export default {
    name: "Content",
    components: {OpenedItem},
    watch: {
       '$store.getters.getSelected': function(newValue) {
           this.$store.dispatch('setEverybody', {path: this.$store.getters.getSelected}).then(() => {
               this.setList(this.$store.getters.getSelected).then(() => {
                   this.show = true
               })
           })

           document.title = newValue.charAt(0).toUpperCase() + newValue.slice(1);
       }
    },
    data() {
        return {
            items: undefined,
            filterType: '',
            clicked: null,
            Math: Math,
            search: "",
            size: 0,
            show: false,
            page: 1,
            icon: {
                magnify: mdiMagnify,
                filter: mdiFilter,
                left: mdiChevronLeft,
                right: mdiChevronRight
            },
            filter: "all",
            filters: {
                name: "filter",
                items: ["all"]
            },
        }
    },
    methods: {
        chosen(selected) {
            if (this.filters.name !== selected) {
                this.resetFilters()
                if (this.filterType === 'category') this.filters.items.push(...new Set(this.items.map(item => item.category)))
                else if (this.filterType === 'type') this.filters.items.push(...new Set(this.items.map(item => item.type)))
                else if (this.filterType === 'affinity') this.filters.items.push(...new Set(this.items.map(item => item.affinity)))
                else if (this.filterType === 'effect') {
                    let effectsCleared = [];
                    this.items.forEach(item => effectsCleared.push(...item.effect.replace(',', '').replace(' in ', ' ').replace(' on ', ' ').replace(' or ', ' ').replace(' but ', ' ').replace(' is ', ' ').replace(' a ', ' ').replace(' at ', ' ').replace(' of ', ' ').replace('.', '').toLowerCase().split(" ")))
                    effectsCleared = effectsCleared.map(effect => ({name: effect, count: effectsCleared.filter(e => e.includes(effect)).length}))
                    effectsCleared.sort((a, b) => b.count - a.count)
                    this.filters.items.push(...new Set(effectsCleared.map(item => item.name)))
                }
                this.filters.name = selected
            }


            let itemsFiltered = this.items
            if (this.filter !== 'all') {
                if (this.filterType === 'category') itemsFiltered = this.items.filter(item => item.category === this.filter)
                else if (this.filterType === 'type') itemsFiltered = this.items.filter(item => item.type === this.filter)
                else if (this.filterType === 'affinity') itemsFiltered = this.items.filter(item => item.affinity === this.filter)
                else itemsFiltered = this.items.filter(item => item.effect.includes(this.filter))
            }

            let finalResult = itemsFiltered.filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()))
            this.size = finalResult.length
            return finalResult.slice((this.page - 1) * 50, this.page * 50)
        },
        doIt(element) {
            this.$router.push(`/${this.$store.getters.getSelected}/${element.name.replaceAll(' ', '+')}`)
        },
        close() {
            this.clicked = null;
            this.$store.dispatch('setOpened', false)
        },
        resetFilters() {
            this.filter = 'all'
            this.filters.items = ['all']
        },
        async setList(selected) {
            if (selected === 'bosses') {this.items = await this.$store.getters.getBoss; this.filterType = false}
            else if (selected === 'armors') {this.items = await this.$store.getters.getArmors; this.filterType = "category"}
            else if (selected === 'mobs') {this.items = await this.$store.getters.getMobs; this.filterType = false}
            else if (selected === 'sorceries') {this.items = await this.$store.getters.getSorceries; this.filterType = false}
            else if (selected === 'talismans') {this.items = await this.$store.getters.getTalismans; this.filterType = 'effect'}
            else if (selected === 'npcs') {this.items = await this.$store.getters.getNPCs; this.filterType = false}
            else if (selected === 'weapons') {this.items = await this.$store.getters.getWeapons; this.filterType = 'category'}
            else if (selected === 'items') {this.items = await this.$store.getters.getItems; this.filterType = "type"}
            else if (selected === 'ashes') {this.items = await this.$store.getters.getAshesWar; this.filterType = "affinity"}
            else if (selected === 'spirits') {this.items = await this.$store.getters.getSpirits; this.filterType = "type"}
            else if (selected === 'shields') {this.items = await this.$store.getters.getShields; this.filterType = "category"}
            else if (selected === 'incantations') {this.items = await this.$store.getters.getIncantations; this.filterType = "type"}
            else if (selected === 'others') {this.items = await this.$store.getters.getOthers; this.filterType = false}
            else return false;
        }
    },
    mounted() {
        if (this.$store.getters.getSelected === '') {
            if (Vue.$cookies.get('selected') === undefined) {
                this.$router.push('/')
            } else {
                this.$store.dispatch('setSelected', Vue.$cookies.get('selected'))
            }
        }

        this.$store.dispatch('setEverybody', {path: this.$store.getters.getSelected}).then(() => {
            this.setList(this.$store.getters.getSelected).then(() => {
                this.show = true
            })
        })

        document.title = this.$store.getters.getSelected.charAt(0).toUpperCase() + this.$store.getters.getSelected.slice(1);
    }
}
</script>

<style scoped>
.item_name {
    font-size: 0.9em;
    font-weight: bold;
    color: white;
    text-align: center;
}
</style>