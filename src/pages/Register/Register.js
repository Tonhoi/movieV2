import React from "react";
import { Link } from "react-router-dom";
import {
  FormControlCheckbox,
  FormControlInput,
} from "../../components/modules/Forms";
import { routes } from "../../configs";

const Register = () => {
  return (
    <div className="form-login min-h-[100vh] py-[32px] flex items-center justify-center text-[var(--white-color)]">
      <form
        action=""
        className="w-[400px] max-w-[calc(100%-16px)] rounded-xl overflow-hidden"
      >
        <div className="form-wrapper px-[20px] py-[40px] bg-[#26252a]">
          <h1 className="block text-center text-[3.2rem] pb-[30px]">Sign Up</h1>

          <FormControlInput type={"text"} title={"Email"} />
          <FormControlInput type={"text"} title={"Username"} />
          <FormControlInput type={"password"} title={"Password"} />
          <FormControlInput type={"password"} title={"Confirm_password"} />

          <FormControlCheckbox title="Remember Me" />

          <button className=" w-full p-[10px] border border-[#f9ab00] rounded-2xl mt-[25px] hover:bg-[#4f3907] transition-all tracking-widest">
            Register
          </button>

          <div className="flex items-center gap-3 mt-[20px]">
            <span>Don't have an account?</span>
            <Link to={routes.login} className="text-[#f9ab00]">
              Sign In
            </Link>
          </div>
          <Link
            to={routes.login}
            className="inline-block px-[16px] py-[6px] bg-[#3f51b5] rounded-3xl mt-[20px] relative left-[50%] -translate-x-[50%]"
          >
            GO BACK
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
