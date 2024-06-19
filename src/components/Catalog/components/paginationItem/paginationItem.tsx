import { Pagination } from 'react-bootstrap';

import useAppDispatch from '../../../../shared/hooks/useAppDispatch';
import useAppSelector from '../../../../shared/hooks/useAppSelector';
import { setCurrentPage } from '../../../../store/reducers/sortSlice';

import styles from './paginationItem.module.scss';

interface PaginationItemProps {
  totalProductsNumber: number;
}

const PRODUCTS_LIMIT = 8;

const PaginationItem = (props: PaginationItemProps) => {
  const { totalProductsNumber } = props;

  const dispatch = useAppDispatch();

  const currentPage = useAppSelector((state) => state.sortReducer.currentPage);

  const generatePages = () =>
    Array.from(
      { length: Math.ceil(totalProductsNumber / PRODUCTS_LIMIT) },
      (_, i) => i + 1,
    );

  return (
    <div className={styles.paginationWrapper}>
      <div className={styles.pagination}>
        <Pagination>
          <Pagination.First
            className={styles.pagination_arrow}
            onClick={() => dispatch(setCurrentPage(1))}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            className={styles.pagination_arrow}
            onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            disabled={currentPage === 1}
          />

          {generatePages().map((page) => (
            <Pagination.Item
              className={styles.pagination_item}
              key={page}
              active={page === currentPage}
              onClick={() => dispatch(setCurrentPage(page))}
            >
              {page}
            </Pagination.Item>
          ))}

          <Pagination.Next
            className={styles.pagination_arrow}
            onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            disabled={
              currentPage >= Math.ceil(totalProductsNumber / PRODUCTS_LIMIT)
            }
          />
          <Pagination.Last
            className={styles.pagination_arrow}
            onClick={() =>
              dispatch(
                setCurrentPage(Math.ceil(totalProductsNumber / PRODUCTS_LIMIT)),
              )
            }
            disabled={
              currentPage >= Math.ceil(totalProductsNumber / PRODUCTS_LIMIT)
            }
          />
        </Pagination>
      </div>
    </div>
  );
};

export default PaginationItem;
