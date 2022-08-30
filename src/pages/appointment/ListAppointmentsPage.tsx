import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentTable from "../../component/appointment/AppointmentTable";
import { read } from "../../services/backendCallAppointment";

const ListAppointmentsPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh,setRefresh]=useState(false);
  useEffect(() => {
    const getalldata = async () => {
      setLoading(true);
      try {
        const appointments = await read();
        setData(appointments.data);
      } catch {
        message.error("reading failed");
      }
      setLoading(false);
    };
    getalldata();
  }, [refresh]);

  const goToAddPage = () => {
    navigate("/appointment");
  };

  return (
    <div>
      <Button className="floating_button" onClick={goToAddPage}>Create new Appointment</Button>
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
