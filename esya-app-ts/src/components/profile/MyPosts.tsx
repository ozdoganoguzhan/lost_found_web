import { createAPIEndpoint, ENDPOINTS } from 'api/index';
import { IPost } from 'api/Interfaces';
import { Grid, Typography } from '@mui/material'
import { UserContext } from 'context/UserContext';
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import UserPosts from './UserPosts';

const MyPosts = () => {
  const { user, setUser } = useContext(UserContext);
  const [userPosts, setUserPosts] = useState(Array<IPost>);
  const [loading, setLoading] = useState(true);
  
  React.useEffect(() => {
    createAPIEndpoint(ENDPOINTS.posts)
      .fetchPostByUserId(user.userId)
      .then(res => {
        setUserPosts(res.data);
        setLoading(false);
      })
  }, [])
  const { t } = useTranslation();
  return (
    <Grid container>
      <Grid xs>

      </Grid>
      <Grid xs={10}>
        <Grid>
          <Typography variant="h5">
            {t("my-posts", "My Posts")}
          </Typography>
        </Grid>
        <Grid>
          <UserPosts posts={userPosts} loading={loading} />
        </Grid>


      </Grid>

      <Grid xs>

      </Grid>
    </Grid>
  )
}

export default MyPosts