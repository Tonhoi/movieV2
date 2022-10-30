const FormControlInput = ({ type, title, props }) => {
  return (
    <div className="form-control relative bg-transparent border border-[#1c1b20] mb-[40px]">
      <input
        type={type}
        className="form-input py-[18.5px] px-[14px]  bg-transparent w-full outline-none focus:outline-[#3f51b5]"
        placeholder=" "
        autoComplete="true"
        {...props}
      />
      <span className="form-title">{title}</span>
    </div>
  );
};

export default FormControlInput;