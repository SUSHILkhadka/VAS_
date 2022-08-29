import { message } from 'antd';
import { useEffect, useState } from 'react';
import VaccineTable from '../../component/vaccine/VaccineTable';
import { read } from '../../services/backendCallVaccine';

const ListVaccinesPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getalldata = async () => {
      try {
        const vaccines = await read();
        setData(vaccines.data);
      } catch {
        message.error('reading failed');
      }
    };
    getalldata();
  }, []);

  //get length of list
  return data == [] ? (
    <div>Loading</div>
  ) : (
    <div className="App">
      <VaccineTable data={data} />
    </div>
  );
};
export default ListVaccinesPage;
