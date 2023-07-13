declare module "*.png"
declare module "*.jpg"
declare module "*.avif"
declare global {
    interface Window {
      Razorpay: any;
    }
}