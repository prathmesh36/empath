import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function preventDefault(event) {
    event.preventDefault();
}

export default function Deposits({userData}) {
    return (
        <React.Fragment>
            <Title Icon={<AttachMoneyIcon className={"profile-icon"}/>}>Empath Credits</Title>
            <Typography component="p" variant="h4">
                ${userData.points}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                on {new Date(Date.now()).toDateString()}
            </Typography>
        </React.Fragment>
    );
}