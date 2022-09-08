import { Button, message, Radio, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Address, Patient, register } from '../../redux_toolkit/slices/patientSlice';
import { deleteBackend } from '../../services/backendCallPatient';
import '../styles/Table.css';
import image from '../../assets/github.png';
import { getPatientObjFromDatabaseObject } from '../../utils/parserPatient';

export interface IPatientFromDatabase {
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
  photoUrl: string;
}

type PropType = {
  data: IPatientFromDatabase[];
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
};

const PatientTable = ({ data, setRefresh }: PropType) => {
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
      title: 'avatar',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
      render: (id: number, Obj: IPatientFromDatabase) => {
        return (
          <div className="image-col">
            {Boolean(Obj.photoUrl) ? (
              <img className="img-avatar-table" src={Obj.photoUrl} alt="Loading" />
            ) : (
              <img className="img-avatar-table" src={image} alt="loading" />
            )}
          </div>
        );
      },
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
      title: 'actions',
      dataIndex: 'id',
      key: 'id',
      render: (id: number, Obj: IPatientFromDatabase) => {


        return (
          <div>
            <Button className="btn-edit" onClick={() => handleRowSelection(Obj)}>
              Details
            </Button>
            <Button className="btn-delete" loading={loading} onClick={()=>handleDelete(id)}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const handleRowSelection = (Obj: IPatientFromDatabase): void => {
const dataForPatientInfoForRedux=getPatientObjFromDatabaseObject(Obj)
    dispatch(register(dataForPatientInfoForRedux));
    navigate('/patient/details');
  };

  const handleDelete = async (id:number) => {
    setLoading(true);
    try {
      const res = await deleteBackend(id);
      message.success(res.message);
      setRefresh((prevState) => !prevState);
    } catch {
      message.error('deleting failed');
    }
    setLoading(false);
  };
  return (
    <div className="table">
      <Table rowKey="id" columns={columns} dataSource={data} />
    </div>
  );
};

export default PatientTable;
