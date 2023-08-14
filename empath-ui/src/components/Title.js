import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import {Divider} from "@mui/material";

function Title(props) {
    return (
        <>
            <Box sx={{display:"flex"}}>
                {props.Icon}
                <Typography variant="h5" gutterBottom>
                    {props.children}
                </Typography>
            </Box>
            <Divider sx={{mb:2}}/>
        </>
    );
}

Title.propTypes = {
    children: PropTypes.node,
};

export default Title;