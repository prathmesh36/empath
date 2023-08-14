import * as React from 'react';
import AppHeader from './AppHeader';
import '../stylesheets/App.css';
import CssBaseline from '@mui/material/CssBaseline';
import AppBody from './AppBody';
import 'react-toastify/dist/ReactToastify.css';
import {ColorModeProvider} from "../theme/ColorModeProvider";
import {AuthProvider} from "../auth/AuthProvider";
import {HashRouter as Router} from "react-router-dom";

export default function App() {



  return (
        <>
            <ColorModeProvider>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Router>
                    <AuthProvider>
                        <AppHeader/>
                        <AppBody/>
                    </AuthProvider>
                </Router>
            </ColorModeProvider>
        </>
  );
}
