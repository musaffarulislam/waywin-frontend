export interface IAuth {
    username: string;
    email: string;
    phoneNumber: string;
    role: string;
    password: string;
  }


export interface ILogin {
    email: string;
    password: string;
  }

export interface IAuthState {
    isLoading: boolean;
    auth: IAuth | null | undefined;
    role: string | null | undefined;
    accessToken: string | null | undefined;
    refreshToken: string | null | undefined;
    accessTokenAdmin: string | null | undefined;
    refreshTokenAdmin: string | null | undefined;
    confirmObj: string | null | undefined;
}