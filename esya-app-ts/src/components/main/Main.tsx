import { Button, ButtonGroup, Grid, Pagination, Paper, styled, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import PostContainer from './PostContainer';
import { IPost } from '../../api/Interfaces';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { t } from 'i18next';
import NewCategoryBar from './NewCategoryBar';

type MainProps = {
  showPost: IPost
}

const Main = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentCategory, setCurrentCategory] = useState("none");
  const { state } = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState<IPost>();
  const postsPerPage = 20;
  const [pageCount, setPageCount] = useState(0);

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    const offset = (value - 1) * postsPerPage;
    if (searchParams.has("pageOffset") && value == 1) {
      searchParams.delete("pageOffset");
    }
    else if (searchParams.has("pageOffset") && value >= 2) {
      searchParams.set("pageOffset", offset.toString());
    }
    else if (value >= 2) {
      searchParams.append("pageOffset", offset.toString());
    }
    setSearchParams(searchParams);
  }

  useEffect(() => {
    if (searchParams.has("categoryId") && currentCategory == "none") {
      searchParams.delete("categoryId");
    }
    else if (searchParams.has("categoryId") && currentCategory != "none") {
      searchParams.set("categoryId", currentCategory);
    }
    else if (currentCategory != "none") {
      searchParams.append("categoryId", currentCategory);
    }
    setSearchParams(searchParams);
  }, [currentCategory])

  return (
    <Grid container marginTop={2} spacing={0}>

      <Grid xs>
      </Grid>

      <Grid container xs={10}>
        <Grid container
          xs={2}
          justifyContent="center"
        >
          {/* <CategoryBar currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} /> */}
          <NewCategoryBar currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
        </Grid>
        <Grid xs={9}>
          <Grid justifyContent="space-between" container direction="row">
            <Typography sx={{ paddingLeft: 6 }} variant='h5'>{t("recent-posts", "Recent Posts")}</Typography>
            <Button onClick={()=>{navigate("/newpost")}} variant='outlined'>
              {t("new-post", "New Post")}
              </Button>
          </Grid>

          <PostContainer currentPageCount={pageCount} setPageCount={setPageCount} postsPerPage={postsPerPage} currentCategory={currentCategory} />
          <Grid
            container
            justifyContent="center"
            alignItems="center"
          >
            {pageCount > 1 &&
              <Pagination
                sx={{ marginTop: 2, marginBottom: 2 }}
                count={pageCount}
                variant="outlined"
                shape="rounded"
                onChange={handlePageChange} />
            }

          </Grid>

        </Grid>
      </Grid>



      <Grid xs>
      </Grid>
    </Grid>
  )
}

export default Main;