import { IAppointmentFromDb } from './AppointmentTable';
import type { BadgeProps } from 'antd';
import { Badge, Calendar } from 'antd';
import type { Moment } from 'moment';
import { convertToObjWithDateAsKey } from '../../utils/convertToObjWithDateAsKey';
import { dateToString } from '../../utils/common';
import '../styles/Calender.css';
type PropType = {
  data: IAppointmentFromDb[];
};

const AppointmentCalender = ({ data }: PropType) => {
  const requiredObjWithDatesAsKey = convertToObjWithDateAsKey(data);

  const getListData = (date: string) => {
    return requiredObjWithDatesAsKey[date] || [];
  };

  const dateCellRender = (value: Moment) => {
    const listData = getListData(dateToString(value));
    return listData.length != 0 ? (
      <ul className="events">
        {listData.map((item: any) => {
          const displayText = 'Confirm Code ' + item.content;
          return (
            <li key={item.content}>
              <Badge status={item.type as BadgeProps['status']} text={displayText} />
            </li>
          );
        })}
      </ul>
    ) : (
      <></>
    );
  };

  return (
    <div className="calender-container">
      <Calendar dateCellRender={dateCellRender} />
    </div>
  );
};

export default AppointmentCalender;
