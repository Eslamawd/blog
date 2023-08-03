import "./post.css";
import PostList from "../../components/post/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import Pagination from "../../components/pagination/Pagination";
import { useEffect, useState } from "react";

import { fetchPosts, getPostCount } from "../../redux/apiCalls/postApiCall";
import { useDispatch, useSelector } from "react-redux";

const POST_PER_PAGE = 3;

const Post = () => {

  const dispatch = useDispatch()
  const { postsCount, posts } = useSelector(state => state.post)

  const [currentPage, setCurrentPage] = useState(1)

  const pages = Math.ceil(postsCount / POST_PER_PAGE)

  
  useEffect(() => {
    dispatch(fetchPosts(currentPage))
    window.scrollTo(0, 0)
  }, [currentPage, dispatch]);

  useEffect(() => {
    dispatch(getPostCount())
  }, [dispatch]);
    return (
       <>
       <section className="posts-page">
        <PostList posts={posts} />
        <Sidebar  />
       </section>
       <Pagination
       pages={pages}
       currentPage={currentPage}
       setCurrentPage={setCurrentPage}
       />
       </>
    );
};

export default Post;