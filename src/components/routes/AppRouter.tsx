import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { startChecking } from '../../actions/auth';
import LoginScreen from '../auth/LoginScreen';
import ScheduleScreen from '../schedule/ScheduleScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => (state as any).auth)


    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        exact 
                        path="/login" 
                        component={LoginScreen} 
                        isAuthenticated={ !!uid }
                    />
                    <PrivateRoute 
                        exact path="/" 
                        component={ScheduleScreen} 
                        isAuthenticated={ !!uid }                        
                    />
                    <Redirect to="/"/>
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter
