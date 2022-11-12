import { forwardRef } from "react";

const FormControlInput = forwardRef(
  ({ type, title, onChange, error, ...props }, ref) => {
    return (
      <div className=" mb-[40px]">
        <div className="form-control relative bg-transparent border border-[#1c1b20] mb-[10px]">
          <input
            type={type}
            className="form-input py-[18.5px] px-[14px]  bg-transparent w-full outline-none focus:outline-[#3f51b5]"
            placeholder=" "
            autoComplete="off"
            onChange={onChange}
            ref={ref}
            {...props}
          />
          <span className="form-title">{title}</span>
        </div>
        <p className="text-[1.2rem] text-[#ef1d1d] italic">{error}</p>
      </div>
    );
  }
);

export default FormControlInput;
