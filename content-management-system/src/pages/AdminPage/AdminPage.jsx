/* eslint-disable no-restricted-globals */
import React from "react";
import * as ReactDOM from "react-dom";
import {
  Grid,
  OutlinedInput,
  Button,
  Container,
  Typography,
} from "@mui/material";
import "./AdminPage.css";
import DiaryCard from "../../components/DiaryCard/DiaryCard";
import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  addPost,
  fetchPosts,
  updatePost,
  deletePost,
} from "../../services/AdminPageServices";

export default function AdminPage() {
  const [postId, setPostId] = useState("");
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [addOrUpdate, setAddOrUpdate] = useState("Add");

  useEffect(() => {
    const getPosts = async () => {
      const posts = await fetchPosts();
      setPosts(posts);
    };
    getPosts();
    document.title = "Dear Diary - Home";
  }, []);

  useEffect(() => {
    heading === "" || content === "" ? setDisabled(true) : setDisabled(false);
  }, [heading, content]);

  useEffect(() => {
    error === "" ? setOpen(false) : setOpen(true);
  }, [error]);

  async function handleEdit(post) {
    setAddOrUpdate("Update");
    setPostId(post.id);
    setHeading(post.heading);
    setContent(post.content);
  }

  async function handleDelete(post) {
    const result = confirm("Are you sure you want to delete this post?");
    if (result) {
      const res = await deletePost(post.id);
    }
  }

  const cancel = () => {
    setHeading("");
    setContent("");
    setAddOrUpdate("Add");
  };

  async function submitCard() {
    if (heading === "") {
      console.log("Missing title");
    } else if (content === "") {
      console.log("Missing content");
    } else {
      const post = {
        heading: heading,
        content: content,
      };

      if (addOrUpdate == "Add") {
        addPost(post);
        const posts = await fetchPosts();
        setPosts(posts);
      } else {
        post.id = postId;
        await updatePost(post);
        const posts = await fetchPosts();
        setPosts(posts);
        setAddOrUpdate("Add");
      }

      setHeading("");
      setContent("");
    }
  }

  return (
    <Grid className="containerAdmin" top="0vh">
      <Container maxWidth="xl">
        <Grid className="navBarAdmin">
          <Typography variant="h4" fontWeight="bold">
            Admin Dashboard
          </Typography>
          <Button variant="contained" href="/" size="small">
            Log out
          </Button>
        </Grid>

        <Grid className="addFormSection1">
          <OutlinedInput
            style={{ width: "88%" }}
            id="title"
            className="text"
            value={heading}
            size="small"
            placeholder="Title"
            onChange={(e) => {
              setHeading(e.target.value);
            }}
          />
          <Button
            id="diaryHomeBtn"
            variant="contained"
            size="small"
            onClick={submitCard}
            disabled={disabled}
          >
            {addOrUpdate}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={cancel}
          >
            cancel
          </Button>
        </Grid>
        <Grid id="textArea">
          <OutlinedInput
            id="description"
            className="text"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            fullWidth
            multiline={true}
            rows="6"
            placeholder="Enter content"
          />
        </Grid>

        <Grid container spacing={2} marginTop="1vh">
          {posts.map((post) => (
            <Grid
              paddingLeft={0}
              key={post.id}
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
            >
              <DiaryCard
                id={post.id}
                description={post.content}
                title={post.heading}
                color="rgb(243 243 243)"
                visible="block"
                edit={() => handleEdit(post)}
                delete={() => handleDelete(post)}
              />
            </Grid>
          ))}
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
