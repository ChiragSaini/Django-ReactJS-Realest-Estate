import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import axios from "axios";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert"
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";

const Contact = ({ setAlert }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const { name, email, subject, message } = formData;

    const [loading, setLoading] = useState(false);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        setLoading(true);
        axios.post("http://localhost:8000/api/contacts/", { name, email, subject, message }, config)
            .then(res => {
                setAlert("Message Sent", "success")
                setLoading(false);
                // props.setListings(res.data);
                // console.log(res.data);
                window.scrollTo(0, 0);
            })
            .catch(err => {
                setAlert("Error sending message", "error")
                setLoading(false);
                window.scrollTo(0, 0);
            })
    };
    return (
        <div className="contact">
            <Helmet>
                <title>Realest Estate -Contact Us</title>
                <meta
                    name='description'
                    content='Contact US'
                />
            </Helmet>
            <form onSubmit={e => onSubmit(e)} className="contact__form">
                <label htmlFor="name" className="contact__form__label">Name*</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    onChange={e => onChange(e)}
                    value={name}
                    required
                    className="contact__form__input" />
                <label htmlFor="email" className="contact__form__label">Email*</label>
                <input
                    type="email"
                    name="email"
                    placeholder="example@mail.com"
                    onChange={e => onChange(e)}
                    value={email}
                    required
                    className="contact__form__input" />
                <label htmlFor="subject" className="contact__form__label">Subject*</label>
                <input
                    type="text"
                    name="subject"
                    placeholder="Buying Home..."
                    onChange={e => onChange(e)}
                    value={subject}
                    required
                    className="contact__form__input" />
                <label htmlFor="message" className="contact__form__label">Message*</label>
                <textarea
                    className="contact__form__textarea"
                    name="message"
                    cols="30"
                    rows="10"
                    placeholder="Message..."
                    onChange={e => onChange(e)}
                    value={message}
                    required
                />
                {
                    loading ?
                        <div className="contact__form__loader">
                            <Loader
                                type="Oval"
                                color="#434343"
                                height={50}
                                width={50}
                            />
                        </div> :
                        <button className="contact__form__button" htmltype="submit">Send</button>
                }
            </form>
        </div>
    );
};

Contact.propTypes = {
    setAlert: PropTypes.func.isRequired
}

export default connect(null, { setAlert })(Contact);