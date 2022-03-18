import React, {createContext, useEffect, useMemo, useState} from 'react';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import NavBar from "../components/NavBar";
import Rides from "../components/Rides";
import Head from 'next/head';

const ColorModeContext = createContext({
    toggleColorMode: () => {
    }
});

const Home = (props) => {

    const [mode, setMode] = useState('light');

    useEffect(() => {
        setMode(localStorage.getItem('theme'));
    }, []);

    const theme = useMemo(() => createTheme({
        palette: {
            mode
        },
    }), [mode]);

    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            localStorage.setItem('theme', mode === 'light' ? 'dark' : 'light');
            setMode((prevMode) =>
                prevMode === 'light' ? 'dark' : 'light'
            )
        }
    }), [mode]);

    return (
        <>
            <Head>
                <title>Routes</title>
            </Head>
            {/*<ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>*/}
                    <CssBaseline/>
                    <NavBar colorMode={colorMode} mode={mode} theme={theme}/>
                    <Rides/>
                {/*</ThemeProvider>
            </ColorModeContext.Provider>*/}
        </>
    );
};

export default Home;