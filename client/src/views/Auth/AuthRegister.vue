<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex style="max-width: 500px">
                <v-form @submit.prevent="submit" autocomplete="off">
                    <v-card class="elevation-3">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Login</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>

                        <v-card-text>
                            <div class="errorMessage" v-if="errorMessage">
                                {{ errorMessage }}
                            </div>

                            <v-text-field name="firstName" v-model="firstName" label="First Name" type="text" autofocus></v-text-field>

                            <v-text-field name="lastName" v-model="lastName" label="Email address" type="text" autofocus></v-text-field>

                            <v-text-field
                                name="email"
                                v-model="email"
                                label="Email address"
                                type="text"
                                autocomplete="new-password"
                                autofocus
                            ></v-text-field>

                            <v-text-field
                                name="password"
                                v-model="password"
                                label="Password"
                                type="password"
                                autocomplete="new-password"
                            ></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn type="submit" color="primary">Register</v-btn>
                        </v-card-actions>

                        <div class="pa-4 text-center">
                            <div>
                                Have an account?
                                <router-link to="/login">Sign in</router-link>
                            </div>
                        </div>
                    </v-card>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({})
export default class extends Vue {
    private firstName: string = "";
    private lastName: string = "";
    private username: string = "";
    private password: string = "";
    private errorMessage: string = "";

    @Watch("username")
    public onUserNameChange() {
        this.errorMessage = "";
    }

    @Watch("password")
    public onPasswordChange() {
        this.errorMessage = "";
    }

    public submit() {

    }
}
</script>
