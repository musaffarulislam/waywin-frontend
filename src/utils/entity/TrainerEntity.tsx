export interface ITrainerState {
    isLoading: boolean;
    isProfile: boolean,
    trainerInfo: any;
    profileInfo: any;
    profileImage: string | null | undefined;
    tags: any
}


export interface ITrainerInfo {
    username: string;
    email: string;
    phoneNumber: string;
    // Add any other properties you expect in the `trainerInfo` object
  }


  export interface IProfile {
    services: string[];
    description: string | undefined;
    tags: string[];
    experience: number;
  }