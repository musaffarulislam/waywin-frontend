export interface ITrainerState {
    isLoading: boolean;
    isLoadingImage: boolean;
    isLoadingBanner: boolean;
    isProfile: boolean,
    trainerInfo: any;
    fee: any;
    profileInfo: any;
    profileImage: string | null | undefined;
    bannerImage: string | null | undefined;
    tags: any;
    availabeDates: any;
    bookings: any;
    chats: any;
}


export interface ITrainerInfo {
    username: string;
    email: string;
    phoneNumber: string;
    // Add any other properties you expect in the `trainerInfo` object
  }

export interface ITrainerFee {
    consultingFee: number;
    trainingFee: number;
  }


  export interface IProfile {
    services: string[];
    description: string | undefined;
    tags: string[];
    experience: number;
    mode: string[];
  }

  export interface IBooking {
    service: string[];
    mode: string[];
    fee: number | string;
    date: Date | undefined;
    time: Date | undefined;
  }

  export interface IDate {
    date: Date;
    time: Date;
  }