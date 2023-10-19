import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Authenticate.css';
import img from './register-background.jpg';


/*
not finished
change <form> to router dom's form.
add client side checking
also style error messages
*/

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2, username } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (password !== password2) {
            console.log('Passwords do not match');
        } else {
            console.log(formData);
        }
    };

    return (
        <div id='authenticate'>

            <div id='image-container'>
                <img id='img' src={img} alt='background' />
            </div>

            <div className='auth-container'>
                <h1>Sign Up</h1>
                <p>Create Your Account</p>
                <form 
                onSubmit={e => onSubmit(e)}
                name='register-form'
                id='register-form'
                className='auth-form'
                >
                    <label htmlFor='name'>Full Name</label>
                    <input
                        type='text'
                        placeholder='Name'
                        name='name'
                        id='name'
                        value={name}
                        onChange={e => onChange(e)}
                        required
                    />

                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
                        placeholder='Username'
                        name='username'
                        id='username'
                        value={username}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />

                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        placeholder='Email Address'
                        name='email'
                        id='email'
                        value={email}
                        onChange={e => onChange(e)}
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

                    <label htmlFor='password2'>Confirm your password</label>
                        <input
                            type='password'
                            placeholder='Confirm Password'
                            name='password2'
                            id='password2'
                            value={password2}
                            onChange={e => onChange(e)}
                            minLength='6'
                            required
                        />
                    <input type='submit' value='Register' />
                </form>
                <div className='footer'>
                    <p>
                        Already have an account? <Link to='/login'>Sign In</Link>
                    </p>
                    <p>
                        Just browsing?  <Link to='/'>Continue as guest</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
