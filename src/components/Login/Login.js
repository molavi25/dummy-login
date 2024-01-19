import {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';

import {
  Button,
  Card,
  Input,
} from 'components';
import { AuthContext } from 'context';
import classes from './Login.module.css';

const Login = () => {
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

  const ctx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.onLogin(
        email.value,
        password.value,
      );
    } else if (!email.isValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          type='email'
          id='email'
          label='E-Mail'
          isValid={email.isValid}
          value={email.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        <Input
          ref={passwordInputRef}
          type='password'
          id='password'
          label='Password'
          isValid={password.isValid}
          value={password.value}
          onChange={
            passwordChangeHandler
          }
          onBlur={
            validatePasswordHandler
          }
        />

        <div
          className={classes.actions}>
          <Button
            type='submit'
            className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export { Login };
