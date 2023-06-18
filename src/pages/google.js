import React from 'react';
import {useAuth} from '../components/firebase/AuthContext'
import mi_image2 from '../components/Ecosystem_Image6.png'
import { getAuth, linkWithPopup, OAuthProvider } from "firebase/auth";




const GooglePage = () => {

    const provider = new OAuthProvider('microsoft.com');
    const auth = getAuth();

    const {logInWithGoogle} = useAuth();


    const handleMsftSignIn = () => {

      linkWithPopup(auth.currentUser, provider)
    .then((result) => {
      // Microsoft credential is linked to the current user.
      // IdP data available in result.additionalUserInfo.profile.

      const profileId = result.additionalUserInfo.profile.id;
      console.log('Microsoft Profile ID:', profileId);

      // Get the OAuth access token and ID Token
      const credential = OAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      const idToken = credential.idToken;
      // Access the UID (User ID)
      const uid = result.user.uid;
      
      window.location.href = "http://localhost:3000/home"

    })
    .catch((error) => {
      // Handle error.
    });



    }

    

    const handleGoogleSignIn = () => {
      logInWithGoogle();
      window.location.href = "http://localhost:3000/home"
    };
  
    return (
      <>
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <img src={mi_image2} alt="My Image" style={{ width: '400px', marginBottom: '20px' }} /> {/* Include the image here */}
        <h2 className="my-heading">Time Bandit</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button style={{
            padding: '10px 20px',
            fontSize: '18px',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: 'Comic Sans MS, cursive',
            marginRight: '10px'
          }} onClick={handleGoogleSignIn}>
            <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-logos-vector-eps-cdr-svg-download-10.png" alt="Google Logo" style={{ width: '20px', height: '20px', marginRight: '5px' }} />Google Sign-On</button>
  
          <button style={{
            padding: '10px 20px',
            fontSize: '18px',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: 'Comic Sans MS, cursive'
          }} onClick={handleMsftSignIn}>
            <img src="https://www.freepnglogos.com/uploads/microsoft-window-logo-emblem-0.png" alt="Microsoft Logo" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
            Microsoft Sign-On</button>
        </div>
      </div>
    </>
  
    );
  };
  
  export default GooglePage;