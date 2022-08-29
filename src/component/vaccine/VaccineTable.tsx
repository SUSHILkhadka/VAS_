import { Radio, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addVaccine, DateRange } from "../../redux_toolkit/slices/vaccineSlice";

interface Prop {
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
const columns: ColumnsType<Prop> = [
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
    title: "id",
    dataIndex: "id",
    key: "id",
  },
];

const VaccineTable = ({ data }: { data: Prop[] }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
            onClick: handleFormSelection,
          };
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default VaccineTable;
