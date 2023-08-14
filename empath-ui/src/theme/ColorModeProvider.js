import * as React from "react";
import {useLocalStorage} from "../auth/LocalStorage";
import {useContext} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {DARK_MODE_PROFILE, LIGHT_MODE_PROFILE} from "../metadata/theme";
import {ToastContainer} from "react-toastify";


const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export const ColorModeProvider = ({ children }) => {
    const [mode, setMode] = useLocalStorage("theme", "dark");

    const toggleColorMode = () => {
        console.log(mode);
        setMode(mode === 'light' ? 'dark' : 'light');
    }

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode
        }),
        [mode],
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'light' ? LIGHT_MODE_PROFILE : DARK_MODE_PROFILE),
                },
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme={mode}
                />
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export const useColorMode = () => {
    return useContext(ColorModeContext);
};