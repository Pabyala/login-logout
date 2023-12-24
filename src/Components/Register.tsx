import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface UserData {
    id: string,
    password: string,
    fullName: string,
    email: string,
    phone: number
}

export default function Register() {
    const [userDataInput, setUserDataInput] = useState<UserData>({
        id: '',
        password: '',
        fullName: '',
        email: '',
        phone: 0
    })
    const navigate = useNavigate()

    const handleInputChange = (inputField: string, value: string | number) => {
        setUserDataInput((prevData) => ({
            ...prevData, 
            [inputField]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if(
            userDataInput.id === '' || 
            userDataInput.password === '' || 
            userDataInput.fullName === '' || 
            userDataInput.email === '' || 
            userDataInput.phone === 0
        ){
            alert('Please fill out all input')
            return
        }

        const data = {...userDataInput, 
            id: userDataInput.id.trim(),
            password: userDataInput.password.trim(),
            fullName: userDataInput.fullName.trim(),
            email: userDataInput.email.trim(),
            phone: userDataInput.phone,
        }
        

        try{
            const urlData = `http://localhost:8000/userList`;
            const ress = await axios.get(urlData);
            const userDataList: UserData[] = ress.data;
            const checkIfTaken = userDataList.find(
                (user) => user.id === data.id
            );

            if(checkIfTaken){
                alert('Username was already taken')
            } else {
                const response = await axios.post("http://localhost:8000/userList", data);
                console.log('Registered Successfully', response.data);
                navigate('/')
                setUserDataInput({
                    id: '',
                    password: '',
                    fullName: '',
                    email: '',
                    phone: 0
                })
            }
        } catch (error){
            console.error(`Failed ${error}`);
        }

    }

    return (
        <div className='register container'>
            <Form className='form-input' onSubmit={handleSubmit}>
                <h2>Register</h2>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Enter username" 
                        value={userDataInput.id} 
                        onChange={(e) => handleInputChange('id', e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password"
                        placeholder="Password" 
                        value={userDataInput.password} 
                        onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Fullname</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Enter Fullname" 
                        value={userDataInput.fullName} 
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email"
                        placeholder="Enter Email" 
                        value={userDataInput.email} 
                        onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Number</Form.Label>
                    <Form.Control 
                        type="number"
                        placeholder="Enter Number" 
                        value={userDataInput.phone} 
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                </Form.Group>
                    
                <Button className='btn-login' variant="primary" type="submit">
                    Login
                </Button>
                <span>
                    Already have account?
                    <Link to="/">Login</Link>
                </span>
            </Form>
        </div>
    )
}