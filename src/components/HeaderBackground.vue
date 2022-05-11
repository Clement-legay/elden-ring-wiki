<template>
    <div>
        <div id="header" class="py-8 px-12">
            <div class="header_logo">
                <router-link to="/">
                    <v-img width="200" height="50" src="../assets/images/textLogo.png"></v-img>
                </router-link>
            </div>
            <div class="header_nav">
                <ul>
                    <v-menu bottom nudge-bottom="45" nudge-left="100" max-height="70" class="pa-0" origin="top center" :close-on-content-click="false" transition="scale-transition">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" icon>
                                <v-icon color="white">{{icon.magnify}}</v-icon>
                            </v-btn>
                        </template>
                        <v-card max-height="70" class="pa-0">
                            <v-card-text class="pa-0 px-3  ma-0">
                                <v-text-field prepend-icon="mdi-magnify" v-model="search" v-on:keyup.enter="searchIt(search)" label="Search"></v-text-field>
                            </v-card-text>
                        </v-card>
                    </v-menu>
                    <li v-for="(item, index) in navigation" :key="index" v-on:click="select(item.prop)" v-show="$vuetify.breakpoint.mdAndUp">{{item.name}}</li>
                    <v-menu origin="top center" bottom min-width="200px" rounded offset-x nudge-bottom="45" transition="scale-transition">
                        <template v-slot:activator="{ on }">
                            <v-btn class="ml-3 mr-2" small icon v-on="on">
                                <v-icon color="white">
                                    {{ icon.account }}
                                </v-icon>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-list-item-content class="justify-center">
                                <div class="mx-auto text-center" v-if="$store.getters.getUser !== undefined">
                                    <v-btn v-on:click="" depressed rounded text>
                                        Edit Account
                                    </v-btn>
                                    <v-divider class="my-3"></v-divider>
                                    <v-btn depressed rounded text v-on:click="$store.dispatch('disconnect')">
                                        Disconnect
                                    </v-btn>
                                </div>
                                <div class="mx-auto text-center" v-else>
                                    <v-btn depressed rounded text v-on:click="login = true">
                                        Connect
                                    </v-btn>
                                    <v-divider class="my-3"></v-divider>
                                    <v-btn depressed rounded text v-on:click="register = true">
                                        Create Account
                                    </v-btn>
                                </div>
                            </v-list-item-content>
                        </v-card>
                    </v-menu>
                    <v-menu transition="scale-transition" origin="top center" bottom nudge-bottom="45">
                        <template v-slot:activator="{ on, attrs }">
                            <li v-bind="attrs" v-on="on"><v-icon color="white">{{icon.more}}</v-icon></li>
                        </template>
                        <v-list v-if="$vuetify.breakpoint.mdAndUp">
                            <v-list-item v-for="(item, i) in items" :key="i">
                                <v-list-item-title v-on:click="select(item.prop)">{{ item.name }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                        <v-list v-else>
                            <v-list-item v-for="(item, i) in navigation.concat(items)" :key="i">
                                <v-list-item-title v-on:click="select(item.prop)">{{ item.name }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </ul>
            </div>
        </div>
        <div id="background"></div>
        <v-dialog v-model="login" persistent width="300">
            <v-card class="pa-1">
                <v-card-title class="text-button">
                    <v-spacer></v-spacer>
                    CONNECT
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    <v-form v-model="valid"  ref="login">
                        <v-text-field v-on:keyup.enter="tryLogin" v-model="userLogin.mail" :rules="rules.requiredInput" label="Email" required></v-text-field>
                        <v-text-field v-on:keyup.enter="tryLogin" @click:append="show = !show" :rules="rules.requiredInput" :type="show ? 'text' : 'password'" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" required v-model="userLogin.password" label="Password"></v-text-field>
                    </v-form>
                    <v-card v-if="errorL !== ''" color="red lighten-2">
                        <v-card-title class="pa-0">
                            <v-spacer></v-spacer>
                            <v-icon color="white">mdi-alert-circle</v-icon>
                            <span style="color: white; font-size: 15px">{{ errorL }}</span>
                            <v-spacer></v-spacer>
                        </v-card-title>
                    </v-card>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="red" text v-on:click="cancelLogin">Cancel</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text v-on:click="tryLogin">Login</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="register" persistent width="300">
            <v-card class="pa-1">
                <v-card-title class="text-button">
                    <v-spacer></v-spacer>
                    REGISTER
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    <v-form v-model="valid" lazy-validation ref="register">
                        <v-text-field v-on:keyup.enter="tryRegister" v-model="userRegister.mail" :rules="rules.mail" label="Email" required></v-text-field>
                        <v-text-field v-on:keyup.enter="tryRegister" @click:append="show = !show" :rules="rules.password" :type="show ? 'text' : 'password'" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" required v-model="userRegister.password" label="Password"></v-text-field>
                        <v-text-field v-on:keyup.enter="tryRegister" @click:append="show = !show" :rules="rules.password2" :type="show ? 'text' : 'password'" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" required v-model="userRegister.password2" label="Confirm Password"></v-text-field>
                    </v-form>
                    <v-card v-if="error !== ''" color="red lighten-2">
                        <v-card-title class="pa-0">
                            <v-spacer></v-spacer>
                            <v-icon color="white">mdi-alert-circle</v-icon>
                            <span style="color: white; font-size: 15px">{{ error }}</span>
                            <v-spacer></v-spacer>
                        </v-card-title>
                    </v-card>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="red" text v-on:click="cancelRegister">Cancel</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text v-on:click="tryRegister">Register</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mdiChevronDown, mdiMagnify, mdiAccount } from '@mdi/js';
import Vue from "vue";

export default {
    name: "background",
    data () {
        return {
            icon: {more: mdiChevronDown, magnify: mdiMagnify, account: mdiAccount},
            error: '',
            errorL: '',
            opened: false,
            search: '',
            items: [
                {
                    name: 'NPCs',
                    prop: 'npcs',
                },
                {
                    name: 'Mobs',
                    prop: 'mobs',
                },
                {
                    name: 'Weapons',
                    prop: 'weapons',
                },
                {
                    name: 'Spirits',
                    prop: 'spirits',
                },
                {
                    name: 'Ashes of War',
                    prop: 'ashes',
                },
                {
                    name: 'Shields',
                    prop: 'shields',
                },
                {
                    name: 'Incantations',
                    prop: 'incantations',
                },
            ],
            navigation: [
                {
                    name: "Sorceries",
                    prop: "sorceries"
                },
                {
                    name: "Talismans",
                    prop: "talismans"
                },
                {
                    name: "Armors",
                    prop: "armors"
                },
                {
                    name: "Bosses",
                    prop: "bosses"
                },
                {
                    name: "Items",
                    prop: "items"
                },
            ],
            valid: true,
            validR: true,
            userLogin: {
                mail: '',
                password: '',
            },
            userRegister: {
                mail: '',
                password: '',
                password2: '',
            },
            show: false,
            showR: false,
            login: false,
            register: false,
            rules: {
                mail: [
                    v => !!v || 'Email is required',
                    v => /^\S+@\S+\.\S+$/.test(v) || 'Email must be valid',
                ],
                password: [
                    v => !!v || 'Password is required',
                    v => (v && v.length >= 6) || 'Password must be more than 6 characters',
                    v => (v && /\d/.test(v)) || 'Password must contain at least one number',
                    v => (v && /[A-Z]/.test(v)) || 'Password must contain at least one capitalized letter'
                ],
                password2: [
                    v => !!v || 'Password is required',
                    v => (v === this.userRegister.password) || 'Passwords must match'
                ],
                requiredInput: [
                    v => !!v || 'This field is required',
                ],
            }
        }
    },
    methods: {
        select(item) {
            Vue.$cookies.set('selected', item);
            this.$store.dispatch('setSelected', item);
            if (this.$router.currentRoute.fullPath !== '/content') {
                this.$router.push('/content');
            }
        },
        async tryLogin() {
            if (this.$refs.login.validate()) {
                let result = await this.$store.dispatch('getLogin', this.userLogin);
                if (await result.status === 'error') {
                    this.errorL = await result.message;
                } else {
                    this.login = false;
                    await this.$store.dispatch('login', result.token);
                }
            }
        },
        cancelLogin() {
          this.errorL = '';
          this.login = false;
          this.userLogin.mail = '';
          this.userLogin.password = '';
          this.show = false;
          this.valid = true;
        },
        cancelRegister() {
          this.error = '';
          this.register = false;
          this.userRegister.mail = '';
          this.userRegister.password = '';
          this.userRegister.password2 = '';
          this.showR = false;
          this.validR = true;
        },
        async tryRegister() {
            if (this.$refs.register.validate()) {
                let result = await this.$store.dispatch('getRegister', this.userRegister);
                if (await result.status === 'error') {
                    this.error = await result.message;
                } else {
                    this.register = false;
                    this.login = true;
                }
            }
        },
        searchIt(search) {
            this.$store.dispatch('setOthers', search);
            this.$store.dispatch('setSelected', 'others');
            if (this.$router.currentRoute.fullPath !== '/content') {
                this.$router.push('/content');
            }
        }
    },
    mounted() {
        // if (this.$cookies.get('userToken') !== undefined) {
        //     //pass
        // } else {
        //     console.log('no token');
        // }
    }
}
</script>

<style scoped>
#background {
    position: fixed;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-image: url("../assets/images/background.jpg");
    background-position: center;
    background-color: black;
}
.test {
    top: -3px !important;
    box-shadow: none !important;
}

#header {
    width: 100%;
    height: 50px;
    left: 0;
    top: 0;
    background-color: #1a1a1a;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index: 10;
}
.header_logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    background-color: #1a1a1a;
}
.header_nav {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    background-color: #1a1a1a;
}
.header_nav ul {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    background-color: #1a1a1a;
}

.header_nav ul li {

    text-decoration: none;
    cursor: pointer;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    list-style: none;
    margin: 0 10px;
}
</style>