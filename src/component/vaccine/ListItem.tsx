import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { DoseDate, registerAppointment } from '../../redux_toolkit/slices/appointmentSlice';
import { addVaccine, DateRange } from '../../redux_toolkit/slices/vaccineSlice';
export type obj = {
  Obj: {
    id: number;
    serviceName: string;
    siteLocation: string;
    startDate: string;
    endDate: string;
    doseType: string;
    gender: string;
    age: number;
    ethinicity: string;
  };
};
const ListItem = (props: obj) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log('in appointment single list ', props);
  const handleFormSelection = () => {
    const date: DateRange = {
      startDate: props.Obj.startDate,
      endDate: props.Obj.endDate,
    };
    const dataForVaccineInfo = {
      id: props.Obj.id,
      siteLocation: props.Obj.siteLocation,
      serviceName: props.Obj.serviceName,
      date:date,
      doseType:props.Obj.doseType,
      gender:props.Obj.gender,
      age:props.Obj.age,
      ethinicity:props.Obj.ethinicity,
    };
    dispatch(addVaccine(dataForVaccineInfo));
    navigate('/vaccine/edit');
  };
  return (
    <div>
      <button onClick={handleFormSelection}>
        {' '}
        <h2>id:{props.Obj.id}</h2>
        <h5>Name:{props.Obj.serviceName}</h5>
        <h5>Location:{props.Obj.siteLocation}</h5>
      </button>
    </div>
  );
};

export default ListItem;
