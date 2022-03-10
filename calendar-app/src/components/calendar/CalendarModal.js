import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/actions/ui";
import {
  eventAddNew,
  eventClearActiveEvent,
  eventUpdated,
} from "../../redux/actions/events";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");
const now = moment().minutes(0).seconds(0).add(1, "hours");

const initEvent = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: now.add(1, "hours").toDate(),
};

const CalendarModal = () => {
  const [startDate, setStartDate] = useState(now.toDate());
  const [endDate, setEndDate] = useState(now.add(1, "hours").toDate());
  const [validTitle, setValidTitle] = useState(true);
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);

  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState(initEvent);

  const { title, notes, start, end } = formValues;
  const handleChange = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    dispatch(eventClearActiveEvent());
    setFormValues(initEvent);
  };

  const onChange = (e) => {
    setStartDate(e);
    setFormValues({ ...formValues, start: e });
  };

  const handleEndDate = (e) => {
    setEndDate(e);
    setFormValues({ ...formValues, end: e });
  };

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initEvent);
    }
  }, [activeEvent, setFormValues]);

  const handleSave = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);
    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire(
        "Error",
        "la fecha fin debe ser maor que la de inicio",
        "error"
      );
    }
    if (title.trim().length < 2) {
      return setValidTitle(false);
    }
    //TODO: realizar la grabacion en la bd
    if (activeEvent) {
      dispatch(eventUpdated(formValues));
    } else {
      dispatch(
        eventAddNew({
          ...formValues,
          id: new Date().getTime(),
          user: {
            _id: "123",
            name: "Manuel",
          },
        })
      );
    }
    setValidTitle(true);
    handleCloseModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={handleCloseModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      {activeEvent ? <h1> Update event</h1> : <h1> Nuevo evento </h1>}
      <hr />
      <form className="container" onSubmit={handleSave}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            className="form-control"
            minDate={startDate}
            onChange={onChange}
            value={startDate}
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            className="form-control"
            onChange={handleEndDate}
            value={end}
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!validTitle && "is-invalid"}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};

export default CalendarModal;
