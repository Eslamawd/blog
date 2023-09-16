import React from 'react';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSelector, useDispatch } from "react-redux";
import { getChatMe} from '../../redux/apiCalls/messageApiCall';

const Chats = () => {
    const dispatch = useDispatch()

    const { chat } = useSelector(state => state.message)

    console.log(chat)


    
    useEffect(() => {

        dispatch(getChatMe())

     }, [dispatch])
    return (
        <div>
            
        </div>
    );
};

export default Chats;