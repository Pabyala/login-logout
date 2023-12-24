import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export default function Dashboard() {
  const navigate = useNavigate()
  useEffect( () => {
    let userName = sessionStorage.getItem('userName')
    if(userName === '' || userName === null){
      navigate('/')
    }
  }, [navigate])
  return (
    <div className='dashboard'>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Dashboard</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Link className='links' to={'/'}>Log out</Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="content container">
        <h1 className='text-center '>Welcome to Dashboard</h1>
      </div>
    </div>
  )
}
