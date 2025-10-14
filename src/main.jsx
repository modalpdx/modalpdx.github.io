import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainTemplate from './routes/_mainTemplate/MainTemplate.jsx'
import PageHome from './routes/home/PageHome.jsx'
import PagePosts from './routes/posts/PagePosts.jsx'
import { pagePostsLoader } from './routes/posts/js/PagePostsHelpers.js'
import PageError from './routes/error/PageError.jsx'
import { createHashRouter, RouterProvider } from 'react-router'

// createHashRouter is used for GitHub Pages compatibility (static site, 
// no server-side routing, "#" URLs are necessary to load subpages like 
// /posts which in the site URL would be site.com/#/posts, not site.com/posts).
const router = createHashRouter([
  {
    path: "/",
    element: <MainTemplate />,
    errorElement: <PageError />,
    children: [
      {
        index: true,
        element: <PageHome />,
      },
      {
        path: "posts",
        element: <PagePosts />,
        loader: pagePostsLoader,
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
