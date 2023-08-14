import React from "react";
import '../stylesheets/Message.css';
import Avatar from "@mui/material/Avatar";
import {formatDate} from "../utility/utility";
import Typography from "@mui/material/Typography";

export const MessageLeft = (props) => {
    const message = props.message ? props.message : "no message";
    const timestamp = props.timestamp ? props.timestamp : "";
    const photoURL = props.photoURL ? props.photoURL : "dummy.js";
    const displayName = props.displayName ? props.displayName : "名無しさん";
    return (
        <>
            <div className={"messaging-message-row"}>
                <Avatar
                    alt={displayName}
                    src={photoURL}
                ></Avatar>
                <div>
                    <div className={"messaging-display-name"}>
                        <Typography variant={"body2"}>{displayName}</Typography>
                    </div>
                    <div className={"messaging-message-grey"}>
                        <div>
                            <p className={"messaging-message-content messaging-message-content-grey"}>{message}</p>
                        </div>
                        <div className={"messaging-message-time-stamp messaging-message-time-stamp-grey"}>{formatDate(timestamp)}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export const MessageRight = (props) => {
    const message = props.message ? props.message : "no message";
    const timestamp = props.timestamp ? props.timestamp : "";
    return (
        <div className={"messaging-message-row-right"}>
            <div className={"messaging-message-light-grey"}>
                <p className={"messaging-message-content messaging-message-content-light-grey"}>{message}</p>
                <div className={"messaging-message-time-stamp messaging-message-time-stamp-light-grey"}>{formatDate(timestamp)}</div>
            </div>
        </div>
    );
};
