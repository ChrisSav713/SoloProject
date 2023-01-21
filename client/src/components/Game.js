import React, {useEffect, useState} from 'react'
import {Button, FormGroup, Form, Container, Col, Row} from 'react-bootstrap'
import axios from 'axios'
import useAxiosFetch from '../hooks/useAxiosFetch'

const Game = () => {
    const [loading, setLoading] = useState({})

    const [accessToken, setAccessToken] = useState({})

    const base_url = `https://api.igdb.com/v4`

    const getTokenPost = {
        method:'post',
        url: 'https://id.twitch.tv/oauth2/token',
        data:{
            client_id:'x4rniov57q0741nf6ptq41ohvlvrfs',
            client_secret:'huuyqcxyj40thirl0z9f3iawyhj9yk',
            grant_type:'client_credentials'
        }
    }

    const apiSearchPost = {
        method: 'post',
        url: 'https://api.igdb.com/v4/games',
        headers: {
            'Client-ID': 'x4rniov57q0741nf6ptq41ohvlvrfs',
            'Authorization': 'Bearer ' + accessToken.access_token
        },
        body: {
            fields: 'name',
            limit: 10
        }
    }

    //const { data, fetchError, isLoading } = useAxiosFetch(apiSearchPost)

    const showResult = () => {
        document.getElementById("text2").value = accessToken.access_token + " \n" + accessToken.expires_in + " \n" + accessToken.token_type
    }

    const handleLoad = () => {
        setLoading(true)
        document.getElementById("text1").value = "HELLO"
        setLoading(true)
        axios(getTokenPost)
        .then(res => { 
            setAccessToken({
                access_token: res.data.access_token,
                expires_in: res.data.expires_in,
                token_type: res.data.token_type
            })
        }).catch(err => { console.log(err)})
        .finally(setLoading(false));
    }
    
    return (
        <div>
            <Button onClick={handleLoad} variant="warning">Get Token</Button>

            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <p id="text1"></p>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" id="text2" rows={3} />
            </Form.Group>

            <Button onClick={showResult} variant="alert">Show Token Info</Button>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control as="textarea" id="text3" rows={3} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" id="text4" rows={3} />
            </Form.Group>

        </div>
    )
}

export default Game