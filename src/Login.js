import React from 'react'

import {Container} from 'react-bootstrap'
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=7ed732613e7f4e5d874206e718e415dd&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-private%20user-read-email%20user-library-modify%20user-modify-playback-state%20user-read-playback-state`












const Login = () => {
      return (
            <Container
                  className="d-flex justify-content-center align-items-center"
                  style={{minHeight: '100vh'}}
            >
                  <a className="btn btn-success btn-lg" href={AUTH_URL}>
                        Login with spotify
                  </a>
            </Container>
      )
}

export default Login
