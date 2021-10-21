import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";
import { eventLogout } from "./events";


export const startLogin = (email: string, password: string) => {
    return async( dispatch ) => {
        const resp = await fetchSinToken('auth', {email, password}, 'POST');
        const body = await resp.json();

        if(body.ok){ 
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        }else{
            Swal.fire('Error', body.msg, 'error');
        }
    }
}


export const startRegister = (name: string, email: string, password: string) => {
    return async( dispatch ) => {
        const resp = await fetchSinToken('auth/new', {name, email, password}, 'POST');
        const body = await resp.json();

        if(body.ok){ 
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        }else{
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startChecking = () => {
    return async( dispatch ) => {
        const resp = await fetchConToken('auth/renew', '');
        const body = await resp.json();

        if(body.ok){ 
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        }else{
            dispatch(checkingFinish())
        }
    }
}

const checkingFinish = () => ({
    type: types.authCheckingFinish
})

const login = ( user: any) => ({
    type: types.authLogin,
    payload: user
});

export const startLogout = () =>{
     return (dispatch: any) => {
        localStorage.clear();
        dispatch(eventLogout());
        dispatch( logout() );
     }
}


const logout = () => ({
    type: types.authStartLogout
})