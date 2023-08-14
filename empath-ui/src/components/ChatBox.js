import React from "react";
import Paper from "@mui/material/Paper";
import { MessageLeft, MessageRight } from "./Message";
import {ChatBoxInput} from "./ChatBoxInput";
import '../stylesheets/ChatBox.css';
import Skeleton from "@mui/material/Skeleton";

export default function ChatBox({messages, callMessagingAddApi, callMessagingFetchApi, loading}) {
    return (
        <div className={"container"}>
            <Paper className={"messaging-paper"} sx={{borderLeft:'1px solid',borderColor: 'divider' }}>
                <Paper id="style-1" className={"messaging-messages-body"}>
                    {
                        (loading) ?
                        (
                            messages.filter((message)=>(!message.flow)).map((message, index)=>(
                                <MessageLeft
                                    key={"message-left-"+index}
                                    message={message.message}
                                    timestamp={message.createdTimestamp}
                                    displayName={message.clientName}
                                    avatarDisp={true}
                                />
                            ))
                        ):
                        (
                            <div>
                                <Skeleton variant="rectangular" sx={{marginBottom:"10px"}} width={350} height={118} />
                                <Skeleton variant="rectangular" sx={{marginBottom:"30px"}} width={250} height={70} />
                            </div>
                        )
                    }

                    {
                        (loading) ?
                        (
                            messages.filter((message)=>(message.flow)).map((message, index)=>(
                                <MessageRight
                                key={"message-left-"+index}
                                message={message.message}
                                timestamp={message.createdTimestamp}
                                avatarDisp={false}
                                />
                            ))
                        ):
                        (
                            <div className={"messaging-message-right-skeleton"}>
                                <Skeleton variant="rectangular" sx={{marginBottom:"10px"}} width={350} height={118} />
                                <Skeleton variant="rectangular" sx={{marginBottom:"30px"}} width={300} height={60} />
                            </div>
                        )
                    }


                </Paper>
                <ChatBoxInput callMessagingAddApi={callMessagingAddApi} callMessagingFetchApi={callMessagingFetchApi} clientId={messages[0]["clientId"]} userId={messages[0]["userId"]}/>
            </Paper>
        </div>
    );
}
