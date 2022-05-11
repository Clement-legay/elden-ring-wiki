<template>
    <v-container class="pt-8">
        <v-row justify="center">
            <v-fade-transition>
                <v-col cols="12" md="11" v-if="armor !== undefined">
                    <v-card class="mx-auto" color="rgba(0, 0, 0, 0.87)">
                        <v-row class="ml-4 pt-3 ml-md-0 pt-md-0">
                            <h1 class="headline font-weight-medium white--text">{{ armor.name }} | Elden Ring</h1>
                        </v-row>
                        <v-row  class="ml-4 mr-4 mr-md-0 ml-md-0">
                            <v-divider color="white"></v-divider>
                        </v-row>
                        <v-row  class="ml-4 ml-md-0">
                            <div class="breadcrumbs mt-2">
                                <router-link class="breadcrumbs-link" to="/">Home</router-link>
                                <span class="breadcrumbs-separator">/</span>
                                <router-link class="breadcrumbs-link" to="/content">Content</router-link>
                                <span class="breadcrumbs-separator">/</span>
                                <p class="breadcrumbs-current ma-0 pa-0">{{ armor.name }}</p>
                            </div>
                        </v-row>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="8" order="2" order-md="1">
                                    <p class="white--text">{{ armor.desc }}</p>
                                </v-col>
                                <v-col cols="12" md="4" order="1" order-md="2">
                                    <div class="pa-auto" style="border: 1px solid darkgoldenrod; border-radius: 5px; background: black">
                                        <v-row justify="center" align="center" style="height: 120px">
                                            <v-col cols="8" class="text-center">
                                                <span class="headline font-weight-medium white--text">{{ armor.name }}</span>
                                            </v-col>
                                        </v-row>
                                        <v-divider color="grey"></v-divider>
                                        <v-row justify="center" align="center">
                                            <v-col cols="8" class="text-center">
                                                <v-img :src="'http://192.168.1.23:3000' + armor.img"></v-img>
                                            </v-col>
                                        </v-row>
                                        <v-divider color="grey"></v-divider>
                                        <v-row justify="center">
                                            <v-col cols="6" class="mt-4">
                                                <v-row justify="center">
                                                    <v-img :src="icon" max-height="20" max-width="20"></v-img>
                                                    <span class="font-weight-medium white--text">Dmg Negat</span>
                                                </v-row>
                                                <v-row justify="center">
                                                   <v-col cols="2">
                                                       <div class="divider-fade"></div>
                                                   </v-col>
                                                    <v-col cols="9">
                                                        <p v-for="(negat, index) in dmgNegat" :key="index" class="pa-0 ma-0" style="color: #856309">{{ negat.name }} <span class="white--text">{{ negat.amount }}</span></p>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                            <v-divider vertical color="grey" light class="mt-3 mb-3"></v-divider>
                                            <v-col cols="6" class="mt-4">
                                                <v-row justify="center">
                                                    <v-img :src="icon" max-height="20" max-width="20"></v-img>
                                                    <span class="font-weight-medium white--text">Resistance</span>
                                                </v-row>
                                                <v-row justify="center">
                                                    <v-col cols="2">
                                                        <div class="divider-fade"></div>
                                                    </v-col>
                                                    <v-col cols="9">
                                                        <p v-for="(resist, index) in resistance" :key="index" class="pa-0 ma-0" style="color: #856309">{{ resist.name }} <span class="white--text">{{ resist.amount }}</span></p>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-fade-transition>
        </v-row>
    </v-container>
</template>

<script>
import vuetify from "@/plugins/vuetify";

export default {
    name: "Armor",
    props: {
        itemName: {
            required: true
        },
    },
    data() {
        return {
            armor: undefined,
            icon: undefined,
            dmgNegat: undefined,
            resistance: undefined,
        }
    },
    methods: {
        async fetchArmor() {
            this.armor = await this.$store.dispatch('getPreciseItem', {name: this.itemName, path: 'armors'});
            if (await this.armor.category) this.icon = require('../assets/images/' + await this.armor.category.split(' ')[0].toLowerCase() + '.png')
            this.dmgNegat = await JSON.parse(this.armor.dmgNegat);
            this.resistance = await JSON.parse(this.armor.resistance);
            document.title = this.itemName.replaceAll('+', ' ');
        }
    },
    mounted() {
        console.log(this.itemName);
        this.fetchArmor()
        // console.log(this.armorName)
    }
}
</script>

<style scoped>
.breadcrumbs {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1rem;
}

.breadcrumbs-link {
    color: darkgoldenrod;
    text-decoration: none;
}

.breadcrumbs-separator {
    margin: 0 0.5rem;
    color: white;
}

.breadcrumbs-current {
    color: white;
    font-weight: bold;
}

.divider-fade {
    background: linear-gradient(to top, transparent, darkgoldenrod, transparent);
    height: 100%;
    width: 2px;
}
</style>