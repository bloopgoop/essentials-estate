import { Form, Link } from "react-router-dom";
import React, { useState } from "react";
import './Authenticate.css';
import img from './login-background.jpg';



const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const { username, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
    };

    return (
        <div id='authenticate'>

            <div id='image-container'>
                <img id='img' src={img} alt='background' />
            </div>

            <div className='auth-container'>
                <h1>Sign In</h1>
                <p>Welcome back!</p>
                <form 
                onSubmit={e => onSubmit(e)}
                name='login-form'
                id='login-form'
                className='auth-form'
                >
                    
                    <label htmlFor='flex'>Username or email</label>
                    <input
                        type='text'
                        placeholder='Username or email'
                        name='flex'
                        id='flex'
                        value={username}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />

                    <label htmlFor='password'>Create a password</label>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        id='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />

                    <input type='submit' value='Login' />
                </form>
                <div className='footer'>
                    <p>
                        Don't have an account? <Link to='/register'>Register</Link>
                    </p>
                    <p>
                        Just browsing?  <Link to='/'>Continue as guest</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
