import React from 'react'
import googleImage from '../../assets/img/7123025_logo_google_g_icon.png';

export default function GoogleButton() {
  return (
    <a href="http://localhost:8080/oauth2/authorization/google" style={{ display: 'inline-block' }}>
      <img src={googleImage} alt="Google Icon" style={{ width: 40, height: 40, cursor: 'pointer' }} />
    </a>
  );
}

