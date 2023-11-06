import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()

    // protected routing
    useEffect(() => {
        // Check if the authtoken is present in the local storage
        const authToken = localStorage.getItem('authtoken');
        if (authToken) {
            // Redirect to the home page if the user is already logged in
            navigate('/');
        }
    }, [navigate]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // email change
    const handleEmailChange = (e) => {
        setEmail(e.target.value);

    };
    // password change
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);

    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password)
        try {
            // Make a POST request using Axios
            const response = await axios.post('http://localhost:5000/api/v1/login', {
                email,
                password
            });

            // Handle the response
            console.log('Response:', response.data);
            // Save the authtoken in the browser's local storage
            if (response.data) {
                localStorage.setItem('authtoken', response.data.authtoken);
                navigate('/')
            }

        } catch (error) {
            // Handle errors
            console.error('Error:', error);
            // Additional error handling logic if needed
        }
    }
    return (
        <>
            <div className="container py-4 px-4 my-4 bg-dark text-white">
                <form onSubmit={handleSubmit}>
                    <h4 className="text-center text-warning">User Login Form</h4>
                    {/* email */}
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleEmailChange}
                            value={email}
                        />
                    </div>
                    {/* password */}
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            name="password"
                            onChange={handlePasswordChange}
                            value={password}
                        />
                    </div>
                    <div className="mb-3 text-center">
                        <button className="btn btn-primary form-control" type="submit" >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login