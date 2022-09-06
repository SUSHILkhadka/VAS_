import { Button, message, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientTable from '../../component/patient/PatientTable';
import { read } from '../../services/backendCallPatient';

const ListPatientsPage = () => {
  const navigate = useNavigate();
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
        message.error('reading failed');
      }
      setLoading(false);
    };
    getalldata();
  }, [refresh]);

  const goToAddPatientPage = () => {
    navigate('/patient');
  };

  return (
    <div className="content-container">
      <Button className="floating_button" onClick={goToAddPatientPage}>
        Create New Patient
      </Button>
      {loading ? (
        <Skeleton style={{margin:50}} active/>
        ) : (
        <div className="App">
          <PatientTable data={data} setRefresh={setRefresh} />
        </div>
      )}
    </div>
  );
};
export default ListPatientsPage;
