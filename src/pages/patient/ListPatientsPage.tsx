import { useEffect, useState } from 'react';
import PatientTable from '../../component/patient/PatientTable';
import { read } from '../../services/backendCallPatient';

const ListPatientsPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getalldata = async () => {
      try {
        const patients = await read();
        setData(patients);
        console.log('patients is ', patients);
      } catch {}
    };
    getalldata();
  }, []);

  return data == [] ? (
    <div>Loading</div>
  ) : (
    //1st commented approach is using map, without antd table
    //AppointmentTable is using antd table
    <div className="App">
      <PatientTable Obj={data} />
    </div>
  );
};
export default ListPatientsPage;
