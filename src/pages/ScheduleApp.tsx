import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import AppRouter from '../components/routes/AppRouter'

const ScheduleApp = () => {
    return (
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    )
}

export default ScheduleApp
