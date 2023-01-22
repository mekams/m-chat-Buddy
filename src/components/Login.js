import React from "react";
import { GoogleOutlined } from "@ant-design/icons";     //icons imported

import firebase from "firebase/app";                    //importing firebase app
import { auth } from "../Firebase";                //importing authentication method from created firebase component

const Login = () => {
  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome to m-Chat Buddy!</h2>
        <div
          className="login-button google"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())    //authenticating google a/c
          }
        >
          <GoogleOutlined /> Sign in with Google
          {/*choice to sign in with Google*/}
        </div>

          <br/>      

        <div className="note-heading">*Kindly Note*<br/>**Only smartphone users**

        {/* eslint-disable-next-line */}
          <p id= "extra"> To add new chats💬<br/>Tilt your📱 to Landscape then switch to Portrait back 📲 </p>
        </div>
      </div>
      
      <div className="footer">
        <div className="footer-content">
        {/* eslint-disable-next-line */}
          <p>&#60; / &#62;❤️ Kamran Mustafa &copy; copyright 2022-23😃</p>
        </div>
      </div>

    </div>
    
  );
};

export default Login;
