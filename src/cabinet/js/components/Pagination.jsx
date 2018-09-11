import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

const Pagination = ({ pages, currentPage, setPage }) => {
  let pagesItems = Array(pages).fill(null);
  pagesItems = pagesItems.map((_, i) => i + 1);

  if (pagesItems.length >= 7) {
    let start = currentPage < 4 ? 0 : currentPage - 4;
    start = pagesItems.length - start < 7 ? pagesItems.length - 7 : start;
    let end = start + 7;

    pagesItems = pagesItems.slice(start, end);
  }

  return (
    <div className="pagination">
      <div
        onClick={() => currentPage > 1 && setPage(currentPage - 1)}
        className={cs('pagination__arrow pagination__arrow_prev', {
          pagination__arrow_hide: currentPage === 1,
        })}
      />
      {
        pagesItems.map(p => (
          <div
            onClick={() => setPage(p)}
            key={p}
            className={cs('pagination__number', {
              pagination__number_active: currentPage === p,
            })}
          >
            {p}
          </div>
        ))
      }
      <div
        onClick={() => currentPage < pages && setPage(currentPage + 1)}
        className={cs('pagination__arrow pagination__arrow_next', {
          pagination__arrow_hide: currentPage === pages,
        })}
      />
    </div>
  );
};

Pagination.propTypes = {
  pages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default Pagination;
