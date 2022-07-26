import { Button, message, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VaccineTable from '../../component/vaccine/VaccineTable';
import { read } from '../../services/backendCallVaccine';

const ListVaccinesPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const getalldata = async () => {
      setLoading(true);
      try {
        const vaccines = await read();
        setData(vaccines.data);
      } catch {
        message.error('reading failed');
      }
      setLoading(false);
    };
    getalldata();
  }, [refresh]);

  const goToAddVaccinePage = () => {
    navigate('/vaccine');
  };
  return (
    <div className="content-container">
      <Button className="floating_button" onClick={goToAddVaccinePage}>
        {' '}
        Add new Vaccine
      </Button>
      {loading ? (
        <Skeleton style={{ margin: 50 }} active />
      ) : (
        <div className="App">
          <VaccineTable data={data} setRefresh={setRefresh} />
        </div>
      )}
    </div>
  );
};
export default ListVaccinesPage;
