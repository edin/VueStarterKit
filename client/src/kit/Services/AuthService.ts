export interface IAuthService {
    loginWithUsernameAndPassword(username: string, password: string): Promise<any>;
    logout(): Promise<any>;
    resetPassword(username: string): Promise<any>;
    verifyAccount(verificationCode: string): Promise<any>;
}
