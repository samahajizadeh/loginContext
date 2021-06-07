import React, {
  useEffect,
  useReducer,
  useState,
  useContext,
  useRef,
} from "react";
import AuthContext from "../store/auth-context";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import styles from "./Login.module.css";

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPssword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const emailReducer = (state, action) => {
    
    if (action.type === "USER_INPUT") {
      return { value: action.val, isValid: action.val.includes("@") };
    }

    if (action.type === "USER_BLUR") {
      return { value: state.value, isValid: state.value.includes("@") };
    }

    return { value: "", isValid: false };
  };

  const [emailState, dispatchemail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const passwordReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
      return { value: action.val, isValid: action.val.trim().length > 6 };
    }
    if (state.type === "USER_BLUR") {
      return { value: state.value, isValid: state.value.trim().length > 6 };
    }
    return { value: "", isValid: false };
  };

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  useEffect(() => {
    const identifire = setTimeout(() => {
      console.log("checking form validity ");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log("clean up");
      clearTimeout(identifire);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchemail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   event.target.value.includes("@") && passwordState.value.trim().length > 6
    //   // event.target.value.includes("@") && enteredPassword.trim().length > 6
    // );
  };

  const passwrdChangeHandler = (event) => {
    // setEnteredPssword(event.target.value);
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   // event.target.value.trim().length > 6 && enteredEmail.includes("@")
    //   // event.target.value.trim().length > 6 && emailState.value.includes("@")
    //   event.target.value.trim().length > 6 && emailState.isValid
    // );
  };

  const ctxAuth = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(enteredEmail, enteredPassword);

    if (formIsValid) {
      debugger
      ctxAuth.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }

    localStorage.setItem("IsLoggin", "1");
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes("@"));
    // setEmailIsValid(emailState.value.includes("@"));
    // setEmailIsValid(emailState.isValid);
    dispatchemail({ type: "USER_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "USER_BLUR" });
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          type="email"
          id="email"
          label="E-mail"
          value={emailState.value}
          isValid={emailIsValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          type="password"
          id="password"
          label="password"
          value={passwordState.value}
          isValid={passwordIsValid}
          onChange={passwrdChangeHandler}
          onBlur={validatePasswordHandler}
        />
        {/* <div
          className={`${styles.control} ${
            passwordState.isValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwrdChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div> */}
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn}>
            Login
          </Button>

          {/* <Button type="submit" className={styles.btn} disabled={!formIsValid}>
            Login
          </Button> */}
        </div>
      </form>
    </Card>
  );
};
export default Login;
