import { Button, message, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addVaccine, DateRange } from '../../redux_toolkit/slices/vaccineSlice';
import { deleteBackend } from '../../services/backendCallVaccine';
import '../styles/Table.css';

interface IVaccineFromDB {
  id?: number;
  siteLocation: string;
  serviceName: string;
  doseType: string;
  startDate: string;
  endDate: string;
  gender: string;
  age: string;
  ethinicity: string;
}

type PropType = {
  data: IVaccineFromDB[];
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
};

const VaccineTable = ({ data, setRefresh }: PropType) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const columns: ColumnsType<IVaccineFromDB> = [
    {
      title: 'service',
      dataIndex: 'serviceName',
      key: 'serviceName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'siteLocation',
      dataIndex: 'siteLocation',
      key: 'siteLocation',
    },
    {
      title: 'doseType',
      dataIndex: 'doseType',
      key: 'doseType',
    },
    {
      title: 'startDate',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'endDate',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'ethinicity',
      dataIndex: 'ethinicity',
      key: 'ethinicity',
    },
    {
      title: 'actions',
      dataIndex: 'id',
      key: 'id',
      render: (id: number, Obj: IVaccineFromDB) => {
        const handleDelete = async () => {
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
          <>
            <Button className="btn-edit" onClick={() => handleRowSelection(Obj)}>
              Edit
            </Button>
            <Button className="btn-delete" loading={loading} onClick={handleDelete}>
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const handleRowSelection = (Obj: IVaccineFromDB) => {
    const date: DateRange = {
      startDate: Obj.startDate,
      endDate: Obj.endDate,
    };
    const dataForVaccineInfo = {
      id: Obj.id,
      siteLocation: Obj.siteLocation,
      serviceName: Obj.serviceName,
      date: date,
      doseType: Obj.doseType,
      gender: Obj.gender,
      age: Obj.age,
      ethinicity: Obj.ethinicity,
    };
    dispatch(addVaccine(dataForVaccineInfo));
    navigate('/vaccine/edit');
  };
  return (
    <div className="table">
      <Table rowKey="id" columns={columns} dataSource={data} />
    </div>
  );
};

export default VaccineTable;
