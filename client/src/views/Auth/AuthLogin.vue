<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex style="max-width: 500px">
                <v-form @submit.prevent="submit">
                    <v-card class="elevation-3">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Login</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>

                        <v-card-text>
                            <v-alert v-if="errorMessage" color="red" type="error" dense>{{ errorMessage }}</v-alert>

                            <v-text-field
                                name="username"
                                v-model="username"
                                prepend-icon="person"
                                label="Email address"
                                type="text"
                                autofocus
                            ></v-text-field>
                            <v-text-field
                                name="password"
                                v-model="password"
                                prepend-icon="lock"
                                label="Password"
                                type="password"
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

    public async submit() {
        try {
            const result = await this.$app.auth.loginWithUsernameAndPassword(
                this.username,
                this.password
            );

            if (result == null) {
                this.errorMessage = "Invalid user name or password";
            }
        } catch (error) {
            this.$app.logger.debug(error);
        }
    }
}
</script>
