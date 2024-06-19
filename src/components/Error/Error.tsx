import './Error.scss';

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import { BsArrowLeftShort } from 'react-icons/bs';
import errorImage from '../../assets/images/ErrorPage/mainErrorImage.png';

function Error() {
  return (
    <div className="error-main">
      <div className="error-main_content-wrapper">
        <h2 className="error-main_content-wrapper_oops">Oops!</h2>
        <div className="error-main_content-wrapper_text-wrapper">
          <p className="error-main_content-wrapper_text-wrapper_string">
            Page Not Found
          </p>
          <p className="error-main_content-wrapper_text-wrapper_string">
            You are lost
          </p>
        </div>
        <img
          src={errorImage}
          alt="errorImage"
          className="error-main_content-wrapper_image"
        />
        <Link to="/" className="react-router-dom_link">
          <Button
            variant="outline-dark"
            className="error-main_content-wrapper_button--goMain"
          >
            <BsArrowLeftShort className="error-main_content-wrapper_button--goMain_arrow" />
            Go main
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Error;
