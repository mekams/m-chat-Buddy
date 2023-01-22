import React,{useState,useEffect} from "react";
import { useHistory } from "react-router-dom";        //navigating to pages

import { ChatEngine } from "react-chat-engine"
import { auth } from "../Firebase";
import { useAuth } from "../contexts/AuthContext";       
import axios from "axios";

const Chats = () => {
  const history = useHistory();
  const {user} =useAuth();                                     //fetch users data locally
  const [loading,setLoading]= useState(true);
  // console.log(user)                                      // for development use only localhost:3000

  const handleLogout = async () => {
    await auth.signOut();              //ref =>https://firebase.google.com/docs/auth/web/facebook-login#web-version-8_6
    history.push("/")
  };                                   //user logged out on click   // redirected to login page  
   

  //get the profile image and return in a new file to line 52
    const getFile =async (url)=>{
      const response =await fetch(url);
      const data =await response.blob()     //returns an image by blob object  =>refer https://javascript.info/blob
     
      return new File([data],"userPhoto.jpg", {type:"image/jpg"})
    }
   
    useEffect(()=>{
      if(!user){
        history.push("/");
        
        return;
      }

      //making http request to chatengine to fetch the user details (created or !created)----http by axios
      axios.get("https://api.chatengine.io/users/me",{      
        headers:{
          "project-Id": process.env.REACT_APP_CHAT_ENGINE_ID,     //hide using env variables=> line83 filename(.env)
          "user-name" : user.email,
          "user-secret": user.uid,                                
        }
      })
      .then(() => {
        setLoading(false)
      })

      // in case user not in database it will create object FormData which is predefined and use methods =>https://javascript.info/formdata
      .catch(() => {                        
            let formData =  new FormData();
            formData.append("email",user.email);
            formData.append("username",user.email);
            formData.append("secret",user.uid);
            

            //getting the pic file and displayed here (line 20)
            getFile(user.photoURL)
            .then((avatar)=>{
                formData.append('avatar',avatar,avatar.name);
                axios.post("https://api.chatengine.io/users/",formData,{
                  headers:{
                    "private-key" :process.env.REACT_APP_CHAT_ENGINE_KEY}}    //stored in env file --confidential variable key
                )
                  .then(()=>setLoading(false))
                  .catch((error) => console.log(error))
            })
      });
    },[user,history])                         //re-rendering action done for user & history only 


    // if user is not there and loading occurs.
    if(!user || loading ) return 'Loading...' 


  return (
    <div className="chats-page">  
      <div className="nav-bar">
      
      {/*eslint-disable-next-line */}
        <div className="logo-tab">🔥m-Chat Buddy! 📨  </div>
        
        {/* eslint-disable-next-line */}
        <div className="logout-tab" onClick={handleLogout}> Logout </div>
      </div>

      {/* Chat engine authentication requested data */}
      <ChatEngine
        height = "calc(100vh -66px)"
        projectID = {process.env.REACT_APP_CHAT_ENGINE_ID}   //hide the id from public by using environment variable
        userName  = {user.email}
        userSecret  = {user.uid}
      />

      <div className="footer-chats">
        <div className="footer-content-chats">
        {/* eslint-disable-next-line */}
          <p>&#60; / &#62;❤️ Kamran Mustafa &copy; copyright 2022-23😃</p>
        </div>
      </div>

    </div>
  );
};

export default Chats;
