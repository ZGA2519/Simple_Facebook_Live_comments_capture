# Simple Facbook Live comment capture

this is a simple live comment capture that captures comments from Facebook live


# Usage
- `npm` required
- you need an account in `https://developers.facebook.com/` for access token
- you need to specify some value in `.env` file
```
# for databased
MONGODB_URI= <your_mongodb_uri>
MONGODB_SCHEMA= <your_scheme_name>
PORT= <your_desier_server_port>

# For facebook access
FACEBOOK_VIDEO_ID= <your_live_ID(mostly in the end of facebook url)>
FACEBOOK_ACCESS_TOKEN= <your_facbook_access_token>
```

- start by running the following command

```sh
npm start
```
