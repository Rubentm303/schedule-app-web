import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventStartAddNew, eventClearActiveEvent, eventStartUpdate } from '../../actions/events';

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const dateClone = now.clone().add(1, 'hours');

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

Modal.setAppElement('#root');

const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: dateClone.toDate(),
}

const ScheduleModal = () => {
  const dispatch = useDispatch();
  const [dateStart, setDateStart] = useState(now.toDate());
  const [endDate, setEndDate] = useState(dateClone.toDate());
  const [titleIsValid, setTitleIsValid] = useState(true);
  const [formValues, setFormValues] = useState(initEvent);

  const { notes, title, start, end } = formValues;

  const {modalOpen} = useSelector(state => (state as any).ui);
  const {active, events} = useSelector(state => (state as any).calendar);

  useEffect(() => {
    if(active){
      setFormValues(active);
    } else {
      setFormValues(initEvent);
    }
  }, [active])

  const closeModal = () => {
    dispatch(uiCloseModal()); 
    dispatch(eventClearActiveEvent());
    setFormValues(initEvent); 
  }

  const handleStartDateChange = (e: any) => {
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e
    })
  }
  const handleEndDateChange = (e: any) => {
    setEndDate(e);
    setFormValues({
      ...formValues,
      end: e
    })
  }

  const handleInputChange = (e: any) => {
    const {target} = e;

    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
  }

  const hadleSubmitForm = ( e: any ) => {
    e.preventDefault();
    const momentStart = moment( start );
    const momentEnd = moment( end );

    // if(momentStart === events.start){

    // }

    events.map((e) => {
      console.log(e.start === momentStart.toDate());
    })
    if(momentStart.isoWeekday() === 6){
      return Swal.fire('Error', 'No puedes crear un evento el día sábado', 'error');
    }

    if(momentStart.isoWeekday() === 7){
      return Swal.fire('Error', 'No puedes crear un evento el día domingo', 'error');
    }

    if(momentEnd.isoWeekday() === 6){
      return Swal.fire('Error', 'El evento no puede terminar en un día sábado', 'error');
    }

    if(momentStart.hour() > 0 && momentStart.hour() < 7 ){
      return Swal.fire('Error', 'No puedes crear con la hora seleccionada', 'error');
    }
    if(momentStart.hour() > 17 && momentStart.hour() < 23){
      return Swal.fire('Error', 'No puedes crear con la hora seleccionada', 'error');
    }

    if(momentEnd.isoWeekday() === 7){
      return Swal.fire('Error', 'El evento no puede terminar en un día domingo', 'error');
    }
    if(momentStart.isSameOrAfter(momentEnd)){
      return Swal.fire('Error', 'La fecha final debe ser mayor a fecha inicial', 'error');
    }

    if(title.trim().length < 2){
      setTitleIsValid(false);
    }

    if(active){
      dispatch(eventStartUpdate(formValues))
    } else {
      dispatch(eventStartAddNew({
        ...formValues,
      }));
    }
    setTitleIsValid(true);
    closeModal();
  }

  return (
      <Modal
      isOpen={modalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      className='modal'
      overlayClassName='modal-fondo'
      closeTimeoutMS={200}
    >
      <h1> {active ? 'Editar' : 'Nuevo'} </h1>
      <hr />
      <form onSubmit={ hadleSubmitForm } className="container">

          <div className="form-group">
              <label>Fecha y hora inicio</label>
              <DateTimePicker
                onChange={ handleStartDateChange }
                value={ dateStart }
                className='form-control'
              />

          </div>

          <div className="form-group">
              <label>Fecha y hora fin</label>
              <DateTimePicker
                onChange={ handleEndDateChange }
                value={ endDate }
                minDate={dateStart}
                className='form-control'
              />
          </div>

          <hr />
          <div className="form-group">
              <label>Titulo y notas</label>
              <input 
                  type="text" 
                  className={`form-control ${!titleIsValid && 'is-invalid'}`}
                  placeholder="Título del evento"
                  name="title"
                  autoComplete="off"
                  value={title}
                  onChange={handleInputChange}
              />
              <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
          </div>

          <div className="form-group">
              <textarea 
                  className="form-control"
                  placeholder="Notas"
                  rows={5}
                  name="notes"
                  value={notes}
                  onChange={handleInputChange}
              ></textarea>
              <small id="emailHelp" className="form-text text-muted">Información adicional</small>
          </div>

          <button
              type="submit"
              className="btn btn-outline-primary btn-block"
          >
              <i className="fas fa-save"></i>
              <span>  Guardar</span>
          </button>

      </form>
    </Modal>
  )
}

export default ScheduleModal
