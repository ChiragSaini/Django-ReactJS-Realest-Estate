import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../actions/auth";

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const { email, password } = formData;

    const onChange = event => setFormData({ ...formData, [event.target.name]: event.target.value });

    const onSubmit = event => {
        event.preventDefault();
        login(email, password);
    };
    if (isAuthenticated) {
        return <Redirect to="/" />
    }
    return (
        <div className="auth">
            <Helmet>
                <title> Realest Estate-Login</title>
                <meta
                    name="description"
                    content="Login Page"
                />
            </Helmet>
            <h1 className="auth__title">Sign In</h1>
            <p className="auth__lead">Sign Into your Account</p>
            <form className="auth__form" onSubmit={event => onSubmit(event)}>
                <div className="auth__form__group">
                    <input type="email" className="auth__form__input" placeholder="Email" name="email" value={email}
                        onChange={event => onChange(event)} required />
                </div>
                <div className="auth__form__group">
                    <input type="password" className="auth__form__input" placeholder="Password" name="password" value={password}
                        onChange={event => onChange(event)} minLength="6" required />
                </div>
                <button className="auth__form__button">Login</button>
            </form>
            <p className="auth__authtext">
                Don't have an Account? <Link className="auth__authtext__link" to="/signup">Sign Up</Link>
            </p>
        </div>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { login })(Login);