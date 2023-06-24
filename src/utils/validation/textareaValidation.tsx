import * as yup from "yup";

export default yup
    .string()
    .required("Description is required.")
    .min(10, "Description must be at least 10 characters long.")
    .max(250, "Description can be maximum 250 characters long.")
