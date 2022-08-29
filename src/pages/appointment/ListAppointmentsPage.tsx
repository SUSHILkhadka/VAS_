import { message } from "antd";
import { useEffect, useState } from "react";
import AppointmentTable from "../../component/appointment/AppointmentTable";
import { read } from "../../services/backendCallAppointment";

const ListAppointmentsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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
  }, []);

  return loading ? (
    <div>Loading</div>
  ) : (
    <div className="App">
      <AppointmentTable Obj={data} />
    </div>
  );
};
export default ListAppointmentsPage;
