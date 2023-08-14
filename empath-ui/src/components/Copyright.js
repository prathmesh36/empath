import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import * as React from "react";
import '../stylesheets/Copyright.css';

export default function Copyright() {
    return (
        <Typography className={"copyright-footer"} variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Empath
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}