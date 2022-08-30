import { Button, message, Radio, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DoseDate,
  registerAppointment,
} from "../../redux_toolkit/slices/appointmentSlice";
import { deleteBackend } from "../../services/backendCallAppointment";

interface DataType {
  id?: string;
  email: string;
  siteLocation: string;
  serviceName: string;
  firstDoseDate: string;
  firstDoseTime: string;
  secondDoseDate: string;
  secondDoseTime: string;
}

type PropType = {
  data: DataType[];
  refresh: boolean;
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
};

const AppointmentTable = ({ data, refresh, setRefresh }: PropType) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const columns: ColumnsType<DataType> = [
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
      title: "firstDoseDate",
      dataIndex: "firstDoseDate",
      key: "firstDoseDate",
    },
    {
      title: "firstDoseTime",
      dataIndex: "firstDoseTime",
      key: "firstDoseTime",
    },
    {
      title: "secondDoseDate",
      dataIndex: "secondDoseDate",
      key: "secondDoseDate",
    },
    {
      title: "secondDoseTime",
      dataIndex: "secondDoseTime",
      key: "secondDoseTime",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
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
          const handleFormSelection = (): void => {
            const firstDose: DoseDate = {
              date: Obj.firstDoseDate,
              time: Obj.firstDoseTime,
            };
            const secondDose: DoseDate = {
              date: Obj.secondDoseDate,
              time: Obj.secondDoseTime,
            };
            const dataForAppointmentInfo = {
              id: Obj.id,
              email: Obj.email,
              siteLocation: Obj.siteLocation,
              service: Obj.serviceName,
              firstDose: firstDose,
              secondDose: secondDose,
            };
            dispatch(registerAppointment(dataForAppointmentInfo));
            navigate("/appointment/edit");
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

export default AppointmentTable;
