import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {Divider} from "@mui/material";

export default function AddressForm({register, errors, user}) {

    return (
        <React.Fragment>
            <Typography variant="h6" sx={{pb:1}} gutterBottom>
                Shipping address
            </Typography>
            <Divider sx={{mb:2}}/>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="userFirstName"
                        name="userFirstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        defaultValue={user ? user.user.userFirstName : ""}
                        {...register('userFirstName')}
                        error={!!errors.userFirstName}
                    />
                    <Typography variant="inherit" color="textSecondary">
                        {errors.userFirstName?.message}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="userLastName"
                        name="userLastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        defaultValue={user ? user.user.userLastName : ""}
                        {...register('userLastName')}
                        error={!!errors.userLastName}
                    />
                    <Typography variant="inherit" color="textSecondary">
                        {errors.userLastName?.message}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="userAddress1"
                        name="userAddress1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="shipping address-line1"
                        {...register('userAddress1')}
                        error={!!errors.userAddress1}
                    />
                    <Typography variant="inherit" color="textSecondary">
                        {errors.userAddress1?.message}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="userAddress2"
                        name="userAddress2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="shipping address-line2"
                        {...register('userAddress2')}
                        error={!!errors.userAddress2}
                    />
                    <Typography variant="inherit" color="textSecondary">
                        {errors.userAddress2?.message}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="userCity"
                        name="userCity"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                        {...register('userCity')}
                        error={!!errors.userCity}
                    />
                    <Typography variant="inherit" color="textSecondary">
                        {errors.userCity?.message}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="userState"
                        name="userState"
                        label="State/Province/Region"
                        fullWidth
                        defaultValue={user ? user.user.userState : ""}
                        {...register('userState')}
                        error={!!errors.userState}
                    />
                    <Typography variant="inherit" color="textSecondary">
                        {errors.userState?.message}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="userZip"
                        name="userZip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                        {...register('userZip')}
                        error={!!errors.userZip}
                    />
                    <Typography variant="inherit" color="textSecondary">
                        {errors.userZip?.message}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="userCountry"
                        name="userCountry"
                        label="Country"
                        fullWidth
                        autoComplete="shipping country"
                        defaultValue={user ? user.user.userCountry : ""}
                        {...register('userCountry')}
                        error={!!errors.userCountry}
                    />
                    <Typography variant="inherit" color="textSecondary">
                        {errors.userCountry?.message}
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}