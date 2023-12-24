import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './GlobalStyle.css'

interface UserData {
    id: string,
    password: string,
    fullName: string,
    email: string,
    phone: number
}

export default function Login() {

    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const navigate = useNavigate()

    useEffect( () => {
        sessionStorage.clear()
    }, [navigate])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if(userName === '' || userPassword === ''){
            alert('Enter valid input')
            return
        }

        try{
            const urlData = `http://localhost:8000/userList`;
            const ress = await axios.get(urlData);
            const userDataList: UserData[] = ress.data;
            const chechUserName = userDataList.find(
                (user) => user.id === userName
            );

            if(chechUserName){
                const urlData = `http://localhost:8000/userList/${userName}`;
                const response = await axios.get(urlData);
                const userData = response.data;
                if( userData.id === userName ){
                    if(userData.password === userPassword) {
                        console.log(response.data)
                        console.log('Successfully logged in')
                        sessionStorage.setItem('userName', userName)
                        navigate('/dashboard')
                    } else {
                        alert('Invalid password')
                    }
                }
            } else {
                alert('Invalid username')
            }
        } catch (error){
            alert("Error fetching user data")
            console.log('Error fetching user data', error);
        }

    }

    return (
        <div className="login container">
            <Form className='form-input' onSubmit={handleSubmit}>
                <h2>Login</h2>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter username" 
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                    />
                </Form.Group>
                <Button className='btn-login' variant="primary" type="submit">
                    Login
                </Button>
                <span>
                    Dont have account? 
                    <Link to="/register">Register</Link>
                </span>
            </Form>
        </div>
    )
}