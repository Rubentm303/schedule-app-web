import { types } from "../types/types";

// {
//     id: new Date().getTime(),
//     title: 'Test 2',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     bgcolor: '#fafafa',
//     notes: 'Hacer un test',
//     user: {
//         id: '123',
//         name: 'Carlos'
//     }
// }

const initialState = {
    events: [],
    active: null,
}

export const calendarReducer = ( state = initialState, action: any) =>{
    switch (action.type) {
        case types.eventSetActive:
            return{
                ...state,
                active: action.payload,
            }
        case types.eventAddNew:
            return{
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }
        case types.eventClearActiveEvent:
            return{
                ...state,
                active: null,
            }
        case types.eventUpdated:
            return{
                ...state,
                events: state.events.map(
                    e => ((e as any).id === action.payload.id) ? action.payload : e
                )
            }
        case types.eventDeleted:
            return{
                ...state,
                events: state.events.filter(
                    e => ((e as any).id === (state as any).id) 
                ),
                active: null,
            }

        case types.eventLoaded:
            return{
                ...state,
                events: [
                    ...action.payload
                ]
            }
        case types.eventLogout:
            return{
                ...initialState
            }
        default:
            return state;
    }
}