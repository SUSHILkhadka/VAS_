import { Button, message, Radio, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addVaccine, DateRange } from "../../redux_toolkit/slices/vaccineSlice";
import { deleteBackend } from "../../services/backendCallVaccine";

interface IPatientFromDB {
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


type PropType={
  data:IPatientFromDB[]; 
   refresh: boolean;
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
}

const VaccineTable = ({ data ,refresh,setRefresh}: PropType) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const columns: ColumnsType<IPatientFromDB> = [
    {
      title: "service",
      dataIndex: "serviceName",
      key: "serviceName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "siteLocation",
      dataIndex: "siteLocation",
      key: "siteLocation",
    },
    {
      title: "doseType",
      dataIndex: "doseType",
      key: "doseType",
    },
    {
      title: "startDate",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "endDate",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "ethinicity",
      dataIndex: "ethinicity",
      key: "ethinicity",
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
        rowKey="id"
        onRow={(Obj, _rowIndex) => {
          const handleFormSelection = () => {
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
            navigate("/vaccine/edit");
          };
          return {
            onDoubleClick: handleFormSelection,
          };
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default VaccineTable;
