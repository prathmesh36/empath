import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {Divider} from "@mui/material";


export default function Review({addressInfo, itemDetails, user}) {

    return (
        <React.Fragment>
            <Typography variant="h6" sx={{pb:1}} gutterBottom>
                Order summary
            </Typography>
            <Divider sx={{mb:2}}/>
            <List disablePadding>
                <ListItem key={itemDetails.expName} sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={itemDetails.expName + " x " + itemDetails.expSelectedQuantity} secondary={itemDetails.expDescription + " - " + itemDetails.expLocation}  />
                    <Typography variant="body2">${itemDetails.expCost  + " x " + itemDetails.expSelectedQuantity}</Typography>
                </ListItem>
                <ListItem key={"Tax"} sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={"Tax"} secondary={""}  />
                    <Typography variant="body2">Free</Typography>
                </ListItem>
                <ListItem key={"Shipping"} sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={"Shipping"} secondary={""}  />
                    <Typography variant="body2">Free</Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        ${Number(itemDetails.expCost) * Number(itemDetails.expSelectedQuantity)}
                    </Typography>
                </ListItem>
            </List>
            {/*<hr className={"horizontal-row"}/>*/}
            <Divider sx={{mb:2}}/>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>{addressInfo.userFirstName + " " + addressInfo.userFirstName }</Typography>
                    <Typography gutterBottom>
                        {
                            addressInfo.userAddress1
                            + ((addressInfo.userAddress2) ? (", " + addressInfo.userAddress2) : (" "))
                            + ", " + addressInfo.userState
                            + " " + addressInfo.userZip
                            + ", " + addressInfo.userCountry
                        }</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Empath Credit details
                    </Typography>
                    <Grid container>
                        <React.Fragment>
                            <Grid item xs={6}>
                                <Typography gutterBottom>Account Owner:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>{user ? user.user.userFirstName + " " + user.user.userFirstName  : "N/A"}</Typography>
                            </Grid>
                        </React.Fragment>
                        <React.Fragment>
                            <Grid item xs={6}>
                                <Typography gutterBottom>Empath Credits:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>{user ? "$"+user.user.userPoints : "N/A"}</Typography>
                            </Grid>
                        </React.Fragment>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}