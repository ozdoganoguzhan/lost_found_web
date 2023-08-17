import { Avatar, Button, Grid, IconButton, Paper, Tab, TextField, Tooltip, Typography } from '@mui/material';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { IPost, IUser } from '../../api/Interfaces';
import { UserContext } from '../../context/UserContext';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box } from '@mui/system';
import TabContext from "@mui/lab/TabContext";
import UserPosts from './UserPosts';
import { BASE_URL, createAPIEndpoint, ENDPOINTS } from 'api/index';
import { TabList, TabPanel } from '@mui/lab';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { validateStringLength } from '../../util';
import axios from 'axios';

interface Data {
  data: IUser
}

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const { t } = useTranslation();
  const { data } = useLoaderData() as Data;
  const [userPosts, setUserPosts] = useState(Array<IPost>);
  const [tabValue, setTabValue] = useState("1");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newFirstName, setNewFirstName] = useState(data.firstName);
  const [newLastName, setNewLastName] = useState(data.lastName);
  const [newPhoto, setNewPhoto] = useState<File>();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      createAPIEndpoint(ENDPOINTS.posts)
        .fetchPostByUserId(data.userId)
        .then(res => {
          setUserPosts(res.data);
          setLoading(false);
        })
    }
    catch (err) {
      console.log(err);
    }

  }, [])

  if (!data) return (<div>
    Oops! Looks like this user doesn't exist!
  </div>)

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleSaveChanges = async () => {
    let profilePicture = new FormData();

    if (newPhoto != null) {
      profilePicture.append("image", newPhoto, "user" + user.userId + ".png");
      await axios.post("https://localhost:7183/upload/user-image", profilePicture, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      await axios.patch(BASE_URL + "api/users/" + user.userId, [
        {
          op: "replace",
          path: "/profilePicture",
          value: "user" + user.userId + ".png"
        }
      ])
      await new Promise( resolve => setTimeout(resolve, 3500) );
      setUser({
        profilePicture: "user" + user.userId + ".png",
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        password: user.password,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber
      })

      setEditing(!editing);

    }
    if (validateStringLength(2, [newFirstName, newLastName])) {
      await axios.patch(BASE_URL + "api/users/" + user.userId.toString(), [
        {
          op: "replace",
          path: "/firstName",
          value: newFirstName
        },
        {
          op: "replace",
          path: "/lastName",
          value: newLastName
        }
      ], {
        headers: { "Content-Type": "application/json-patch+json; charset=UTF-8" }
      })

      let profilePic = newPhoto != null && "user" + user.userId + ".png";
      console.log("Profile pic: " + profilePic);
      setUser({
        profilePicture: profilePic,
        userId: user.userId,
        firstName: newFirstName,
        lastName: newLastName,
        email: user.email,
        username: user.username,
        password: user.password,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber
      })

      setEditing(!editing);
    }

    navigate(0);

  }

  const handleCancel = () => {
    setNewFirstName("");
    setNewLastName("");
    setNewPhoto(undefined);
    setEditing(!editing)
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    let ect = event.currentTarget;
    if (ect.name === "firstNameField") setNewFirstName(ect.value);
    else if (ect.name === "lastNameField") setNewLastName(ect.value);
    else if (ect.name === "profilePicture") setNewPhoto(ect.files![0])
    else {
      console.log("NAME ERROR!");
    }

    console.log(ect.value)
  }

  return (
    <Grid container>
      <Grid xs />
      <Grid xs={10}>
        <Paper sx={{
          width: "100%",
          height: 700
        }} variant="elevation" elevation={3}>
          <Grid direction="column" container sx={{ padding: 2 }}>
            <Grid container direction="row">
              <Grid container xs={12}>
                <Grid xs={2} />
                <Grid xs={8} direction="column" container alignItems="center" justifyContent="center">
                  {
                    editing ?
                      <Grid container direction="column" alignItems="center" justifyContent="center">
                        {
                          data.profilePicture.length > 0 &&
                          <Avatar sx={{ width: 100, height: 100 }} src={require("images/profiles/" + data.profilePicture)} />
                        }
                        <IconButton sx={{ position: "absolute", opacity: 0.75, width: 100, height: 100 }} component="label">

                          <Avatar sx={{ width: 100, height: 100 }}>
                            <AddAPhotoIcon />
                          </Avatar>
                          <input name="profilePicture" hidden onChange={handleOnChange} accept="image/*" type="file" />
                        </IconButton>
                      </Grid> :

                      <div>
                        {
                          data.profilePicture.length > 3 ?
                            < Avatar src={require("images/profiles/" + data.profilePicture)} sx={{ width: 100, height: 100 }} />
                            :
                            < Avatar sx={{ width: 100, height: 100 }} />
                        }

                      </div>




                  }

                  {!editing ?
                    <Typography variant="h6">{data.firstName + " " + data.lastName}</Typography> :
                    <Grid container justifyContent="center" columnGap={2} sx={{ mt: 1 }}>
                      <TextField size='small' variant='standard' onChange={handleOnChange} name='firstNameField' defaultValue={data.firstName}></TextField>
                      <TextField size='small' variant='standard' onChange={handleOnChange} name="lastNameField" defaultValue={data.lastName}></TextField>
                    </Grid>

                  }
                </Grid>
                <Grid justifyContent="flex-end" container xs={2}>
                  {user.userId === data.userId && (
                    editing ?
                      <Grid container direction="column" rowGap={2} justifyContent="flex-start">
                        <Button variant='contained' color="success" onClick={handleSaveChanges}>
                          {t("save-changes")}
                        </Button>
                        <Button variant="contained" color='error' onClick={handleCancel}>
                          {t("cancel")}
                        </Button>
                      </Grid> :
                      <Tooltip title="Edit Profile">
                        <IconButton
                          sx={{
                            width: 30,
                            height: 30
                          }}
                          onClick={() => { setEditing(!editing) }}>
                          <SettingsIcon />
                        </IconButton>
                      </Tooltip>)
                  }
                </Grid>
              </Grid>
            </Grid>
            <Grid container xs={9}>

            </Grid>
          </Grid>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                <Tab label={t("user-posts", "Posts")} value="1" />
                <Tab label={t("user-info", "User Info")} value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">

              <UserPosts loading={loading} posts={userPosts} />


            </TabPanel>
            <TabPanel value="2">
              <Typography>Email: {data.email}</Typography>
            </TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext>

        </Paper>
      </Grid >
      <Grid xs />
    </Grid >
  )
}

export default Profile;