<template>
    <v-container class="pt-8">
        <v-row justify="center">
            <v-fade-transition>
                <v-col cols="12" md="11" xl="8" v-if="item !== undefined">
                    <v-card class="mx-auto" color="rgba(0, 0, 0, 0.87)">
                        <v-row class="ml-4 pt-3 ml-md-0 pt-md-0">
                            <h1 class="headline font-weight-medium white--text">{{ item.name }} | Elden Ring</h1>
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
                                <p class="breadcrumbs-current ma-0 pa-0">{{ item.name }}</p>
                            </div>
                        </v-row>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="8" order="2" order-md="1">
                                    <p class="white--text">{{ item.desc }}</p>
                                </v-col>
                                <v-col cols="12" md="4" order="1" order-md="2">
                                    <div class="pa-auto" style="border: 1px solid darkgoldenrod; border-radius: 5px; background: black">
                                        <v-row justify="center" align="center" style="height: 120px">
                                            <v-col cols="8" class="text-center">
                                                <span class="headline font-weight-medium white--text">{{ item.name }}</span>
                                            </v-col>
                                        </v-row>
                                        <v-divider color="grey"></v-divider>
                                        <v-row justify="center" align="center">
                                            <v-col cols="12" class="text-center">
                                                <v-img :src="'http://192.168.1.23:3000' + item.img"></v-img>
                                            </v-col>
                                        </v-row>
                                        <v-divider color="grey"></v-divider>
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
    name: "Bosses",
    props: {
        itemName: {
            required: true
        },
    },
    data() {
        return {
            item: undefined,
        }
    },
    methods: {
        async fetchItem() {
            console.log(this.itemName);
            this.item = await this.$store.dispatch('getPreciseItem', {name: this.itemName, path: 'bosses'});
            document.title = this.itemName.replaceAll('+', ' ');
        }
    },
    mounted() {
        this.fetchItem()
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