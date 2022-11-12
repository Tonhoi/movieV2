import React, { useEffect, useState } from "react";
import { memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  addDoc,
  deleteDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../../firebase/firebase-config";

import {
  LikeIcon,
  PlayIcon,
  UnLikeIcon,
} from "../../../../components/common/Icons";
import { routes } from "../../../../configs";

const Comment = () => {
  const isUser = useSelector((prev) => prev.auth.infoUser);
  const [posts, setPosts] = useState([]);

  const [valueInput, setValueInput] = useState({
    mainValueInput: "",
    subValueInput: "",
  });
  const detailMovie = useSelector(
    (prev) => prev.callDetailMovie.callDetailMovie
  );

  const [isSubInput, setIsSubInput] = useState(false);
  const [isSubComment, setIsSubComment] = useState(false);

  const currentUser = useSelector((prev) => prev.auth.infoUser);

  const database = collection(db, "comments");

  // console.log(currentUser);
  // console.log(posts);

  useEffect(() => {
    onSnapshot(database, (snapshot) => {
      let comments = [];
      snapshot.docs.forEach((doc) => {
        comments.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(comments);
    });
  }, []);

  const handleChangeInput = (e) => {
    setValueInput({
      ...valueInput,
      [e.target.name]: e.target.value,
    });
  };

  // tạo comments
  const handleSubmit = async (e) => {
    e.preventDefault();
    let id = "";
    console.log(await posts);
    // console.log(a);
    // onSnapshot(database, (snapshot) => {
    //    id = snapshot.docs[snapshot.docs.length - 1].id;

    //   count++;
    // });
    // console.log(posts);
    await addDoc(database, {
      username: currentUser.displayName,
      uid: currentUser.uid,
      content: valueInput.mainValueInput,
      like_count: 0,
      // id: snapshot.docs[snapshot.docs.length - 1].id,
      id: posts[posts.length - 1].id,
      createAt: serverTimestamp(),
    }).then(setValueInput(""));
  };

  // xóa comments
  const handleDeleteComment = async (id) => {
    const commentDelete = doc(db, "comments", id);
    await deleteDoc(commentDelete);
  };

  const handleOpenSubInput = (e) => {
    setIsSubInput(true);
  };
  const handleCloseSubInput = (e) => {
    setIsSubInput(false);
  };

  return (
    <form onSubmit={handleSubmit} className="comments">
      <span className="block mb-[20px]">Comments {posts?.length}</span>
      <div className="flex items-start gap-[12px]">
        <img
          src="https://phimmoizzz.netlify.app/user-non-avatar.png"
          alt=""
          className="w-[40px] h-[40px] rounded-full object-cover"
        />

        {/* chưa đăng nhập */}
        {!isUser && (
          <div className="text-[1.4rem] py-[10px] px-[16px] bg-[#333] flex-1 rounded-[10px] text-[#fff]">
            <span>
              You need{" "}
              <Link to={routes.login} className="text-[#3498db]">
                login
              </Link>{" "}
              to comment
            </span>
          </div>
        )}

        {/* đã đăng nhập */}
        {isUser && (
          <div className="w-full">
            <input
              type="text"
              placeholder="Comment here"
              className="bg-[transparent] outline-none  w-full px-[12px] pb-[8px] border-b border-solid border-b-[var(--white-color)] text-[1.4rem]"
              onChange={handleChangeInput}
              value={valueInput.mainValueInput}
              name="mainValueInput"
            />
            <div
              className={` items-center justify-end gap-[20px] mt-[12px] ${
                !!valueInput ? "flex" : "hidden"
              }`}
            >
              <button className="py-[8px] px-[16px] rounded-[24px]">
                cancel
              </button>
              <button className="py-[8px] px-[16px] rounded-[24px] bg-[#f2f2f2] text-[#000]">
                comment
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-[40px]">
        <div className="mb-[20px]">
          {posts?.length > 0 &&
            posts.map((post, index) => (
              <div className="flex" key={index}>
                <div className="w-[56px] h-[43px]">
                  <img
                    src="https://phimmoizzz.netlify.app/user-non-avatar.png"
                    alt=""
                    className="w-[40px] h-[40px] rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="inline-block text-[1.3rem] text-[var(--white-color)]">
                      {post.username}
                    </span>
                    <span className="inline-block ml-[8px] text-[1.2rem] text-[#606060]">
                      4 tháng trước
                    </span>
                  </div>
                  <span className="block text-[1.4rem] text-[var(--white-color)] mt-[2px]">
                    {post.content}
                  </span>
                  <div className="options flex items-center gap-[16px] mt-[12px]">
                    <div className="cursor-pointer flex items-center gap-3">
                      <LikeIcon className={"w-[2.2rem] h-[2.2rem]"} />
                      <span>1</span>
                    </div>
                    <div className="cursor-pointer flex items-center gap-3">
                      <UnLikeIcon className={"w-[2.2rem] h-[2.2rem] "} />
                      <span>1</span>
                    </div>
                    <label
                      htmlFor="checkSubInput"
                      className="text-[1.3rem] select-none cursor-pointer hover:opacity-70"
                      onClick={handleOpenSubInput}
                    >
                      reply
                    </label>
                    <div
                      className="text-[1.3rem] select-none cursor-pointer hover:opacity-70"
                      onClick={() => handleDeleteComment(post.id)}
                    >
                      delete
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {/* <div className="ml-[45px]">
            <div
              className={`mt-[20px] flex items-start gap-[12px] ${
                isSubInput ? "block" : "hidden"
              } `}
            >
              <img
                src="https://phimmoizzz.netlify.app/user-non-avatar.png"
                alt=""
                className="w-[24px] h-[24px] rounded-full object-cover"
              />
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Reply comment here"
                  className={`bg-[transparent] outline-none w-full px-[12px] pb-[8px] relative -top-[8px] border-b border-solid border-b-[var(--white-color)] text-[1.4rem]`}
                  id="checkSubInput"
                />
                <div
                  className="flex items-center justify-end gap-[20px] mt-[12px] py-[8px] px-[16px] rounded-[24px]"
                  onClick={handleCloseSubInput}
                >
                  <span className="cursor-pointer">cancel</span>
                  <button className="py-[8px] px-[16px] rounded-[24px] bg-[#f2f2f2] text-[#000] min-w-[99px] hover:opacity-70">
                    reply
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div
                className={`flex items-center justify-center  px-[16px] -mx-[16px] py-[12px] gap-[14px] cursor-pointer hover:opacity-80 w-[fit-content] hover:bg-[#def1ff] transition-[background-color] duration-300 ease-linear rounded-[24px] ${
                  !isSubInput ? "mt-[10px]" : ""
                }`}
                onClick={() => setIsSubComment(!isSubComment)}
              >
                <PlayIcon
                  className={`w-[1.2rem] h-[1.2rem] ${
                    isSubComment ? "-rotate-[90deg]" : "rotate-[90deg]"
                  } text-[#065fd4]`}
                />
                <span className="block text-[#065fd4] font-bold">
                  one reply
                </span>
              </div>
              <div className="flex">
                <div className="w-[4rem] h-[3rem]">
                  <img
                    src="https://phimmoizzz.netlify.app/user-non-avatar.png"
                    alt=""
                    className="w-[2.4rem] h-[2.4rem] rounded-full object-cover"
                  />
                </div>
                <div className="flex-1 ">
                  <div className="flex items-center">
                    <span className="inline-block text-[1.3rem] text-[var(--white-color)]">
                      Việt Phương Dương
                    </span>
                    <span className="inline-block ml-[8px] text-[1.2rem] text-[#606060]">
                      4 tháng trước
                    </span>
                  </div>
                  <span className="block text-[1.4rem] text-[var(--white-color)] mt-[2px]">
                    Nghe giọng cute vãi
                  </span>
                  <div className="options flex items-center gap-[16px] mt-[12px]">
                    <div className="cursor-pointer flex items-center gap-3">
                      <LikeIcon className={"w-[2.2rem] h-[2.2rem]"} />
                      <span>1</span>
                    </div>
                    <div className="cursor-pointer flex items-center gap-3">
                      <UnLikeIcon className={"w-[2.2rem] h-[2.2rem] "} />
                      <span>1</span>
                    </div>
                    <div className="text-[1.3rem] cursor-pointer hover:opacity-70">
                      reply
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </form>
  );
};

export default memo(Comment);
