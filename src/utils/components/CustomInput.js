export default function CustomInput({ label, type, id, placeholder, name, validationSchema, register, errors }) {
  return (
    <div className="mb-4">
      <div className="form-floating ">
        <input type={type} id={id} className="form-control" placeholder={placeholder} {...register(name, validationSchema)} />
        <label htmlFor={id}>{label}</label>
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
