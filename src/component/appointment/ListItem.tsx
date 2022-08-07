import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { DoseDate, registerAppointment } from '../../redux_toolkit/slices/appointmentSlice';
export type obj = {
  Obj: {
    id: string;
    siteLocation: string;
    serviceName: string;
    email: string;
    firstDoseDate: string;
    firstDoseTime: string;
  };
};
const ListItem = (props: obj) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log('in appointment single list ', props);
  const handleSelection = () => {
    const firstDose: DoseDate = {
      date: props.Obj.firstDoseDate,
      time: props.Obj.firstDoseTime,
    };
    const dataForAppointmentInfo = {
      id: props.Obj.id,
      email: props.Obj.email,
      siteLocation: props.Obj.siteLocation,
      service: props.Obj.serviceName,
      firstDose: firstDose,
      secondDose: firstDose,
    };
    dispatch(registerAppointment(dataForAppointmentInfo));
    navigate('/appointment/edit');
  };
  return (
    <div>
      <button onClick={handleSelection}>
        {' '}
        <h2>id:{props.Obj.id}</h2>
        <h5>email:{props.Obj.email}</h5>
        
      </button>
    </div>
  );
};

export default ListItem;
