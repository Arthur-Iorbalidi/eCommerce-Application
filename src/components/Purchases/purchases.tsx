import { useEffect, useState } from 'react';
import { ClientResponse, Cart, LineItem } from '@commercetools/platform-sdk';

import { Link } from 'react-router-dom';

// import { RiDeleteBin6Fill } from 'react-icons/ri';
import { Modal } from 'react-bootstrap';
import { BsXLg } from 'react-icons/bs';

import getCalculatedPrice from '../../services/helpers/getCalculatedPrice';

import useAppDispatch from '../../shared/hooks/useAppDispatch';
import {
  resetActiveBrands,
  resetActiveCategoryId,
  resetActiveDisplayDiagonals,
  resetActiveOsArray,
  resetPriceRange,
} from '../../store/reducers/filtersSlice';
import {
  resetCurrentPage,
  resetSortOption,
  resetSortOrderOption,
} from '../../store/reducers/sortSlice';

import Button from '../../shared/ui/Button/Button';
import ProductForm from './components/productForm';

import getMyCart from '../../services/api/cart/getMyCart';
// import deleteItemFromCart from '../../services/api/cart/deleteItemFromCart';

import styles from './purchases.module.scss';

export default function Purchases() {
  const dispatch = useAppDispatch();

  const [cart, changeCart] = useState<Cart | undefined>();
  const [stateWithProducts, changeStateWithProducts] = useState<LineItem[]>([]);
  const [showModal, setShowModal] = useState(false);

  function putProductsInState(value: ClientResponse) {
    changeCart(() => value.body);
    changeStateWithProducts(value.body.lineItems);
  }

  useEffect(() => {
    getMyCart(putProductsInState);
  }, []);

  // function clearCart() {
  //   stateWithProducts.map((elem) => deleteItemFromCart(elem.productId));
  //   getMyCart(putProductsInState);
  // }
  // const navigate = useNavigate();
  // function nav(value: string) {
  //   navigate(`/catalog/product/${value}`);
  // }

  function handleCatalogReset() {
    dispatch(resetActiveCategoryId());
    dispatch(resetActiveBrands());
    dispatch(resetActiveDisplayDiagonals());
    dispatch(resetActiveOsArray());
    dispatch(resetPriceRange());

    dispatch(resetCurrentPage());
    dispatch(resetSortOption());
    dispatch(resetSortOrderOption());
  }

  return (
    <div className={styles.purchases_wrapper}>
      <h1>Your shopping cart</h1>
      {stateWithProducts.length !== 0 ? (
        <div className={styles.purchases_container}>
          <div className={styles.products_box}>
            {/* <div className={styles.purchases_control_panel}>
              <p onClick={clearCart}>
                <RiDeleteBin6Fill className={styles.control_panel_basket} />
                Remove All
              </p>
            </div> */}
            {stateWithProducts.map((elem) => (
              <ProductForm
                key={elem.id}
                data={elem}
                onDelete={() => getMyCart(putProductsInState)}
              />
            ))}
          </div>
          <div className={styles.summery_box_wrapper}>
            <div className={styles.summery_box}>
              <h2>Order summary</h2>
              <p>
                Total cost:
                <span>
                  $
                  {cart?.totalPrice?.centAmount
                    ? getCalculatedPrice(cart.totalPrice.centAmount, 2)
                    : 0}
                </span>
              </p>
              <Button
                className={styles.place_order_btn}
                value="Place Order"
                color="green"
                onClick={() => setShowModal(true)}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.emptyCatalog_container}>
          <h2>The cart is empty</h2>
          <Link
            to="/catalog"
            onClick={() => {
              handleCatalogReset();
            }}
          >
            <Button value="Go to Shopping" color="green" />
          </Link>
        </div>
      )}

      <Modal
        className={styles.modal}
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className={styles.modal_header}>
          <Button
            className={styles.closeModal_btn}
            value={<BsXLg className={styles.closeModal_icon} />}
            color="green"
            onClick={() => setShowModal(false)}
          />
        </Modal.Header>
        <Modal.Body className={styles.modal_body}>
          Your order is placed successfully!
        </Modal.Body>
      </Modal>
    </div>
  );
}
