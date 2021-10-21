import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { prepareEvents } from '../helpers/eventsPrepare';
import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";


export const eventStartAddNew = (event) => {
    return async(dispatch: any, getState: any) => {

        const { uid, name } = getState().auth;
        try {
            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json();
            if(body.ok){
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name 
                }
                dispatch(eventAddNew(event))
            }
            
        } catch (error) {
            console.log(error)
        }

    }
}

const eventAddNew = (event: any) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event: any) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
});

export const eventStartUpdate = (event: any) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`events/${event.id}`, event, 'PUT');
            const body = await resp.json();

            if(body.ok){
                dispatch(eventUpdated(event));
            }else{
                return Swal.fire('Error', body.msg, 'error')
            }

        } catch (error) {
            console.log(error)
        }
    } 
}

const eventUpdated = (event: any) => ({
    type: types.eventUpdated,
    payload: event
});


export const eventStartDelete = () => {
    return async(dispatch: any, getState: any) => {
        const {id} = getState().calendar.active;

        try {
            const resp = await fetchConToken(`events/${id}`, {}, 'DELETE');
            const body = await resp.json();

            if(body.ok){
                dispatch(eventDeleted());
            }else{
                return Swal.fire('Error', body.msg, 'error')
            }

        } catch (error) {
            console.log(error);
        }
    }
}

const eventDeleted = () => ({
    type: types.eventDeleted
});

export const eventStartLoaded = () => {

    return async(dispatch: any) => {
        try {
            const resp = await fetchConToken('events');
            const body: any = await resp.json();
            const events = prepareEvents( body.eventos );
            dispatch(eventLoaded(events));
        } catch (error) {
            console.log(error);
        }
    }
}


const eventLoaded = (events: any) => ({
    type: types.eventLoaded,
    payload: events
});


export const eventLogout = () => ({
    type: types.eventLogout
})