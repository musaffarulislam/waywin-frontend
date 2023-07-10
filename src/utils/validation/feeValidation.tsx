import * as yup from "yup";

export default yup.object({
  consultingFee: yup
    .number()
    .required("Consulting fee is required.")
    .min(100, "Consulting fee cannot be below 100"),
  trainingFee: yup
    .number()
    .required("Training fee is required.")
    .min(500, "Training fee cannot be below 500"),
}).required();