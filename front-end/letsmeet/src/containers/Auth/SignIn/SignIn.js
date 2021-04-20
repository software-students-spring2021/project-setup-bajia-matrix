import React, { useState, useEffect } from 'react';

import classes from './SignIn.module.css';
import axios from '../../../axios';

/*
    This component renders the sign in page so
    a user can sign into their account.

    Props:
        This component does not accept any custom props
*/

const SignIn = (props) => {
    const [authState, setauthState] = useState({
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    const myChangeHandler = (event) => {
        // update authState immutably
        const updatedAuthState = {
          ...authState
        }

        let nam = event.target.name;
        let val = event.target.value;

        updatedAuthState[nam] = val;
        setauthState(updatedAuthState);
    }

    const [submitting, setSubmitting] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);

        axios.post("/auth/signin", authState)
            .then(response => {
                if (response.data.success) {
                    localStorage.setItem('userID', response.data.uid);
                    localStorage.setItem('isAuthenticated', true);
                   
                    props.history.push("/");
                }
                else {
                    // TODO: if auth failed, should change so page reloads and displays this message 
                    setErrorMessage(<strong>Either your email is incorrect or your password does not match!</strong>);
                    localStorage.setItem("userID", "");
                    localStorage.setItem("isAuthenticated", false)
                    console.log(response.data.message);
                    window.location.reload(false);
                }
            })
            .catch(error => {
                localStorage.setItem("userID", "");
                localStorage.setItem("isAuthenticated", false)
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message);

                //window.location.reload(false);
            });      
    }

    return (
        <div class="row justify-content-center">
            <form className={classes.Authform}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Enter email" 
                        name = "email"
                        value={authState.email} 
                        onChange={myChangeHandler}
                        required />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Enter password" 
                        name = "password"
                        value={authState.password} 
                        onChange={myChangeHandler}
                        required />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <div className="text-danger">{errorMessage}</div>


                <div>
                    <button type="submit" onClick={onSubmit} className="btn btn-primary btn-block">Submit</button>
                    {submitting ? <p>Signing in...</p> : null}
                </div>
                <p className="Create Account">
                        Need an Account?
                <a href="/signup"> Create Account</a>
                </p>
            </form>
        </div>
    ); 
};

export default SignIn;
