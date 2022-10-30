import React from "react";
import { Link } from "react-router-dom";
import {
  FormControlInput,
  FormControlCheckbox,
} from "../../components/modules/Forms";
import { routes } from "../../configs";

import "../../components/modules/Forms/Login.scss";
const Login = () => {
  return (
    <div className="form-login min-h-[100vh] py-[35px] flex items-center justify-center text-[var(--white-color)]">
      <form
        action=""
        className="w-[400px] max-w-[calc(100%-16px)] rounded-xl overflow-hidden"
      >
        <div className="form-wrapper px-[20px] py-[40px] bg-[#26252a]">
          <h1 className="block text-center text-[3.2rem] pb-[30px]">Sign In</h1>

          <FormControlInput type={"text"} title={"Email"} />
          <FormControlInput type={"password"} title={"Password"} />

          <FormControlCheckbox title="Remember Me" />

          <button className=" w-full p-[10px] border border-[#f9ab00] rounded-2xl mt-[25px] hover:bg-[#4f3907] transition-all tracking-widest">
            LOGIN
          </button>

          <div className="flex items-center gap-3 mt-[20px]">
            <span>Don't have an account?</span>
            <Link to={routes.register} className="text-[#f9ab00]">
              Sign Up
            </Link>
          </div>
          <Link
            to={routes.home}
            className="inline-block px-[16px] py-[6px] bg-[#3f51b5] rounded-3xl mt-[20px] relative left-[50%] -translate-x-[50%]"
          >
            BACK HOME
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
