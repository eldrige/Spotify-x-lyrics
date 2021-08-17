const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'https://localhost:3000',
    clientId: '7ed732613e7f4e5d874206e718e415dd',
    clientSecret: 'a9bf318533794d748a39f3bf611dce46',
    refreshToken,
  });

  spotifyApi.refreshAccessToken().then(
    (data) => {
      console.log('The access token has been refreshed.', data.body);

      spotifyApi.setAccessToken(data.body['access_token']);
    },
    (error) => {
      console.log('Could not refresh the access token.', error);
    }
  );
});

app.post('/login', (req, res) => {
  const { code } = req.body;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: '7ed732613e7f4e5d874206e718e415dd',
    clientSecret: 'a9bf318533794d748a39f3bf611dce46',
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.status(200).json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(400).json({
        status: 'failed',
        message: 'Something went wrong',
      });
    });
});

app.listen(3001, () => {
  console.log('App is listening on port 3001');
});
