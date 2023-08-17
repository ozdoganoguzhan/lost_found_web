import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, Link, Paper, Tooltip, Typography } from '@mui/material'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link as RouterLink, useLoaderData, useNavigate } from 'react-router-dom'
import { IPost, IUser } from '../../api/Interfaces'
import { UserContext } from 'context/UserContext'
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next'
import { createAPIEndpoint, ENDPOINTS } from 'api/index'
import userLogo from "../../images/userLogo.png";

interface Data {
  postData: IPost,
  userData: IUser
}

const Post = () => {
  const { postData, userData } = useLoaderData() as Data;
  const { user, setUser } = useContext(UserContext);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();
  const phoneNumberFormatted = userData.phoneNumber.slice(0, 3) + " " + userData.phoneNumber.slice(3, 6) + " " + userData.phoneNumber.slice(6, 10)
  const { t } = useTranslation();
  const handleDeleteClick = async () => {
    console.log("IMAGE NAME: " + "post" + postData.postId + ".png");
    await createAPIEndpoint(ENDPOINTS.posts)
      .delete(postData.postId.toString())
    await axios.post("https://localhost:7183/delete/post-image?imageName=post" + postData.postId.toString() + ".png");
    navigate("/posts");
  }

  return (
    <Grid container>
      <Grid xs></Grid>
      <Grid container xs={10} justifyContent="center" columnGap={1}>
        <Grid container xs={6} rowGap={1} direction="column">
          <Grid xs>
            <Paper sx={{
              width: "100%",
              backgroundColor: "#202020",
              height: 300,
              textAlign: "center"
            }} variant="elevation" elevation={3}>
              <img src={require("images/posts/" + postData.imageUrl)}
                style={{ height: "100%", maxWidth: "100%" }} />
            </Paper>
          </Grid>

          <Grid xs>
            <Paper sx={{
              width: "100%",
              height: 300,
            }} variant="elevation" elevation={3}>
              <Typography variant="h4" sx={{ padding: 1.5 }}>
                {postData.title}
              </Typography>
              <Divider variant="middle" />
              <Typography sx={{ padding: 1.5 }}>
                {postData.text}
              </Typography>
            </Paper>
          </Grid>

        </Grid>
        <Grid xs={3}>
          <Paper sx={{
            width: "100%",
            height: 250
          }} variant="elevation" elevation={3}>
            <Grid container>
              <Grid container direction="row" sx={{ padding: 2, alignItems: "center" }}>
                <Grid>
                  <IconButton onClick={() => { navigate("/users/" + postData.userId) }}>
                    {
                      userData.profilePicture.length > 3 ? 
                      <Avatar src={require("images/profiles/" + userData.profilePicture)}></Avatar>
                      :
                      <Avatar />
                    }

                  </IconButton>

                </Grid>

                <Grid>
                  <Link color="black" component={RouterLink} underline="hover" to={"/users/" + postData.userId}>
                    <Typography variant="overline" noWrap sx={{ marginLeft: 1 }}>{userData.firstName}</Typography>
                  </Link>
                </Grid>
              </Grid>
              <Divider />
              <Grid container sx={{ padding: 2 }} direction="column">
                <Grid>
                  <Typography variant="h6">{postData.city}</Typography>
                </Grid>
                <Grid>
                  <Typography>{postData.address}</Typography>
                </Grid>

                <Grid>
                  <Typography>Tel: {phoneNumberFormatted}</Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  {/* <Button endIcon={<SendIcon />}>Mesaj Gönder</Button> */}
                  {user.userId == postData.userId &&
                    <Tooltip title={t("delete-post", "Delete Post")}>
                      <IconButton sx={{
                        width: 30,
                        height: 30
                      }} onClick={() => { setDeleteDialogOpen(true) }}>
                        <DeleteIcon color='error' />
                      </IconButton>
                    </Tooltip>
                  }
                  <Dialog
                    open={deleteDialogOpen}
                    onClose={() => { setDeleteDialogOpen(false) }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {t("post-delete-dialog-title")}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        {t("post-delete-dialog-text")}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => { setDeleteDialogOpen(false) }} autoFocus>
                        {t("post-delete-dialog-deny")}
                      </Button>
                      <Button onClick={handleDeleteClick}>
                        <Typography sx={{ color: "red" }}>
                          {t("post-delete-dialog-accept")}
                        </Typography>
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Grid xs></Grid>
    </Grid>

  )
}

export default Post