import React, { useState } from "react";

export default function PasswordInput({ label, passwordValue, id, placeholder, name, validationSchema, register, errors }) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      <div className="form-floating position-relative">
        <input type={showPassword ? "text" : "password"} id={id} placeholder={placeholder} {...register(name, validationSchema)} className="form-control position-relative" />
        {passwordValue && <i className={`position-absolute z-3 top-0 end-0 m-3 bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`} onClick={togglePasswordVisibility} style={{ cursor: "pointer", fontSize: "20px" }}></i>}
        <label htmlFor="floatingPassword">{label}</label>
      </div>
      {errors ? (
        <span role="alert" className="text-danger">
          {errors.message}
        </span>
      ) : (
        <span>&nbsp;</span>
      )}
    </div>
  );
}
