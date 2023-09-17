import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSelector, useDispatch } from "react-redux";
import {  useParams } from "react-router-dom";
import { newMessageOn } from '../../redux/apiCalls/messageApiCall';

const Message = () => {
    


    const dispatch = useDispatch();
    const { id } = useParams();
    const { user } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const [messages, setMessages] = useState([])



    console.log(message)
   

  
      useEffect(() => {

        dispatch(newMessageOn(id))

     }, [])


    return (
        
       <section className="message-continar">
          
            <h1 className="table-title">

            </h1>
        
                                <div className="table-image">
                                    <img 
                                        src='' 
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