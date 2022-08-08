import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AppointmentTable from '../../component/appointment/AppointmentTable';
import ListItem from '../../component/appointment/ListItem';
import { RootState } from '../../redux_toolkit/stores/store';
import { read } from '../../services/backendCallAppointment';

const ListAppointmentsPage = () => {
  const registerInfo = useSelector((state: RootState) => state.register);

  //read from database, for now localstorage and get id as array of string
  const [data, setData] = useState([]);

  useEffect(() => {
    const getalldata = async () => {
      try{
      const appointments = await read();
      setData(appointments);
      console.log("appointent is ",appointments);
      }
      catch{
        
      }
    };
      getalldata();
  }, []);

  //get length of list
  return data == [] ? (
    <div>Loading</div>
  ) : (
    //1st commented approach is using map, without antd table
    //AppointmentTable is using antd table
    <div className="App">

      {/* {data.map((value) => (
        <ListItem Obj={value} />
      ))} */}

      <AppointmentTable Obj={data}/>
    </div>
  );
};
export default ListAppointmentsPage;
