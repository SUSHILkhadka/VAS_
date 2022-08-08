import { useSelector } from 'react-redux';
import { setName } from '../../services/getLocalData';
const SettingPage = () => {
  const auth = useSelector((state: any) => state.auth);
  const saveName = (event: any) => {
    event.preventDefault();
    setName(event.target.nameArea.value);
  };
  return (
    <div className="about">
      Setting Page
      <div> Current display name is {auth.username}</div>
      <form onSubmit={saveName}>
        <textarea name="nameArea"></textarea>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
export default SettingPage;
