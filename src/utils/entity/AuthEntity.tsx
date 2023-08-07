export interface IAuth {
    _id?: string;
    username: string;
    email: string;
    phoneNumber: string;
    role: string;
    password?: string;
  }

  export interface IFee {
    consultingFee: number;
    trainingFee: number;
  }


export interface ILogin {
    email: string;
    password: string;
  }

export interface IAuthState {
    isLoading: boolean;
    auth: IAuth | null | undefined;
    role: string | null | undefined; 
    confirmObj: string | null | undefined;
}