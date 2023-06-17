import * as yup from "yup";

export default yup.object({
    username: yup
      .string()
      .required("Username is required.")
      .matches(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and dashes.")
      .min(6, "Username must be at least 6 characters long"),
    email: yup
      .string()
      .required("Email is required.")
      .email("Invalid email format."),
    phoneNumber: yup
      .string()
      .required("Phone number is required.")
      .matches(
        /^[0-9]{10}$/,
        "Phone number must be a 10-digit number without any special characters."
      ),
    password: yup
      .string()
      .required("Password is required.")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z\d@$!%*#?&]+$/,
        "Password must be at least 6 characters long and include a letter, a number, and a special character."
      )
      .min(6, "Password must be at least 6 characters long"),
    // confirmPassword: yup
    //   .string()
    //   .oneOf([yup.ref("password")], "Passwords must match.")
    //   .required("Confirm password is required."),
  }).required();