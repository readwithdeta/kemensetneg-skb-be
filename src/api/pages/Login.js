import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo_kemensetneg from '../../images/Logo_Setneg_RI.svg.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [jwt, setJwt] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = {
            username: username,
            password: password
        };

        try {
            const response = await axios.post('http://localhost:8060/auth/login', loginData);

            const { token } = response.data;
            setJwt(token);
            setError('');
            console.log('JWT:', token);

            localStorage.setItem('jwt', token);

            navigate('/apipage');
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            console.error(err);
        }
    };

    return (
        <div class="screen-1">
            <div alignContent={"center"}>
            <img width={150} textAlign={"center"} style={{marginTop: '10px',alignContent:'center'}}src={logo_kemensetneg} alt="Logo Kemensetneg" />
            </div>
            <h2>Aplikasi Sederhana untuk Ujian SKB CPNS 2024</h2>
            <br></br>
            <form onSubmit={handleLogin}>
                <div class="email">
                <label for="email">Username</label>
                <div class="sec-2">
                    <ion-icon name="mail-outline"></ion-icon>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
            </div>
            <br></br>
            <div class="password">
                <label for="password">Password</label>
                <div class="sec-2">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                        <input class="pas"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                </div>
            </div>
            <br></br>
            <button class="login"  type="submit">Login </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {jwt && <p style={{ color: 'green' }}>Logged in successfully!</p>}
            </form>
            <div class="footer" textAlign={"center"} style={{textAlign: "center"}}>
                <span style={{textAlign: "center"}}>Yth. Bapak/Ibu, berikut Username Testing Kemensetneg <br>
                </br>username : kemensetneg 
                    <br></br>Password : kemensetneg</span>
                {/* <br></br>
                <span>Password : kemensetneg </span> */}
            </div>
        </div>
        // <div>
        //     <h2>Login</h2>
        //     <form onSubmit={handleLogin}>
        //         <div>
        //             <label>Username:</label>
        //             <input
        //                 type="text"
        //                 value={username}
        //                 onChange={(e) => setUsername(e.target.value)}
        //                 required
        //             />
        //         </div>
        //         <div>
        //             <label>Password:</label>
        //             <input
        //                 type="password"
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //                 required
        //             />
        //         </div>
        //         <div>
        //             <button type="submit">Login</button>
        //         </div>
        //         {error && <p style={{ color: 'red' }}>{error}</p>}
        //         {jwt && <p style={{ color: 'green' }}>Logged in successfully!</p>}
        //     </form>
        // </div>
    );
};

export default Login;
