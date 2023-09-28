export const validationSchema = {
  firstname: {
    required: "first name is required!",
    minLength: { value: 4, message: "at least 4 characters long!" },
    maxLength: { value: 15, message: "cannot exceed 15 characters!" },
  },
  lastname: {
    required: "last name is required!",
    minLength: { value: 4, message: "at least 4 characters long!" },
    maxLength: { value: 15, message: "cannot exceed 15 characters!" },
  },
  email: {
    required: "email is required!",
    pattern: { value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, message: "invalid email address!" },
  },
  password: {
    required: "password is required!",
    pattern: {
      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
      message: `at least 8 characters,
                1 uppercase letter, 1 lowercase letter, and 1 number
                and can contain special characters`,
    },
    maxLength: { value: 20, message: "cannot exceed 20 characters!" },
  },
};
