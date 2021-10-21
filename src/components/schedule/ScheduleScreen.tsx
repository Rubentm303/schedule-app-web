import React, { useEffect, useState } from 'react';
import Navbar from '../ui/Navbar';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { messages } from '../../helpers/calendar-messages';
import CalendarEvent from './ScheduleEvent';
import ScheduleModal from './ScheduleModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoaded } from '../../actions/events';
import AddNewFab from '../ui/AddNewFab';
import DeleteFabEvent from '../ui/DeleteFabEvent';


const localizer = momentLocalizer(moment);

const ScheduleScreen = () => {
    const dispatch = useDispatch();
    const { events, active } = useSelector(state => (state as any).calendar); 
    const { uid } = useSelector(state => (state as any).auth); 
    const [lastView, setLastView]: any = useState(  localStorage.getItem('LastView') || 'month');
    
    useEffect(() => {
        dispatch(eventStartLoaded());
    }, [dispatch, events]);
    
    const eventStyleGetter = (event: any, start: any, end: any, isSelected: any) => {
        const style = {
            backgroundColor: (uid === event.user._id) ? '#8E54E9' : '#4776E6',
            borderRadius: '3px',
            opacity: 0.8,
            display: 'block',
            color: 'white', 
        }

        return{
            style
        }
        
    } 

    const onDoubleClick = (e: any) => {
        dispatch(uiOpenModal());
    }

    const onSelectedEvent = (e: any) => {
        dispatch(eventSetActive(e));
    }
    const onViewChange = (e: any) => {
        setLastView(e); 
        localStorage.setItem('LastView', e);
    }

    const onSelectedSlot = (e: any) => {
        dispatch(eventClearActiveEvent());
    }

    return (
        <div className='schedule-app'>
           <Navbar/>

           <Calendar
                localizer={localizer}
                events = {events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent = {onDoubleClick}
                onSelectEvent = {onSelectedEvent}
                onView = {onViewChange}
                onSelectSlot = {onSelectedSlot}
                selectable = {true}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
                
            />
            {
                (active) &&
                <DeleteFabEvent/>

            }
            <AddNewFab/>
            <ScheduleModal/>
        </div>
    )
}

export default ScheduleScreen
