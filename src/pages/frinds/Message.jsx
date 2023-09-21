import { useEffect, useState } from 'react';
import './message.css';
import io from 'socket.io-client';
import { useSelector, useDispatch } from "react-redux";
import {  useParams } from "react-router-dom";
import { newMessageOn } from '../../redux/apiCalls/messageApiCall';

const Message = () => {
    
        

    const socket = io('https://blog-api-61qi.onrender.com')

    const dispatch = useDispatch();
    const { id } = useParams();
    const { user } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const [messages, setMessages] = useState([]);
    const [newSend, setNewSend] = useState([]);
    
    

    const messageInChatAraay = message?.message;
    
    
    const frindData = message?.chat?.userInChat?.find(frind => frind.id !== user._id);
    
    
    const messagesData = messageInChatAraay?.map((item) => (item?.sender.toString() === user?._id) ? (
        
                           <div className="me-message">
                                 <img 
                                    src={user?.profilePhoto?.url}
                                    alt=""
                                    className="table-user-image"
                                />
                                <span> {item.content}Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ut rem tempora quam dicta, sint odio adipisci neque veritatis ab unde minus alias atque, corporis autem saepe aperiam, vel inventore.</span>

                         </div>
                           
                        ) : (
                           
                              <div className="frends-message">
                                    <img 
                                            src={frindData?.profilePhoto?.url}
                                            alt=""
                                            className="table-user-image"
                                    />
                                     <span>{item.content} Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ut rem tempora quam dicta, sint odio adipisci neque veritatis ab unde minus alias atque, corporis autem saepe aperiam, vel inventore.</span>
                            </div>
                           
                        )
                    )

                    const data = {
                        chatId: message?.chat?._id,
                        sender: user._id,
                        content: newSend,
                        frindId: frindData?._id
                    }


                   const sendNewMessage = (data) =>  {
                     socket.emit('sendNewMessage', data)
                     setNewSend('')
                   }
 

    console.log(frindData)
   useEffect(() => {
       dispatch(newMessageOn(id))

   }, [])

  
      useEffect(() => {
        const chatId = message?.chat?._id
        socket.emit('newConnectChat', chatId)
        socket.on('newMessage', data => {
               setMessages((messag) => [ ...messag, data])
        })
       
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
                        {frindData?.username} salma awod
                        </h1>
                    </div>
                  <div className="chat-message">
                    {messagesData}
                    { messages?.map((item) => (item.sender === user._id) ? (
                            <div className="me-message">
                            <img 
                               src={user?.profilePhoto?.url}
                               alt=""
                               className="table-user-image"
                           />
                           <span> {item.content}Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ut rem tempora quam dicta, sint odio adipisci neque veritatis ab unde minus alias atque, corporis autem saepe aperiam, vel inventore.</span>

                    </div>
                        ) : (
                            <div className="frends-message">
                            <img 
                                    src={frindData?.profilePhoto?.url}
                                    alt=""
                                    className="table-user-image"
                            />
                             <span>{item.content} Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ut rem tempora quam dicta, sint odio adipisci neque veritatis ab unde minus alias atque, corporis autem saepe aperiam, vel inventore.</span>
                    </div>
                        ))
                    }
                  
                  </div>
                    <div className="send-on-message">
                      
                              <input 
                              type="text"
                              className="send-message-input" 
                              placeholder='  Message'
                              onChange={(e) => setNewSend(e.target.value)}
                              />

                   
                    <button className="send-message" onClick={() => sendNewMessage(data)}>
                        Send
                    </button>
                    </div>
        </section>
    );
};

export default Message;