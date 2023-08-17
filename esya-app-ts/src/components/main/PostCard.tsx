import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Divider, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type PostCardProps = {
  postId: number,
  category: string,
  title: string,
  imageUrl: string,
  text: string,
  city: string,
  loading: boolean
}

const PostCard = (props: PostCardProps) => {

  const navigate = useNavigate();

  const postCardClickHandler = () => {
    navigate("/posts/" + props.postId);
  }

  return (

    <Card sx={{ 
     width: {xs: 100, md: 200, lg: 250}, margin: 0 }}>
      {
        !props.loading?
          <CardActionArea onClick={postCardClickHandler}>
            <CardMedia
              sx={{height: {xs: 100, md: 120, lg: 140}}}
              image={require("../../images/posts/" + props.imageUrl)}
              title={props.title + "kdlfgnsdnfgsdjnfgkjsdngjknsjdnfgjsjkfnsfkffg"}
            />
            <CardContent sx={{width: {xs: 100, md: 200, lg: 250}}}>
              <Typography sx={{typography: {xs: "caption", md: "body2", lg: "body1"}}} noWrap color="text.secondary2" gutterBottom>
                {props.title}
              </Typography>
              <Divider />
              <Typography sx={{ alignSelf: "flex-end", justifySelf: "flex-end" }} variant="caption" color="text.secondary">
                {props.city}
              </Typography>
            </CardContent>
          </CardActionArea> : 
          <div>
            <Skeleton variant="rectangular" width={250} height={118} />
            <Divider />
            <Skeleton variant='rectangular' width= {100} height={20} />
            <Skeleton variant='rectangular' width= {40} height={20} />
          </div>
      }

    </Card>

  )
}

export default PostCard;