import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";

// validate with react-hook-form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "../../firebase/firebase-config";

import {
  FormControlCheckbox,
  FormControlInput,
} from "../../components/modules/Forms";
import { routes } from "../../configs";
import { setInfoUser } from "../../store/Auth/slice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const database = collection(db, "users");

  const isUser = useSelector((prev) => prev.auth.infoUser);

  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
    confirm_passwod: "",
  });

  const schema = yup.object({
    username: yup
      .string()
      .required("Trường này không được để trống")
      .min(6, "Họ và tên phải có tối thiểu 6 ký tự")
      .max(14, "Họ và tên không được vượt quá 14 kí tự"),
    email: yup.string().required("Trường này không được để trống"),
    // .email("Email phải có định dạng: @gmail.com"),
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
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChangeInput = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    // e.preventDefault();

    return new Promise(async (resolve) => {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          inputValue.email,
          inputValue.password
        );

        await addDoc(database, {
          uid: auth.currentUser.uid,
          displayName: inputValue.username,
          email: inputValue.email,
          password: inputValue.password,
          role: 0,
          createAt: serverTimestamp(),
        });
        await updateProfile(auth.currentUser, {
          displayName: inputValue.username,
        });
        dispatch(setInfoUser(user));
        const resolveAfter3Sec = new Promise((resolve) =>
          setTimeout(resolve, 3000)
        );
        // await axios.get(
        //   "https://api.themoviedb.org/3/authentication/token/new?api_key=9568cdb91fe0c79af33b87e59bb90d25&token_id=eyJhbGciOiJSUzI1NiIsImtpZCI6ImRjMzdkNTkzNjVjNjIyOGI4Y2NkYWNhNTM2MGFjMjRkMDQxNWMxZWEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiVMO0biBUaOG6pXQgSOG7mWkiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vd2ViLW1vdmllLTE2NjkwIiwiYXVkIjoid2ViLW1vdmllLTE2NjkwIiwiYXV0aF90aW1lIjoxNjY3ODk5MTM2LCJ1c2VyX2lkIjoiRXMzY1JaQXRKcVRxVkhwdEl6VktySmhFNmxRMiIsInN1YiI6IkVzM2NSWkF0SnFUcVZIcHRJelZLckpoRTZsUTIiLCJpYXQiOjE2Njc5MDI0OTQsImV4cCI6MTY2NzkwNjA5NCwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYWRtaW5AZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.HAnt4vsZOMKiNzJRsU0m3zpAITCNYVzn8TFtGXjXYV9gWhRmvCE7W_NBqPcG8c4-z1fVV3-lQ7huP8jfDiwAa7vPtgW4-3kymbY5lw8HHtdvet9f1WIjs6X0yCVrErOrMg1WjvqIatIfQlrzX7Z_gTLUm0qhdOS30rGd_6ihDQOojKoeeXiR0q1UWhIOrP2qiF4Sh7WIqRlpSVHziTzZbgGM-B702Np3bh7h2LK7B9_xAuU68-XuGevjQeb2Pr_FEhGEDeiIo9o1eAk1sUxhdt8iCFNP8BB-a945Ap80wm9kSG0nuvfkMvkWxX2fBW_sLNiM-Ltny9pSdRzYPvUQ7Q"
        // );

        toast.promise(resolveAfter3Sec, {
          pending: "loading",
          success: "register success 👌",
        });
        resolveAfter3Sec.then(() => {
          setTimeout(() => {
            navigate(`${routes.login}`);
          }, 2000);
        });
        // dispatch(setUserInfo(user));
      } catch (error) {
        const resolveAfter3Sec = new Promise((resolve, rejected) =>
          setTimeout(rejected, 3000)
        );
        toast.promise(resolveAfter3Sec, {
          pending: "loading",
          error: "register fail 🤯, information already exists !!",
        });
      }

      setTimeout(resolve, 3000);
    });
  };

  return (
    <>
      <ToastContainer position="top-center" theme="colored" />
      <div className="form-login min-h-[100vh] py-[32px] flex items-center justify-center text-[#fff]">
        <form
          action=""
          className="w-[400px] max-w-[calc(100%-16px)] rounded-xl overflow-hidden"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-wrapper px-[20px] py-[40px] bg-[#26252a]">
            <h1 className="block text-center text-[3.2rem] pb-[30px]">
              Sign Up
            </h1>

            <FormControlInput
              type={"text"}
              title={"Username"}
              name="username"
              {...register("username")}
              onChange={handleChangeInput}
              error={errors.username?.message}
            />
            <FormControlInput
              type={"text"}
              title={"Email"}
              name="email"
              {...register("email")}
              onChange={handleChangeInput}
              error={errors.email?.message}
            />
            <FormControlInput
              type={"password"}
              title={"Password"}
              name="password"
              {...register("password")}
              onChange={handleChangeInput}
              error={errors.password?.message}
            />
            <FormControlInput
              type={"password"}
              title={"Confirm_password"}
              name="confirm_password"
              {...register("confirm_password")}
              onChange={handleChangeInput}
              error={errors.confirm_password?.message}
            />

            <FormControlCheckbox title="Remember Me" />

            <button
              className={`w-full p-[10px] border border-[var(--color-text)] rounded-2xl mt-[25px] hover:bg-[#4f3907] transition-all tracking-widest ${
                isSubmitting ? "opacity-50 hover:bg-[transparent]" : ""
              }`}
              disabled={isSubmitting}
            >
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
    </>
  );
};

export default Register;
