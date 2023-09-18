import { useEffect, useState } from 'react';
import './message.css';
import io from 'socket.io-client';
import { useSelector, useDispatch } from "react-redux";
import {  useParams } from "react-router-dom";
import { newMessageOn } from '../../redux/apiCalls/messageApiCall';

const Message = () => {
    


    const dispatch = useDispatch();
    const { id } = useParams();
    const { user } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const [messages, setMessages] = useState([]);


    const frindData = message?.chat?.userInChat?.find(frind => frind.id !== user._id);

    console.log(frindData)
   

  
      useEffect(() => {

        dispatch(newMessageOn(id))

     }, [])


    return (
        
       <section className="message-continar">
                    <div className="frind-data">
                        <img 
                            src={frindData?.profilePhoto?.url}
                            alt=""
                            className="table-user-image"
                        />
                        <h1 className="">
                        {frindData?.username}
                        </h1>
                    </div>
                  {}
                    <div className="send-on-message">
                      
                              <input 
                              type="text"
                              className="send-message-input" 
                              placeholder='UserName'
                              onChange={(e) => setMessages(e.target.value)}
                              />

                   
                    <button className="send-message">
                    </button>
                    </div>
        </section>
    );
};

export default Message;