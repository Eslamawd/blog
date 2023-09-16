import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate , useParams } from "react-router-dom";
import { newMessageOn } from '../../redux/apiCalls/messageApiCall';

const Message = () => {
    
    const socket = io('https://blog-api-61qi.onrender.com')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const { user } = useSelector(state => state.auth)
    const { message } = useSelector(state => state.message)

    const [messages, setMessages] = useState([])

    const goToRequistProfile = (id) => {
        navigate(`/profile/${id}`)
    }


    console.log(message)
   

  
      useEffect(() => {

        dispatch(newMessageOn(id))

     }, [dispatch])


    return (
        
       <section className="message-continar">
          
            <h1 className="table-title">

            </h1>
        
                                <div className="table-image">
                                    <img 
                                        src={user} 
                                        alt=""
                                        className="table-user-image"
                                         
                                    />
                                    <span className="table-username">
                                        {}
                                    </span>

                </div>
            
        </section>
    );
};

export default Message;