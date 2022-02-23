import React from 'react';
import { usePagination } from '@material-ui/lab/Pagination';

export default function PaginationComponent(props) {
  const { count, onChange, page, dataName } = props;
  const { items } = usePagination({
    count: count,
    page: page,
    onChange: onChange,
    showFirstButton: true,
    showLastButton: true
  });

  if (count < 2) {
    return false;
  } else {
    return (
      <div data-name={dataName}>
        <ul className='c-pagination'>
          {items.map(({ page, type, selected, ...item }, index) => {
            let children = null;

            if (type === 'start-ellipsis' || type === 'end-ellipsis') {
              children = '…';
            } else if (type === 'page') {
              children = (
                <button type="button" {...item} className='link'>
                  {page}
                </button>
              );
            } else {
              let label = '';
              switch (type) {
                case 'first':
                  label = '<<';
                  break;
                case 'previous':
                  label = '<';
                  break;
                case 'next':
                  label = '>';
                  break;
                case 'last':
                  label = '>>';
                  break;
                default:
              }
              children = (
                <button type="button" {...item} className='link'>
                  {label}
                </button>
              );
            }
            return <li key={index}>{children}</li>;
          })}
        </ul>
      </div>
    );
  }
}