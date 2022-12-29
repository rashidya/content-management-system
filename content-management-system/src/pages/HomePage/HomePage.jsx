import React from "react";
import * as ReactDOM from "react-dom";
import {
  Grid,
  OutlinedInput,
  Button,
  Container,
  Typography,
} from "@mui/material";
import "./HomePage.css";
import DiaryCard from "../../components/DiaryCard/DiaryCard";
import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { addPost, fetchPosts } from "../../services/AdminPageServices";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      const posts = await fetchPosts();
      setPosts(posts);
      
    };
    getPosts();
    document.title = "Dear Diary - Home";
  }, []);

  useEffect(() => {
    error === "" ? setOpen(false) : setOpen(true);
  }, [error]);


  return (
    <Grid className="containerDiaryHome" top="0vh">
      <Container maxWidth="xl">
        <Grid className="navBar">
          <Typography
            variant="h4"
            fontWeight="bold"
          >
            Blog
          </Typography>
          <Button variant="contained" href='logIn' size="small">Log In</Button>
        </Grid>

        <Grid container spacing={1} marginTop="4vh">
          {
            posts.map((post) => <Grid paddingLeft={0} key={post.id} item xs={12} sm={12} md={6} lg={6}><DiaryCard description={post.content} title={post.heading} color="rgb(243 243 243)" visible="none"/></Grid>)
          }
        </Grid>

        <Snackbar
          open={open}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      </Container>
    </Grid>
  );
}
