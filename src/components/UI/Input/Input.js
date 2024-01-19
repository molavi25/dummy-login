import {
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import classes from './Input.module.css';

const Input = forwardRef(
  (
    {
      isValid,
      label,
      id,
      type,
      value,
      onChange,
      onBlur,
    },
    ref,
  ) => {
    const inputRef = useRef();

    const activate = () => {
      inputRef.current.focus();
    };

    //? only thing that you can use with ref on this component (Input) most expose here through useImperativeHandle
    useImperativeHandle(ref, () => {
      return {
        focus: activate,
      };
    });

    return (
      <div
        className={`${
          classes.control
        } ${
          !isValid
            ? classes.invalid
            : ''
        }`}>
        <label htmlFor='email'>
          {label}
        </label>
        <input
          ref={inputRef}
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    );
  },
);

export { Input };
