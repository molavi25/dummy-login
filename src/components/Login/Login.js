import {
  useEffect,
  useReducer,
  useState,
} from 'react';

import {
  Button,
  Card,
} from 'components';
import classes from './Login.module.css';

const Login = (props) => {
  const [formIsValid, setFormIsValid] =
    useState();

  // useReducer
  const [email, dispatchEmail] =
    useReducer(
      (state, action) => {
        const actionType = action.type;
        const actionPayload =
          action.payLoad;

        if (
          actionType === 'USER_INPUT'
        ) {
          return {
            value: actionPayload,
            isValid:
              actionPayload.includes(
                '@',
              ),
          };
        }

        if (
          actionType === 'INPUT_BLUR'
        ) {
          return {
            value: state.value,
            isValid:
              state.value.includes('@'),
          };
        }

        return {
          value: '',
          isValid: false,
        };
      },
      { value: '', isValid: null },
    );
  const [password, dispatchPassword] =
    useReducer(
      (state, action) => {
        if (
          action.type === 'USER_INPUT'
        ) {
          return {
            value: action.payLoad,
            isValid:
              action.payLoad.trim()
                .length > 6,
          };
        }

        if (
          action.type === 'INPUT_BLUR'
        ) {
          return {
            value: state.value,
            isValid:
              state.value.trim()
                .length > 6,
          };
        }

        return {
          value: '',
          isValid: null,
        };
      },
      { value: '', isValid: null },
    );

  // Debouncing
  useEffect(() => {
    const validator = setTimeout(() => {
      setFormIsValid(
        email.isValid &&
          password.isValid,
      );
    }, 500);

    return () => {
      clearTimeout(validator);
    };
  }, [email.isValid, password.isValid]);

  const emailChangeHandler = (
    event,
  ) => {
    dispatchEmail({
      type: 'USER_INPUT',
      payLoad: event.target.value,
    });
  };

  const passwordChangeHandler = (
    event,
  ) => {
    dispatchPassword({
      type: 'USER_INPUT',
      payLoad: event.target.value,
    });
  };

  const validateEmailHandler = () => {
    dispatchEmail({
      type: 'INPUT_BLUR',
    });
  };

  const validatePasswordHandler =
    () => {
      dispatchPassword({
        type: 'INPUT_BLUR',
      });
    };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(
      email.value,
      password.value,
    );
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${
            classes.control
          } ${
            email.isValid === false
              ? classes.invalid
              : ''
          }`}>
          <label htmlFor='email'>
            E-Mail
          </label>
          <input
            type='email'
            id='email'
            value={email.value}
            onChange={
              emailChangeHandler
            }
            onBlur={
              validateEmailHandler
            }
          />
        </div>
        <div
          className={`${
            classes.control
          } ${
            password.isValid === false
              ? classes.invalid
              : ''
          }`}>
          <label htmlFor='password'>
            Password
          </label>
          <input
            type='password'
            id='password'
            value={password.value}
            onChange={
              passwordChangeHandler
            }
            onBlur={
              validatePasswordHandler
            }
          />
        </div>
        <div
          className={classes.actions}>
          <Button
            type='submit'
            className={classes.btn}
            disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export { Login };
