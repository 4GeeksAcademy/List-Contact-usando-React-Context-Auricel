import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import injectContext from './store/appContext';

import Agenda from './views/agenda.js';
import Formulario from './views/formulario.js';

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || '';

    return (
        <div>
            <BrowserRouter basename={basename}>
                <Routes>
                    <Route path="/" element={<Agenda />} />
                    <Route path="/formulario" element={<Formulario />} />
                    <Route path="/formulario/:id" element={<Formulario />} />

                    <Route path="*" element={<h1>Not found!</h1>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);