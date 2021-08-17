import React, { useState, useEffect } from 'react';
import axios from 'axios';
const serverUrl = 'http://localhost:3001';

const useAuth = ({ code }) => {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [expiresIn, setExpiresIn] = useState('');

  useEffect(() => {
    axios
      .post(`${serverUrl}/login`, {
        code,
      })
      .then(({ data }) => {
        console.log(data);
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        setExpiresIn(data.expiresIn);
        window.history.pushState({}, null, '/');
      })
      .catch((error) => {
        console.log(error);
        window.location = '/';
      });
  }, [code]);

  useEffect(() => {
    axios
      .post(`${serverUrl}/refresh`, {
        refreshToken,
      })
      .then(({ data }) => {
        console.log(data);
        //   setAccessToken(data.accessToken);
        //   setRefreshToken(data.refreshToken);
        //   setExpiresIn(data.expiresIn);
        //   window.history.pushState({}, null, '/');
      })
      .catch((error) => {
        console.log(error);
        window.location = '/';
      });
  }, [refreshToken, expiresIn]);

  return accessToken;
};

export default useAuth;
