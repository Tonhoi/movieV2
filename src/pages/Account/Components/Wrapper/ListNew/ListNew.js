import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useState } from "react";

import Wrapper from "../Wrapper";

const ListNew = () => {
  const navigate = useNavigate();
  const [valueInput, setValueInput] = useState({
    name: "",
    description: "",
  });

  const currentUser = useSelector((prev) => prev.auth.infoUser);

  const handleGetValueInput = (e) => {
    setValueInput({
      ...valueInput,
      [e.target.name]: e.target.value,
    });
  };

  const handlleCreateList = async (e) => {
    const createNewList = await axios({
      method: "post",
      url: `https://api.themoviedb.org/3/list?api_key=9568cdb91fe0c79af33b87e59bb90d25&session_id=${localStorage.getItem(
        "session_id"
      )}`,
      data: {
        description: valueInput.description,
        name: valueInput.name,
      },
    });
    // console.log(createNewList);
    toast.success("Create list successfull!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    navigate(
      `/account/${currentUser?.displayName}/${createNewList.data.list_id}/edit`
    );
  };

  return (
    <>
      <ToastContainer />

      <Wrapper>
        <div className="md:ml-[30px] flex flex-col gap-[30px]">
          <div className="w-[100%] rounded-[4px] border border-solid border-[#c4c4c4]">
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="py-[18.5px] px-[14px] block w-full"
              onChange={handleGetValueInput}
              value={valueInput.name}
              required=""
            />
          </div>
          <div className="w-[100%] rounded-[4px] border border-solid border-[#c4c4c4]">
            <textarea
              name="description"
              id=""
              cols="30"
              rows="10"
              className="w-full py-[18.5px] px-[14px]"
              placeholder="Description"
              onChange={handleGetValueInput}
              value={valueInput.description}
              required=""
            ></textarea>
          </div>
          <button
            className="text-left bg-[#01b4e4] py-[6px] px-[16px] w-[fit-content] text-[#fff] rounded-[6px] hover:animate-pulse"
            style={{
              boxShadow:
                "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
            }}
            onClick={handlleCreateList}
          >
            CONTINUE
          </button>
        </div>
      </Wrapper>
    </>
  );
};

export default ListNew;
