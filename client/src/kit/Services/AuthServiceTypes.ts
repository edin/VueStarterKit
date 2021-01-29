export interface IErrorResult {
    code: string;
    message: string
}

export interface IAuthUser {
    token: string
    displayName: string;
    email: string;
    profileImage: string;
}

export interface IVerifyAccountResult {
    error?: IErrorResult;
    user?: IAuthUser;
}

export interface IResetPasswordResult {
    error?: IErrorResult;
}

export interface IUpdatePasswordResult {
    error?: IErrorResult;
}

export interface ILoginResult {
    error?: IErrorResult;
}

export interface IAuthService {
    loginWithUsernameAndPassword(username: string, password: string): Promise<ILoginResult>;
    logout(): Promise<any>;
    resetPassword(username: string): Promise<IResetPasswordResult>;
    verifyAccount(verificationCode: string): Promise<IVerifyAccountResult>;
}
