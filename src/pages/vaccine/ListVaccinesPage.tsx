import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ListItem from '../../component/vaccine/ListItem';
import { RootState } from '../../redux_toolkit/stores/store';
import { read } from '../../services/backendCallVaccine';

const ListVaccinesPage = () => {
  const vaccineInfo = useSelector((state: RootState) => state.vaccine);
  //read from database, for now localstorage and get id as array of string
  const [data, setData] = useState([]);

  useEffect(() => {
    const getalldata = async () => {
      const vaccines = await read();
      setData(vaccines);
      console.log("gotten data",vaccines);
    };
    try {
      getalldata();
    } catch {
      console.log('fetching vaccines failed');
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
export default ListVaccinesPage;