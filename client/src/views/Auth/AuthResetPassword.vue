<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex style="max-width: 500px">
                <v-form @submit.prevent="submit">
                    <v-card class="elevation-3">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Reset Password</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>

                        <v-card-text>
                            <div class="errorMessage" v-if="errorMessage">
                                {{ errorMessage }}
                            </div>

                            <v-text-field
                                name="username"
                                v-model="password"
                                prepend-icon="person"
                                label="Password"
                                type="password"
                                autocomplete="new-password"
                            ></v-text-field>
                            <v-text-field
                                name="password"
                                v-model="retypePassword"
                                prepend-icon="lock"
                                label="Retype Password"
                                type="password"
                                autocomplete="new-password"
                            ></v-text-field>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn type="submit" color="primary">Login</v-btn>
                        </v-card-actions>

                        <div class="pa-4 text-center">
                            <div>
                                Don't have an account?
                                <router-link to="/register">Sign up</router-link>
                            </div>
                            <div class="pt-4">
                                <router-link to="/remind">Forgot your password?</router-link>
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
    private password: string = "";
    private retypePassword: string = "";
    private errorMessage: string = "";

    @Watch("username")
    public onUserNameChange() {
        this.errorMessage = "";
    }

    @Watch("password")
    public onPasswordChange() {
        this.errorMessage = "";
    }

    public submit() { }
}
</script>
