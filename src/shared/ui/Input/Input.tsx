import { FC, ReactNode, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

import styles from './Input.module.scss';

interface InputProps {
  icon?: ReactNode;
  placeholder?: string;
  className?: string;
  isSecretInput?: boolean;
  error?: boolean;
  helperText?: string;
}

const Input: FC<InputProps> = (props: InputProps) => {
  const {
    icon,
    placeholder,
    className,
    isSecretInput = false,
    error,
    helperText,
    ...otherProps
  } = props;

  const [isDataVisible, setIsDataVisible] = useState(false);

  const handleClickShowData = () => {
    setIsDataVisible(!isDataVisible);
  };

  let controlType;
  if (isSecretInput) {
    if (isDataVisible) {
      controlType = 'text';
    } else {
      controlType = 'password';
    }
  } else {
    controlType = 'text';
  }

  return (
    <div>
      <InputGroup className={styles.input_group}>
        <InputGroup.Text className={styles.input__icon}>{icon}</InputGroup.Text>
        <Form.Control
          className={styles.input}
          type={controlType}
          placeholder={placeholder}
          {...otherProps}
        />
        {isSecretInput && (
          <InputGroup.Text
            className={styles.input__toggle_button}
            onClick={handleClickShowData}
            role="button"
          >
            {isDataVisible ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
          </InputGroup.Text>
        )}
      </InputGroup>
      {error && (
        <Form.Text className={styles.error_text}>{helperText}</Form.Text>
      )}
    </div>
  );
};

export default Input;
