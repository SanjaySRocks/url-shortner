import React, { useState } from "react";
import db from "../firebase"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import LinearProgress from "@material-ui/core/LinearProgress";
import shortid from 'shortid';


export const Home = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [finalurl, setFinalUrl] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

    var regex = new RegExp(expression);

    if(url.match(regex))
    {

      let random_code = shortid.generate();

      const data = await db.collection("shorturls").add({
        code: random_code,
        url: url,
      });

      // SQL Backend

      // const res = await fetch(
      //   "http://localhost:3002/api/url/create",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       code: random_code,
      //       url: url,
      //     }),
      //   }
      // );

      // const data = await res.json()

      if(data)
      {
        setUrl("");
        setFinalUrl("http://localhost:3000/"+random_code)
      }

    }
    else
    {
      setFinalUrl("Enter correct URL");
    }
  };

  return (
    <div className="center-div">
      <form autoComplete="off" method="POST" onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="URL Shortner"
          variant="outlined"
          required
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          value={url}
        />
        <br />
        {loading ? (
          <LinearProgress />
        ) : (
          <Button
            type="submit"
            id="btn-short"
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
          >
            Shorten <SendIcon />
          </Button>
        )}

        {finalurl ? "Shortned URL: "+finalurl : ""}
      </form>
    </div>
  );
};
