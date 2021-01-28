<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex style="max-width: 500px">
                <v-form @submit.prevent="remind">
                    <v-card class="elevation-3">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Reset password</v-toolbar-title>
                        </v-toolbar>

                        <v-card-text>
                            <div class="errorMessage" v-if="errorMessage">
                                {{ errorMessage }}
                            </div>

                            <v-text-field
                                name="username"
                                v-model="username"
                                prepend-icon="person"
                                label="Email address"
                                type="text"
                                autofocus
                            ></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn type="submit" color="primary">Reset</v-btn>
                        </v-card-actions>

                        <div class="pa-4 text-center">
                            <div>Have an account? <router-link to="/login">Sign in</router-link></div>
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
    private errorMessage: string = "";

    @Watch("username")
    public onUserNameChange() {
        this.errorMessage = "";
    }

    public remind() {

    }
}
</script>
