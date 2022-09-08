import { Button, message, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DoseDate,
  registerAppointment,
} from "../../redux_toolkit/slices/appointmentSlice";
import { RootState } from "../../redux_toolkit/stores/store";
import { deleteBackend } from "../../services/backendCallAppointment";
import { getAppointmentObjFromDatabaseObject } from "../../utils/parserAppointment";
import "../styles/Table.css";

export interface IAppointmentFromDb {
  id?: string;
  patientId: number;
  siteLocation: string;
  serviceName: string;
  firstDoseDate: string;
  firstDoseTime: string;
  secondDoseDate: string;
  secondDoseTime: string;
}

type PropType = {
  data: IAppointmentFromDb[];
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
};

const AppointmentTable = ({ data, setRefresh }: PropType) => {
  const navigate = useNavigate();
  const authInfo = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const columns: ColumnsType<IAppointmentFromDb> = [
    {
      title: "patientId",
      dataIndex: "patientId",
      key: "patientId",
    },
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
      title: "Confirmation code",
      dataIndex: "id",
      key: "id",
      width: 1,
    },
    authInfo.isAdmin
      ? {
          title: "actions",
          dataIndex: "id",
          key: "id",
          render: (id: number, Obj: IAppointmentFromDb) => {
            return (
              <>
                <Button
                  className="btn-edit"
                  onClick={() => handleRowSelection(Obj)}
                >
                  Edit
                </Button>
                <Button
                  className="btn-delete"
                  loading={loading}
                  onClick={()=>handleDelete(id)}
                >
                  Delete
                </Button>
              </>
            );
          },
        }
      : {},
  ];

  const handleRowSelection = (Obj: IAppointmentFromDb): void => {
    const dataForAppointmentInfoForRedux=getAppointmentObjFromDatabaseObject(Obj)
    dispatch(registerAppointment(dataForAppointmentInfoForRedux));
    navigate("/appointment/edit");
  };

  const handleDelete = async (id:number) => {
    setLoading(true);
    try {
      const res = await deleteBackend(id);
      message.success(res.message);
      setRefresh((prevState) => !prevState);
    } catch {
      message.error("deleting failed");
    }
    setLoading(false);
  };
  return (
    <div className="table">
      <Table rowKey="id" columns={columns} dataSource={data} />
    </div>
  );
};

export default AppointmentTable;
