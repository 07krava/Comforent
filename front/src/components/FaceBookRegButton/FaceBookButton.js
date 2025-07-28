import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import {LoginSocialFacebook} from 'reactjs-social-login';

export default function FaceBookButton() {
    return (
        <div>
            <LoginSocialFacebook
            appId="3987210748231965"
            onResolve={(response) => {
               console.log(response); 
            }}
            onReject={(error) => {
                console.log(error);
            }}
            >
            <FacebookIcon style={{ fontSize: '40px' }} />
            </LoginSocialFacebook>
        </div>
    )
}
