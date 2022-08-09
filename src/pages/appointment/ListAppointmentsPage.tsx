import { useEffect, useState } from 'react';
import AppointmentTable from '../../component/appointment/AppointmentTable';
import { read } from '../../services/backendCallAppointment';

const ListAppointmentsPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getalldata = async () => {
      try {
        const appointments = await read();
        setData(appointments);
        console.log('appointent is ', appointments);
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
      {/* {data.map((value) => (
        <ListItem Obj={value} />
      ))} */}
      <AppointmentTable Obj={data} />
    </div>
  );
};
export default ListAppointmentsPage;
