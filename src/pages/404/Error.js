import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../configs";

import "./Error.scss";
const Error = () => {
  return (
    <div
      className={
        "wrapper min-h-[100vh] flex flex-col items-center justify-center bg-[#fff]"
      }
    >
      <h1 className="text-[4.5rem] text=[var(--black-color)] font-bold">
        Không tìm thấy nội dung 😓{" "}
      </h1>
      <p className={"zoom-area"}>
        <b>URL</b> của nội dung này đã bị thay đổi hoặc không còn tồn tại. Nếu
        bạn đang lưu URL này, hãy thử truy cập lại từ trang chủ thay vì dùng URL
        đã lưu.
      </p>
      <section className={"error-container h-[200px] flex items-center"}>
        <span>4</span>
        <span>
          <span>0</span>
        </span>
        <span>4</span>
      </section>
      <div className={"link-container"}>
        <Link to={routes.home} className={"more-link"}>
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
};

export default Error;
