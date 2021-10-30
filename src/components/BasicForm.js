import useInput from "../hooks/use-input";
import { useState, useEffect } from "react";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

const BasicForm = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: enteredNameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredLName,
    isValid: enteredLNameIsValid,
    hasError: enteredLNameHasError,
    valueChangeHandler: lnameChangeHandler,
    inputBlurHandler: lnameInputBlurHandler,
    reset: resetLNameInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: enteredEmailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput(isEmail);

  const [formIsValid, setFormIsValid] = useState(false);
  useEffect(() => {
    if (enteredNameIsValid && enteredLNameIsValid && enteredEmailIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [enteredNameIsValid, enteredLNameIsValid, enteredEmailIsValid]);

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    resetNameInput();
    resetLNameInput();
    resetEmailInput();
  };

  const nameInputClasses = enteredNameHasError
    ? "form-control invalid"
    : "form-control";

  const lnameInputClasses = enteredLNameHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = enteredEmailHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="control-group">
        <div className={nameInputClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={enteredName}
            onChange={nameChangeHandler}
            onBlur={nameInputBlurHandler}
          />
          {enteredNameHasError && (
            <p className="error-text">Entered Name must not be empty!</p>
          )}
        </div>
        <div className={lnameInputClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            value={enteredLName}
            onChange={lnameChangeHandler}
            onBlur={lnameInputBlurHandler}
          />
          {enteredLNameHasError && (
            <p className="error-text">Entered Last Name must not be empty!</p>
          )}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="text"
          id="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailInputBlurHandler}
        />
        {enteredEmailHasError && (
          <p className="error-text">Please enter a valid email!</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
