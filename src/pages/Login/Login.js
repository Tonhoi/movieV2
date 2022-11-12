import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";

// toast message
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FormControlInput,
  FormControlCheckbox,
} from "../../components/modules/Forms";
import { routes } from "../../configs";

import "../../components/modules/Forms/Login.scss";
import axios from "axios";
import { createSession } from "../../store/CreateSession/slice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "hoi@gmail.com",
    password: "asdasd",
  });

  const isUser = useSelector((prev) => prev.auth.infoUser);

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
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleChangeInput = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    return new Promise(async (resolve) => {
      try {
        await signInWithEmailAndPassword(
          auth,
          inputValue.email,
          inputValue.password
        );

        const requestToken = await dispatch(createSession(auth));
        // window.location.href = `https://www.themoviedb.org/authenticate/${requestToken.payload}?redirect_to=http://localhost:3000/`;
        const res2 = await axios.post(
          `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=9568cdb91fe0c79af33b87e59bb90d25&username=tonthathoi&password=tonthathoi&request_token=${requestToken.payload}`
        );

        console.log(res2);
        const res3 = await axios.post(
          `https://api.themoviedb.org/3/authentication/session/new?api_key=9568cdb91fe0c79af33b87e59bb90d25&request_token=${res2.data.request_token}`
        );
        const resolveAfter3Sec = new Promise((resolve) =>
          setTimeout(resolve, 3000)
        );

        toast.promise(resolveAfter3Sec, {
          pending: "loading",
          success: "login success 👌",
        });
        resolveAfter3Sec.then(() => {
          setTimeout(() => {
            localStorage.setItem("session_id", res3.data.session_id);
            navigate(`${routes.home}`);
          }, 2000);
        });
      } catch (e) {
        const resolveAfter3Sec = new Promise((resolve, rejected) =>
          setTimeout(rejected, 3000)
        );
        toast.promise(resolveAfter3Sec, {
          pending: "loading",
          error: "login fails 🤯, please recheck the information!!",
        });
      }
      setTimeout(resolve, 3000);
    });
  };
  return (
    <>
      <ToastContainer position="top-center" theme="colored" />
      {/* {isUser ? (
        navigate(`${routes.home}`)
      ) : (
      )} */}
      <div className="form-login min-h-[100vh] py-[35px] flex items-center justify-center text-[#fff]">
        <form
          action=""
          className="w-[400px] max-w-[calc(100%-16px)] rounded-xl overflow-hidden"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-wrapper px-[20px] py-[40px] bg-[#26252a]">
            <h1 className="block text-center text-[3.2rem] pb-[30px]">
              Sign In
            </h1>

            <FormControlInput
              type={"text"}
              title={"Email"}
              name="email"
              value={"hoi@gmail.com"}
              error={errors.email?.message}
              {...register("email")}
              onChange={handleChangeInput}
            />
            <FormControlInput
              type={"password"}
              title={"Password"}
              name="password"
              value={"asdasd"}
              error={errors.password?.message}
              {...register("password")}
              onChange={handleChangeInput}
            />

            <FormControlCheckbox title="Remember Me" />

            <button
              className={`w-full p-[10px] border border-[var(--color-text)] rounded-2xl mt-[25px] hover:bg-[#4f3907] transition-all tracking-widest ${
                isSubmitting ? "opacity-50 hover:bg-[transparent]" : ""
              }`}
              disabled={isSubmitting}
            >
              LOGIN
            </button>

            <div className="flex items-center gap-3 mt-[20px]">
              <span>Don't have an account?</span>
              {/* <Link to={routes.register} className="text-[var(--color-text)]">
                Sign Up
              </Link> */}
              <a
                href="https://www.themoviedb.org/signup"
                className="text-[var(--color-text)]"
              >
                Sign Up
              </a>
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
    </>
  );
};

export default Login;
