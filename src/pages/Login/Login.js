import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  FormControlInput,
  FormControlCheckbox,
} from "../../components/modules/Forms";
import { routes } from "../../configs";

import "../../components/modules/Forms/Login.scss";
const Login = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const schema = yup.object({
    email: yup
      .string()
      .required("Trường này không được để trống")
      .email("Email phải có định dạng: @gmail.com"),
    password: yup
      .string()
      .required("Trường này không được để trống")
      .max(20, "Mật khẩu quá dài")
      .min(6, "Mật khẩu phải có tối thiểu 6 ký tự"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChangeInput = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.id]: e.target.value,
    });
  };
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="form-login min-h-[100vh] py-[35px] flex items-center justify-center text-[var(--white-color)]">
      <form
        action=""
        className="w-[400px] max-w-[calc(100%-16px)] rounded-xl overflow-hidden"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-wrapper px-[20px] py-[40px] bg-[#26252a]">
          <h1 className="block text-center text-[3.2rem] pb-[30px]">Sign In</h1>

          <FormControlInput
            type={"text"}
            title={"Email"}
            error={errors.email?.message}
            {...register("email")}
            onChange={handleChangeInput}
          />
          <FormControlInput
            type={"password"}
            title={"Password"}
            register={"password"}
            error={errors.password?.message}
            {...register("password")}
            onChange={handleChangeInput}
          />

          <FormControlCheckbox title="Remember Me" />

          <button className=" w-full p-[10px] border border-[var(--color-text)] rounded-2xl mt-[25px] hover:bg-[#4f3907] transition-all tracking-widest">
            LOGIN
          </button>

          <div className="flex items-center gap-3 mt-[20px]">
            <span>Don't have an account?</span>
            <Link to={routes.register} className="text-[var(--color-text)]">
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
