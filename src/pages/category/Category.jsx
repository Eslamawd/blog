import { useParams, Link } from "react-router-dom";
import "./category.css"
import PostList from "../../components/post/PostList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostCategory } from "../../redux/apiCalls/postApiCall";

const Category = () => {
    const { category } = useParams()
    const dispatch = useDispatch()
    const { postsCat } = useSelector(state => state.post)



    useEffect(() => {
        dispatch(getPostCategory(category))
        window.scrollTo(0, 0)
      }, [category])

    return (
        <section className="category">
            {postsCat.length === 0 ?
                <>
                <h1 className="category-title">
                    Posts {category} not found
                </h1>
                <Link to="/posts" className="category-not-found-link"></Link>
                </> :
                <>
                <h1 className="category-title">Posts bassed on {category}</h1>
                <PostList posts={postsCat}/>
                </>
                }
        </section>
    );
};

export default Category;