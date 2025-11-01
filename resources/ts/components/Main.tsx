import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import { Box } from '@mui/system'
import Navigation from "./Navigation.js"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Example from "../pages/Example.js";
import Home from "../pages/Home.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { unstable_composeClasses } from "@mui/material";

const client = new QueryClient();

const Main = () => {
    console.log('main');
    return (
        <Box>
            <Navigation />

            <Router>
                <QueryClientProvider client={client}>
                <main className={"m-5"}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </main>
                </QueryClientProvider>
            </Router>

        </Box>
    );
}

export default Main;