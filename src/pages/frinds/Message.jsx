import { useEffect, useState } from 'react';
import './message.css';
import { useSelector, useDispatch } from "react-redux";
import {  useParams } from "react-router-dom";
import { newMessageOn } from '../../redux/apiCalls/messageApiCall';

const Message = ({ socket }) => {
    
        

    const dispatch = useDispatch();
    const { id } = useParams();
    const { user } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const [messages, setMessages] = useState([]);
    const [newSend, setNewSend] = useState('');
    
    

    const messageInChatAraay = message?.message;
    
    const chatId = message?.chat?._id;
    
    const frindData = message?.chat?.userInChat?.find(frind => frind.id !== user._id);
    
    
     
                    const data = {
                        chatId: chatId,
                        sender: user?._id,
                        content: newSend
                    }


                   const sendNewMessage = () =>  {
                     socket.emit('sendNewMessage', data);
                   }

                   
 

    console.log(messageInChatAraay)
    console.log(messages)

       useEffect(() => {
         dispatch(newMessageOn(id))
         socket.emit('newConnectChat', chatId)
         socket.on('newMessage', data => {
                       setMessages((messag) => [ ...messag, data])
                   })
             }, [messages,dispatch,chatId, socket, id])


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
                  <div className="chat-message">

                    {   messageInChatAraay?.map((item) =>  (
                        
                                    <div className={(item.sender === user?._id) ? "me-message" : "frends-message"}>
                                        <img 
                                            src={(item.sender === user?._id) ? user?.profilePhoto?.url : frindData?.profilePhoto?.url }
                                            alt=""
                                            className="table-user-image"
                                        />
                                        <span> {item.content}</span>

                                        </div>
                                    
                                        ))
                                                  
                            } { messages?.map((item) => (
                                                    <div className={(item.sender === user?._id) ? "me-message" : "frends-message"}>
                                                    <img 
                                                        src={user?.profilePhoto?.url}
                                                        alt=""
                                                        className="table-user-image"
                                                    />
                                                    <span> {item.content}</span>

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

                   
                    <button className="send-message" onClick={() => sendNewMessage()}>
                        Send
                    </button>
                    </div>
        </section>
    );
};

export default Message;