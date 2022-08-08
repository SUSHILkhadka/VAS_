import { Radio, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DoseDate, registerAppointment } from '../../redux_toolkit/slices/appointmentSlice';
import { Address, Patient, register } from '../../redux_toolkit/slices/patientSlice';

interface DataType {
  id: string;
  firstName: string;
  secondName: string;
  birthDate: string;
  gender: string;
  ethnicity: string;
  email: string;
  addressState: string;
  addressCity: string;
  addressStreet: string;
  paymentMethod: string;
  insuranceProvider: string;
}

type TablePaginationPosition = 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';

const bottomOptions = [
  { label: 'bottomLeft', value: 'bottomLeft' },
  { label: 'bottomCenter', value: 'bottomCenter' },
  { label: 'bottomRight', value: 'bottomRight' },
  { label: 'none', value: 'none' },
];

const columns: ColumnsType<DataType> = [
  {
    title: 'Patient ID',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'firstName',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'secondName',
    dataIndex: 'secondName',
    key: 'secondName',
  },
  {
    title: 'birthDate',
    dataIndex: 'birthDate',
    key: 'birthDate',
  },
  {
    title: 'gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'ethnicity',
    dataIndex: 'ethnicity',
    key: 'ethnicity',
  },
];

type TT = {
  Obj: DataType[];
};

const PatientTable = (props: TT) => {
  const [bottom, setBottom] = useState<TablePaginationPosition>('bottomRight');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div>
      <Radio.Group
        style={{ marginBottom: 10 }}
        options={bottomOptions}
        value={bottom}
        onChange={(e) => {
          setBottom(e.target.value);
        }}
      />
      <Table
        onRow={(Obj, _rowIndex) => {
          const handleFormSelection = (): void => {
            const address: Address = {
              state: Obj.addressState,
              city: Obj.addressCity,
              street: Obj.addressStreet,
            };
            const dataForPatientInfo: Patient = {
              id: +Obj.id,
              firstName: Obj.firstName,
              secondName: Obj.secondName,
              birthDate: Obj.birthDate,
              ethnicity: Obj.ethnicity,
              gender: Obj.gender,
              email: Obj.email,
              address: address,
              paymentMethod: Obj.paymentMethod,
              insuranceProvider: Obj.insuranceProvider,
            };
            dispatch(register(dataForPatientInfo));
            navigate('/patient/edit');
          };
          return {
            onClick: handleFormSelection,
          };
        }}
        columns={columns}
        pagination={{ position: [bottom] }}
        dataSource={props.Obj}
      />
    </div>
  );
};

export default PatientTable;
