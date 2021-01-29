import AuthLogin from './AuthLogin.vue';
import AuthRemind from './AuthRemind.vue';
import AuthRegister from './AuthRegister.vue';
import AuthResetPassword from './AuthResetPassword.vue';

export class AuthModule {
    public static getRoutes() {
        return [
            {
                path: "/login",
                name: "Login",
                component: AuthLogin,
            },
            {
                path: "/remind",
                name: "Remind",
                component: AuthRemind,
            },
            {
                path: "/register",
                name: "Register",
                component: AuthRegister,
            },
            {
                path: "/reset-password",
                name: "ResetPassword",
                component: AuthResetPassword,
            },
        ];
    }
}