import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import * as React from "react";

export default function Copyright() {
  return (
    <Typography className={"ms-copyright"} variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Empath
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
