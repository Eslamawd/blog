import { Link, useParams } from "react-router-dom";
import "./verify-email.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyEmail } from "../../redux/apiCalls/authApiCalls";

const VerifyEmail = () => {

    const dispatch = useDispatch();
    const { isEmailVerify } =  useSelector(state => state.auth);

    const {userId, token } = useParams();

    useEffect(()=> {
        dispatch(verifyEmail(userId, token));

    }, [userId, token]);
   
    return (
       <section className="verivy-email">
        {
            isEmailVerify ? 
                <>
                <i className="bi bi-patch-check verify-email-icon"></i>
                <h1 className="verify-email-title">
                    Your Email Adress has been successfully verified
                </h1>
                <Link to="/login" className="verify-email-link">
                Go To Login Page
                </Link>
                </> : <>
                <h1 className="verify-email-not-found">
                    Not Found
                </h1>
                </>
        }
       </section>
    );
};

export default VerifyEmail;