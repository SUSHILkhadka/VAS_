import { message } from "antd";
import { useEffect, useState } from "react";
import PatientTable from "../../component/patient/PatientTable";
import { read } from "../../services/backendCallPatient";

const ListPatientsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getalldata = async () => {
      setLoading(true);
      try {
        const patients = await read();
        setData(patients.data);
      } catch {
        message.error("reading failed");
      }
      setLoading(false);
    };
    getalldata();
  }, []);

  return loading ? (
    <div>Loading</div>
  ) : (
    <div className="App">
      <PatientTable data={data} />
    </div>
  );
};
export default ListPatientsPage;
