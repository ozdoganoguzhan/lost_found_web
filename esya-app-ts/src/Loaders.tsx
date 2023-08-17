import { IPost } from "@api/Interfaces";
import { url } from "inspector"
import { createAPIEndpoint, ENDPOINTS } from "./api"

export const postLoader = async ({ params }: any) => {
  let userData;
  let postData!: IPost;

  await createAPIEndpoint(ENDPOINTS.posts)
    .fetchById(params.postId)
    .then(res => {
      postData = res.data;
    });

  await createAPIEndpoint(ENDPOINTS.users)
    .fetchById(postData!.userId)
    .then(userRes => {
      userData = userRes.data;
    })

  return { userData, postData }

}

export const userLoader = async ({ params }: any) => {
  return await createAPIEndpoint(ENDPOINTS.users)
    .fetchById(params.userId);
}
