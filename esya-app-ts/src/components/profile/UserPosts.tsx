import { IPost } from 'api/Interfaces'
import PostCard from 'components/main/PostCard'
import { Grid } from '@mui/material'
import React from 'react'
import { Box } from '@mui/system'

type UserPostsProps = {
  posts: Array<IPost>,
  loading: boolean
}

const UserPosts = ({ posts, loading }: UserPostsProps) => {

  const CreatePostCard = (post: IPost, i: number) => {
    return (
      <Grid margin={1} md={3} key={i}>
        <PostCard
          postId={post.postId}
          category={post.categoryId}
          title={post.title}
          imageUrl={post.imageUrl}
          text={post.text}
          city={post.city}
          loading={loading}
        />
      </Grid>
    )
  }
  return (

    <Box sx={{ maxHeight: 400, overflow: "auto", width: "100%" }}>
      <Grid
        container
        columns={{}}
        justifyContent="left"
        alignItems="center"
      >
        {posts.map((post: IPost, i) => {
          return CreatePostCard(post, i);
        })}
      </Grid>

    </Box>

  )
}

export default UserPosts