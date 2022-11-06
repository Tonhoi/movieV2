import React, { memo } from "react";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";

import "./Pagination.scss";
let totalPages;
const Pagination = ({ totalPage, onClick }) => {
  const { page } = useParams();
  totalPages = Math.ceil(totalPage / 24);

  return (
    <div className={"wrapper-pagination"}>
      <ReactPaginate
        renderOnZeroPageCount={null}
        nextLabel=">"
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        pageCount={500}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        onPageChange={onClick}
        forcePage={Number(page) - 1}
      />
    </div>
  );
};

export default memo(Pagination);
