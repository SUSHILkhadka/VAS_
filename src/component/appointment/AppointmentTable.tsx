import { Radio, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DoseDate,
  registerAppointment,
} from "../../redux_toolkit/slices/appointmentSlice";

interface DataType {
  id?: string;
  email: string;
  siteLocation: string;
  serviceName: string;
  firstDoseDate: string;
  firstDoseTime: string;
}
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
    title: "id",
    dataIndex: "id",
    key: "id",
  },
];

type TT = {
  Obj: DataType[];
};

const AppointmentTable = (props: TT) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("in table", props);
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
            const dataForAppointmentInfo = {
              id: Obj.id,
              email: Obj.email,
              siteLocation: Obj.siteLocation,
              service: Obj.serviceName,
              firstDose: firstDose,
              secondDose: firstDose,
            };
            dispatch(registerAppointment(dataForAppointmentInfo));
            navigate("/appointment/edit");
          };
          return {
            onClick: handleFormSelection,
          };
        }}
        columns={columns}
        dataSource={props.Obj}
      />
    </div>
  );
};

export default AppointmentTable;
