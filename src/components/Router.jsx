import React, { Component } from 'react'
import Dashboard from './Dashboard';
import {BrowserRouter,Switch,Route} from "react-router-dom";


const AppRouter = () => (
                    <BrowserRouter>
                            {/* <Dashboard /> */}
                            <Switch>
                                <Route path = "/" component ={Dashboard} exact/>
                                
                            </Switch>
                    </BrowserRouter>
    )
    export default AppRouter;