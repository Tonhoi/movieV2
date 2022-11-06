import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  FormControlCheckbox,
  FormControlInput,
} from "../../components/modules/Forms";
import { routes } from "../../configs";

const Register = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const schema = yup.object({
    username: yup
      .string()
      .required("Trường này không được để trống")
      .min(6, "Họ và tên phải có tối thiểu 6 ký tự")
      .max(14, "Họ và tên không được vượt quá 14 kí tự"),
    email: yup
      .string()
      .required("Trường này không được để trống")
      .email("Email phải có định dạng: @gmail.com"),
    password: yup
      .string()
      .required("Trường này không được để trống")
      .max(20, "Mật khẩu quá dài")
      .min(6, "Mật khẩu phải có tối thiểu 6 ký tự")
      .oneOf([yup.ref("confirm_password")], "2 mật khẩu không trùng nhau"),
    confirm_password: yup
      .string()
      .required("Trường này không được để trống")
      .max(20, "Mật khẩu quá dài")
      .min(6, "Mật khẩu phải có tối thiểu 6 ký tự")
      .oneOf([yup.ref("password")], "2 mật khẩu không trùng nhau"),
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
    <div className="form-login min-h-[100vh] py-[32px] flex items-center justify-center text-[var(--white-color)]">
      <form
        action=""
        className="w-[400px] max-w-[calc(100%-16px)] rounded-xl overflow-hidden"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-wrapper px-[20px] py-[40px] bg-[#26252a]">
          <h1 className="block text-center text-[3.2rem] pb-[30px]">Sign Up</h1>

          <FormControlInput
            type={"text"}
            title={"Username"}
            {...register("username")}
            onChange={handleChangeInput}
            error={errors.username?.message}
          />
          <FormControlInput
            type={"text"}
            title={"Email"}
            {...register("email")}
            onChange={handleChangeInput}
            error={errors.email?.message}
          />
          <FormControlInput
            type={"password"}
            title={"Password"}
            {...register("password")}
            onChange={handleChangeInput}
            error={errors.password?.message}
          />
          <FormControlInput
            type={"password"}
            title={"Confirm_password"}
            {...register("confirm_password")}
            onChange={handleChangeInput}
            error={errors.confirm_password?.message}
          />

          <FormControlCheckbox title="Remember Me" />

          <button className=" w-full p-[10px] border border-[var(--color-text)] rounded-2xl mt-[25px] hover:bg-[#4f3907] transition-all tracking-widest">
            Register
          </button>

          <div className="flex items-center gap-3 mt-[20px]">
            <span>Don't have an account?</span>
            <Link to={routes.login} className="text-[var(--color-text)]">
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
