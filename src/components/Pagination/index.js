import React from 'react';
import { Link } from 'react-router-dom';
import {GrFormPrevious} from "react-icons/gr"
import {MdNavigateNext} from "react-icons/md"
import './pagination.scss'

export default function Pagination({isLoading, isError, pagination, keyword, search, pages, pageNumber, ROUTE}) {
  return (
    <>
    {!isLoading && !isError && pagination && (
              <div className="pagination">
              {pages > 1 && pagination.prev && (
                <Link to={keyword ? `${ROUTE}/search/${keyword}/page/${pagination.prev && pagination.prev.page}` : `${ROUTE}/page/${pagination.prev && pagination.prev.page}`}>
                  <div className="prev-page">
                    <GrFormPrevious />
                  </div>
                </Link>
              )}
              {pages > 1 && [...Array(pages).keys()].map((val, ind) =>(
                  <div key={val + 1}>
                    <Link to={keyword ? `${ROUTE}/search/${keyword}/page/${val + 1}` :`${ROUTE}/page/${val + 1}`}>
                      <div className={`box-number ${val + 1 === pageNumber ? 'active' : ''}`}>
                        <span>{val + 1}</span>
                      </div>
                    </Link>
                  </div>
              ))}
              {pages > 1 && pagination.next && (
                <Link to={keyword ? `${ROUTE}/search/${keyword}/page/${pagination.next && pagination.next.page}` : `${ROUTE}/page/${pagination.next && pagination.next.page}`}>
                  <div className="next-page">
                    <MdNavigateNext />
                  </div>
                </Link>
              )}
            </div>
            )}
    </>
  );
}
