<template>
    <v-app id="inspire">
        <v-system-bar app color="blue" dark>
            <span>Application</span>
            <v-spacer></v-spacer>
        </v-system-bar>

        <v-app-bar app>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Application</v-toolbar-title>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" app>
            <v-sheet color="grey lighten-4" class="pa-2">
                <b>John Vuetify</b>
                <br />
                <div>john@vuetifyjs.com</div>
            </v-sheet>

            <v-divider></v-divider>

            <!-- <router-link to="/">Home</router-link>|
            <router-link to="/about">About</router-link> -->

            <v-list>
                <v-list-item v-for="[icon, text, url] in links" :key="icon" link :to="url">
                    <v-list-item-icon>
                        <v-icon>{{ icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
export default {
    data: () => ({
        cards: ["Today", "Yesterday"],
        drawer: null,
        links: [
            ["mdi-inbox-arrow-down", "Inbox", "/"],
            ["mdi-send", "Send", "/about"],
            ["mdi-delete", "Trash", "/trash"],
            ["mdi-alert-octagon", "Spam", "/spam"],
            ["mdi-alert-octagon", "Login", "/login"],
        ],
    }),
};
</script>
