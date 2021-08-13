import React, { useState, useEffect } from 'react'
import db from "../firebase.js";
import { useHistory, useParams } from "react-router-dom";


export const URL = () => {
    const { code } = useParams();
    const history = useHistory();

    useEffect(() => {
        let query = db.collection("shorturls").where("code", "==", code);
        query.onSnapshot((data) => {

          if (data.empty) {
            return history.push("/");
          }
          else
          {
            let finalData = data.docs[0].data();
            console.log(finalData.url)
            window.location.replace(finalData.url);
          }
        
        });
      }, []);

      

    return (
        <div>
            
        </div>
    )
}
