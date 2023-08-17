import { IPost } from '@api/Interfaces'
import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { createAPIEndpoint, ENDPOINTS } from '../../api'
import PostCard from './PostCard'

type PostContainerProps = {
  currentCategory: string,
  postsPerPage: number,
  setPageCount: any,
  currentPageCount: number
}

const PostContainer = (props: PostContainerProps) => {
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [postCount, setPostCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const offsetStart: number = +searchParams.get("pageOffset")!;
  const query_text = searchParams.get("query_text");
  const offsetEnd = offsetStart + props.postsPerPage;
  const { t } = useTranslation();

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.posts)
      .fetch()
      .then((res) => {
        setPosts(res.data);
        setPostCount(res.data.length);
        setLoading(false);
      })
      .catch(error => console.log(error));

    props.setPageCount(1);
  }, []);

  const DisplayPostCards = () => {
    if (posts.length > 0) {
      const categoryParam = searchParams.has("categoryId") ? searchParams.get("categoryId") : "";
      const lowerQT = searchParams.has("query_text") ? searchParams.get("query_text")!.toLowerCase() : "";
      const filteredPosts = posts.filter((post: IPost) => {

        if (categoryParam != "") {
          if ((post.title.toLowerCase().includes(lowerQT) ||
            post.text.toLowerCase().includes(lowerQT)) &&
            post.categoryId == categoryParam) {
            return (
              post
            );
          }
        }
        else {
          if (post.title.toLowerCase().includes(lowerQT) ||
            post.text.toLowerCase().includes(lowerQT)) {
            return (
              post
            );
          }
        }

      })
      props.setPageCount(Math.ceil(filteredPosts.length / props.postsPerPage));
      if (filteredPosts.length == 0) return <h2>No posts found.</h2>
      return (
        filteredPosts
          .slice(offsetStart, offsetEnd)
          .map((post: IPost, i) => {
            return CreatePostCard(post, i);
          })
      )
    }
  }
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
    <Grid
      container
      columns={{}}
      justifyContent="center"
      alignItems="center"
      sx={{
        ml: 3
      }}
    >
        {DisplayPostCards()}
    </Grid>



  )
}

export default PostContainer;