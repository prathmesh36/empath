import React from 'react'
import TextField from '@mui/material/TextField';
import '../stylesheets/ChatBoxInput.css';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

export const ChatBoxInput = ({callMessagingAddApi, callMessagingFetchApi, clientId, userId}) => {
    let [inputMessage, setInputMessage] = React.useState("");
    return (
        <>
            <form className={"messaging-wrap-form"}  noValidate autoComplete="off">
                <TextField
                    id="standard-text"
                    label="Please type your message here"
                    className={"messaging-wrap-text"}
                    onChange={(event)=>{setInputMessage(event.target.value)}}
                />
                <Button variant="contained" color="primary"
                        onClick={()=>{
                            callMessagingAddApi({message:inputMessage, clientId, userId, flow:true}).then(()=>{
                                callMessagingFetchApi();
                            });
                        }}
                        className={"button"}>
                    <SendIcon />
                </Button>
            </form>
        </>
    )
}



