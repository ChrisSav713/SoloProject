import React, { useRef, useState, useEffect } from "react"
import '../App.css'
import ReactDom from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import {Button, FormGroup, Form, Container, Col, Row} from 'react-bootstrap'
import axios from 'axios'

const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/

const Login = () => {
    const navigate = useNavigate()

    const emailRef = useRef()
    const passwordRef = useRef()

    const [email, setEmail] = useState('')
    const [emailValid, setEmailValid] = useState(false)

    const [password, setPassword] = useState('')
    const [passwordValid, setPasswordValid] = useState(false)

    const [success, setSuccess] = useState(false)
    const [backendMsg, setBackendMsg] = useState('')

    useEffect (() => {
        emailRef.current.focus(); 
    }, [])

    useEffect (() => {
        const result = EMAIL_REGEX.test(email)
        setEmailValid(result)
    }, [email])

    useEffect (() => {
        const result = PASSWORD_REGEX.test(password)
        setPasswordValid(result)
    }, [password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            if(EMAIL_REGEX.test(email) && PASSWORD_REGEX.test(password)){
                const result = await axios.post('http://localhost:8000/api/login', {email:email, password:password})
                if(result) {
                    setBackendMsg(result.message)
                }
                console.log(JSON.stringify(result.data))
                navigate("/game")
            }
        }
        catch (err) { 
            setBackendMsg(err.message) 
        }        
    }

    return (
        <section>
        <h1>Register<span><p>{ backendMsg ? "  " + backendMsg : "" }</p></span></h1>
        <Form onSubmit={handleSubmit}>
            <Form.Label htmlFor='emailForm'>Email:
            <span className={emailValid ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={emailValid || !email ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
            </span>
            </Form.Label>
            <Form.Control
                type='text'
                id='emailForm'
                ref={emailRef}
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={emailValid ? "false" : "true"}
                aria-describedby="emailErrorMsg"
            />
            <p id="emailErrorMsg" className={!emailValid && email ? "instructions show" : "instructions hide"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must be a valid email format
            </p> 

            <Form.Label htmlFor='passwordForm'>Password:
            <span className={passwordValid ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={passwordValid || !password ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
            </span>
            </Form.Label>
            <Form.Control
                type='password'
                id='passwordForm'
                ref={passwordRef}
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-invalid={passwordValid ? "false" : "true"}
                aria-describedby="passwordErrorMsg"
            />
            <p id="passwordErrorMsg" className={!passwordValid && password ? "instructions show" : "instructions hide"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Minimum eight characters, at least one uppercase letter, one lowercase, one number and one special character
            </p> 

            <Button type="submit" disabled={!emailValid || !passwordValid ? true : false}>Register</Button>
        </Form>
        <p>Don't have an account?</p>
        <Button type="button" href="/register" variant="link">Register</Button>
    </section>
    )
}

export default Login