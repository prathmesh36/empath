import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import '../stylesheets/ExperienceModal.css'
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DescriptionIcon from '@mui/icons-material/Description';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import useMediaQuery from '@mui/material/useMediaQuery';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import QRCode from "react-qr-code";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function ExperienceModal({card}) {
    const [open, setOpen] = React.useState(false);
    const mqModalHeading = useMediaQuery('(max-width:400px)');

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" sx={{mr:2}} onClick={handleClickOpen}>
                More Details
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth={true} maxWidth={"lg"}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {card.expName}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Grid container className={"modal-first-row"}>
                        <Grid item xs={12} md={ card.order ? 6 : 12 }>
                            <Box className={"modal-image-box"}>
                                <img className={"modal-image"} src={card.expPhotoUrl} alt={"poster"}/>
                            </Box>
                        </Grid>
                        {
                            card.order ?
                            (
                                <Grid item xs={12} md={ card.order ? 6 : 12 } className={"modal-image-grid"}>
                                    <Box className={"modal-image-box"}>
                                        <div style={{ height: "auto", margin: "0 auto", maxWidth: 200, width: "100%" }}>
                                            <Typography variant={"h4"} sx={{marginBottom:"10px"}}> Your Access:</Typography>
                                            <QRCode
                                                size={1024}
                                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                                value={card.order.orderId}
                                                viewBox={`0 0 256 256`}
                                            />
                                        </div>
                                    </Box>
                                </Grid>
                            )
                            :
                            (<></>)
                        }
                    </Grid>
                    <Grid container className={"modal-first-row"}>
                        <Grid item xs={6}>
                            <Typography  className={mqModalHeading?"modal-headings-mobile":"modal-headings"} variant={"h6"} gutterBottom>
                                <LocationOnIcon/> Location:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography  variant={"h6"} className={mqModalHeading?"modal-values-mobile":"modal-values"}  gutterBottom>
                                {card.expLocation}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={6}>
                            <Typography  className={mqModalHeading?"modal-headings-mobile":"modal-headings"} variant={"h6"} gutterBottom>
                                <AttachMoneyIcon/> Cost:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography  variant={"h6"} className={mqModalHeading?"modal-values-mobile":"modal-values"}  gutterBottom>
                                ${card.expCost}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={6}>
                            <Typography className={mqModalHeading?"modal-headings-mobile":"modal-headings"} variant={"h6"} gutterBottom>
                                <AddShoppingCartIcon/> In Stock:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant={"h6"} className={mqModalHeading?"modal-values-mobile":"modal-values"}  gutterBottom>
                                {card.expQuantity} pcs.
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={6}>
                            <Typography className={mqModalHeading?"modal-headings-mobile":"modal-headings"} variant={"h6"} gutterBottom>
                                <DescriptionIcon/> Description:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant={"h6"} className={mqModalHeading?"modal-values-mobile":"modal-values"}  gutterBottom>
                                {card.expDescription}
                            </Typography>
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}