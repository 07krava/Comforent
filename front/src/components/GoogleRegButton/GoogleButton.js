import React from 'react'
import googleImage from '../../assets/img/7123025_logo_google_g_icon.png';
import { LoginSocialGoogle } from 'reactjs-social-login';

const clientId = "957026833321-pu3bno4vjkmdp27quke4ssrduuad6odv.apps.googleusercontent.com"

export default function GoogleButton() {
  return (
    <div>
       <a href="http://localhost:8080/oauth2/authorization/google" style={{ display: 'inline-block' }}>
      <img
        src={googleImage}
        alt="Google Icon"
        style={{ width: 40, height: 40, background: '#fff', cursor: 'pointer' }}
      />
    </a>
    </div>
    );
}
