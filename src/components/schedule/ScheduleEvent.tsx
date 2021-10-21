import React from 'react'

function ScheduleEvent (props: any){
    const {event} = props;

    return (
        <div>
            <span>{event.title}</span>
            <strong>- {event.user.name}</strong>
        </div>
    )
}

export default ScheduleEvent
