import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ toggle, setToggle }) => {

    

    const { user } = useSelector(state => state.auth)

    return (
        <nav style={{ clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)"}} className="navbar">
        <ul className="nav-links">
            <Link to="/" onClick={() => setToggle(false)} className="nav-link">
            <i class="bi bi-house-door-fill"></i> Home
            </Link>
            <Link to="/posts" onClick={() => setToggle(false)} className="nav-link">
            <i class="bi bi-stickies-fill"></i> Posts
            </Link>
            {
                user && (
                    <Link to="/posts/create-post" onClick={() => setToggle(false)} className="nav-link">
                    <i class="bi bi-plus-square-fill"></i> Create
                    </Link>

                )
            }
           {
               user?.isAdmin && (
                   <Link to="/admin" onClick={() => setToggle(false)} className="nav-link">
                    <i class="bi bi-person-lines-fill"></i> Admin Dashboard
                   </Link>
            )
           }
        </ul>
    </nav>
    );
};

export default Navbar;