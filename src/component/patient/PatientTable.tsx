import { Button, message, Radio, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Address, Patient, register } from '../../redux_toolkit/slices/patientSlice';
import { deleteBackend } from '../../services/backendCallPatient';

interface IPatientFromDatabase {
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




type PropType={
  data:IPatientFromDatabase[]; 
   refresh: boolean;
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
}

const PatientTable = ({data,refresh,setRefresh}:PropType) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const columns: ColumnsType<IPatientFromDatabase> = [
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
    {
      title: "actions",
      dataIndex: "id",
      key: "id",
      render: (id: number) => {
        const handleDelete = async () => {
          setLoading(true);
          try {
            const res = await deleteBackend(id);
            message.success(res.message);
            setRefresh(!refresh);
          } catch {
            message.error("deleting failed");
          }
          setLoading(false);
        };
  
        return (
          <Button loading={loading} onClick={handleDelete}>
            Delete
          </Button>
        );
      },
    },
  ];
  return (
    <div>
      <Table
      rowKey='id'
        onRow={(Obj, _rowIndex) => {
          const handleRowSelection = (): void => {
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
            onDoubleClick: handleRowSelection,
          };
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default PatientTable;
