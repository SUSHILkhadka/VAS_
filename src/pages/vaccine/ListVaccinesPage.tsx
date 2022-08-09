import { useEffect, useState } from 'react';
import VaccineTable from '../../component/vaccine/VaccineTable';
import { read } from '../../services/backendCallVaccine';

const ListVaccinesPage = () => {
  //read from database, for now localstorage and get id as array of string
  const [data, setData] = useState([]);

  useEffect(() => {
    const getalldata = async () => {
      try {
        const vaccines = await read();
        setData(vaccines);
        console.log('gotten data', vaccines);
      } catch {
        console.log('error reading data');
      }
    };
    getalldata();
  }, []);

  //get length of list
  return data == [] ? (
    <div>Loading</div>
  ) : (
    <div className="App">
      <VaccineTable Obj={data} />
    </div>
  );
};
export default ListVaccinesPage;
