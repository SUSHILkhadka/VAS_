import { Button, Input, message } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentTable from '../../component/appointment/AppointmentTable';
import { readAll, readByPatientId } from '../../services/backendCallAppointment';
import '../../component/styles/Table.css';
import Search from 'antd/lib/transfer/search';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux_toolkit/stores/store';
const ListAppointmentsPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const authInfo = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    const getAllDataOrDataByPatientId = async () => {
      setLoading(true);
      try {
        const appointments = authInfo.isAdmin ? await readAll() : [];
        setData(appointments.data);
      } catch {}
      setLoading(false);
    };
    getAllDataOrDataByPatientId();
  }, [refresh]);

  const goToAddPage = () => {
    navigate('/appointment');
  };
  const { Search } = Input;
  const handleSearch = async (patientId: string) => {
    setLoading(true);
    try {
      const appointments = await readByPatientId(patientId);
      setData(appointments.data);
    } catch {}
    setLoading(false);
  };
  return (
    <div className="content-container">
      <FormItem className="searchfield" label="PatientID">
        <Search placeholder="input search text" enterButton="Search" size="large" onSearch={handleSearch} />
      </FormItem>
      <Button className="floating_button" onClick={goToAddPage}>
        Create new Appointment
      </Button>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="App">
          <AppointmentTable data={data} refresh={refresh} setRefresh={setRefresh} />
        </div>
      )}
    </div>
  );
};
export default ListAppointmentsPage;
