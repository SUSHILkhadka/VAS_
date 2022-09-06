import { IAppointmentFromDb } from "../component/appointment/AppointmentTable";

export const convertToObjWithDateAsKey = (data: IAppointmentFromDb[]) => {
  let requiredObj: any = {};
  data.map((element: IAppointmentFromDb) => {
    const dataToBeAppended = { type: "success", content: element.id };
    let previousData = requiredObj[element.firstDoseDate]
      ? requiredObj[element.firstDoseDate]
      : [];
    previousData.push(dataToBeAppended);
    requiredObj = { ...requiredObj, [element.firstDoseDate]: previousData };
  });
  return requiredObj;
};
