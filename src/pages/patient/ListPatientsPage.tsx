import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientTable from "../../component/patient/PatientTable";
import { read } from "../../services/backendCallPatient";

const ListPatientsPage = () => {
  const navigate=useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
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
  }, [refresh]);

  const goToAddPatientPage=()=>{
    navigate("/patient")
  }

  return (
    <div>
      <Button className="floating_button" onClick={goToAddPatientPage}>Create New Patient</Button>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="App">
          <PatientTable data={data} refresh={refresh} setRefresh={setRefresh} />
        </div>
      )}
    </div>
  );
};
export default ListPatientsPage;
