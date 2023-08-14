import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {Divider} from "@mui/material";

export default function CreditBalance({itemDetails, user}) {

    return (
        <React.Fragment>
            <Typography variant="h6" sx={{pb:1}} gutterBottom>
                Empath Credit Balance
            </Typography>
            <Divider sx={{mb:2}}/>
            <List disablePadding>
                <ListItem key={"current-credit"} sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={"Current Credit"} secondary={"Available Empath credits"} />
                    <Typography variant="body2">${user.user.userPoints}</Typography>
                </ListItem>
                <ListItem key={"purchased-item-credit"}  sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={"Purchased Item Cost"} secondary={"Current debit"} />
                    <Typography variant="body2">-${Number(itemDetails.expCost) * Number(itemDetails.expSelectedQuantity)}</Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Remaining Balance" secondary={"Credit left after purchase"} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {parseInt(user.user.userPoints) - (parseInt(itemDetails.expCost) * parseInt(itemDetails.expSelectedQuantity)) >= 0 ? "$" + (parseInt(user.user.userPoints) - (parseInt(itemDetails.expCost) * parseInt(itemDetails.expSelectedQuantity)) ) : "Not Sufficient Balance"}
                    </Typography>
                </ListItem>
            </List>
        </React.Fragment>
    );
}