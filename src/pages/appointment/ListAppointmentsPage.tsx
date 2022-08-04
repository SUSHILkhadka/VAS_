import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ListItem from '../../component/appointment/ListItem';
import { URL_TO_BACKEND } from '../../constants/common';
import { RootState } from '../../redux_toolkit/stores/store';
import { read } from '../../services/backendCall';

const ListAppointmentsPage = () => {
  const registerInfo = useSelector((state: RootState) => state.register);

  //read from database, for now localstorage and get id as array of string
  const [data, setData] = useState([]);

  useEffect(() => {
    const getalldata = async () => {
      const appointments = await read();
      setData(appointments);
      console.log(appointments);
    };
    try {
      getalldata();
    } catch {
      console.log('fetching failed');
    }
  }, []);

  //get length of list
  return data == [] ? (
    <div>Loading</div>
  ) : (
    <div className="App">
      {data.map((value) => (
        <ListItem Obj={value} />
      ))}
    </div>
  );
};
export default ListAppointmentsPage;
