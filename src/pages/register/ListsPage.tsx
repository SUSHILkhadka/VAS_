import useSelection from 'antd/lib/table/hooks/useSelection';
import { useSelector } from 'react-redux';
import ListItem from '../../component/register/ListItem';
import { RootState } from '../../redux_toolkit/stores/store';

const ListAllFormsPage = () => {
    const registerInfo=useSelector((state:RootState)=>state.register)

  //read from database, for now localstorage and get id as array of string
  const ids = [
    {
      id: 'one',
      name:"empty"
    },
    {
      id: 'two',
      name: "black"
    },
    {
      id: 'three',
      name: "nothing"
    },
  ];
  //get length of list
  const length = ids.length;
  return registerInfo.email==""?(<div>No date to show</div>):(
    <div className="App">
      {ids.map((value) => (
        <ListItem Obj={value} />
      ))}
    </div>
  )
};
export default ListAllFormsPage;
