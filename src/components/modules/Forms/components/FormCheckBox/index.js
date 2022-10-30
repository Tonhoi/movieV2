const FormControlCheckbox = ({ title, className, props }) => {
  return (
    <div className="flex items-center gap-3 relative">
      <input
        type="checkbox"
        className="opacity-0 cursor-pointer h-0 w-0"
        {...props}
      />
      <span
        className={`checkmark  h-[20px] w-[20px] bg-transparent border-2 border-[rgb(249,171,0)] rounded-sm cursor-pointer ${className}`}
      ></span>
      <span className="">{title}</span>
    </div>
  );
};

export default FormControlCheckbox;
