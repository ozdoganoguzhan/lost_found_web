import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './components/login/SignUp';
import SignIn from './components/login/SignIn';
import "./i18n.tsx";
import Post from './components/main/Post';
import { postLoader, userLoader } from './Loaders';
import Main from './components/main/Main';
import { UserContextProvider } from './context/UserContext';
import Profile from './components/profile/Profile';
import MyPosts from 'components/profile/MyPosts';
import NewPost from 'components/profile/NewPost';

declare global {
  interface Window { cordova: any }
}

window.cordova = window.cordova || false;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "posts",
        element: <Main />,
      },
      {
        path: "posts/:postId",
        element: <Post />,
        loader: postLoader
      },
      {
        path: "users/:userId",
        element: <Profile />,
        loader: userLoader,
      },
      {
        path: "myposts/",
        element: <MyPosts />
      },
      {
        path: "newpost/",
        element: <NewPost />
      }
    ]
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />
  },

])

let startApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Suspense>
        <UserContextProvider>
          <RouterProvider router={router} />
        </UserContextProvider>
      </Suspense>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

if (!window.cordova) {
  startApp()
} else {
  document.addEventListener('deviceready', startApp, false)
}

  // const root = ReactDOM.createRoot(
  //   document.getElementById('root') as HTMLElement
  // );
  // root.render(
  //   <React.StrictMode>
  //     <Suspense>
  //       <UserContextProvider>
  //         <RouterProvider router={router} />
  //       </UserContextProvider>
  //     </Suspense>
  //   </React.StrictMode>
  // );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
