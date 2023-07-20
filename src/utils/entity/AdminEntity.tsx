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

export interface IAdminState {
    isLoading: boolean;
    users: string[] | null | undefined;
    trainers: string[] | null | undefined;
    tags: string[] | null | undefined;
    bookings: string[] | null | undefined;
    chartData: {
      labels: string[];          // Array of labels for the x-axis
      datasets: {
        label: string;           // Label for the dataset
        data: number[];          // Numeric data points for the chart
        backgroundColor: string; // Color of the bar (can be a string or an array of strings for multiple bars)
        // Add more dataset-specific options here if needed
      }[];
    } | null | undefined;
}