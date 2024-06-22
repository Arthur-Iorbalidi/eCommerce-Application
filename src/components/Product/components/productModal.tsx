/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import { Modal, Carousel } from 'react-bootstrap';
import { BsXLg } from 'react-icons/bs';
import styles from './productModal.module.scss';
import Button from '../../../shared/ui/Button/Button';

interface Image {
  url: string;
}

interface ProductModalProps {
  images: Image[];
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  images,
  showModal,
  setShowModal,
}) => {
  return (
    <Modal
      className={styles.modal}
      show={showModal}
      onHide={() => setShowModal(false)}
      size="lg"
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
        <Carousel
          className={styles.carousel}
          data-bs-theme="dark"
          slide={false}
          nextIcon=""
          prevIcon=""
          interval={null}
        >
          {images.map((image, index) => (
            <Carousel.Item className={styles.carousel_item} key={index}>
              <img
                className={styles.slide_img}
                src={image.url}
                alt={`device-${index}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
