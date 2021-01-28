<template>
    <v-app id="inspire">
        <v-system-bar app color="blue" dark>
            <span>Application</span>
            <v-spacer></v-spacer>
        </v-system-bar>

        <v-app-bar app>
            <v-toolbar-title>Application</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
export default {
    data: () => ({
        drawer: null,
        links: [
            ["mdi-inbox-arrow-down", "Inbox", "/"],
            ["mdi-send", "Send", "/about" ],
            ["mdi-delete", "Trash", "/trash"],
            ["mdi-alert-octagon", "Spam", "/spam"],
        ],
    }),
};
</script>
