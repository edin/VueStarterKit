import { ILogger, Logger } from "../Logger/Logger";
import { RestClient } from "../Rest/RestClient";
import { IAuthService, IAuthUser, ILoginResult, IResetPasswordResult, IUpdatePasswordResult, IVerifyAccountResult } from "./AuthServiceTypes";

export class AuthService implements IAuthService
{
    static AuthInfoKey: string = "AuthInfo"
    private storage: Storage;
    private logger = Logger.getLogger("AuthService");

    constructor(private client: RestClient) {
        this.storage = window.localStorage;
    }

    async getCurrentUser(): Promise<IAuthUser|null> {
        let result = this.storage.getItem(AuthService.AuthInfoKey);
        if (result) {
            try{
                const user = JSON.parse(result);
                let {token, displayName } = user;
                if (typeof token === "string" && typeof displayName === "string") {
                    return user;
                }
            } catch (e) {
                this.logger.debug("getCurrentUser",  e);
            }
        }
        return null;
    }

    async logout(): Promise<any> {
        this.storage.removeItem(AuthService.AuthInfoKey);
        return null;
    }

    async loginWithUsernameAndPassword(username: string, password: string): Promise<ILoginResult> {
        const result = await this.client.post("auth/login", {username, password});
        return result.data as ILoginResult;
    }

    async verifyAuthInfo(auth: IAuthUser|null = null): Promise<boolean> {
        let authInfo = auth;

        if (authInfo == null) {
            authInfo = await this.getCurrentUser();
        }

        if (authInfo) {
            const result = await this.client.post("auth/verify-auth", {token: authInfo.token});
            if (result.ok) {
                return true;
            }
        }
        return false;
    }

    async resetPassword(username: string): Promise<IResetPasswordResult> {
        const result = await this.client.post("auth/reset-password", {username});
        return result.data as IResetPasswordResult;
    }

    async updatePassword(resetPasswordCode: string, password: string): Promise<IUpdatePasswordResult> {
        const result = await this.client.post("auth/update-password", {
            resetPasswordCode,
            password
        });
        return result.data as IUpdatePasswordResult;
    }

    async verifyAccount(verificationCode: string): Promise<IVerifyAccountResult> {
        const result = await this.client.post("auth/verify-account", {verificationCode});
        return result.data as IVerifyAccountResult;
    }
}
