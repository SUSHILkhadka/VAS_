export const add_funtion_as_action = (value: number) => {
  return {
    type: 'add',
    payload: value,
  };
};
export const sub_funtion_as_action = (value: number) => {
  return {
    type: 'sub',
    payload: value,
  };
};

export const makeLoggedIn_function_as_action = (value: string) => {
  return {
    type: 'MakeLoggedIn',
    // payload:value
  };
};
export const makeLoggedOut_function_as_action = () => {
  return {
    type: 'MakeLoggedOut',
    // payload:value
  };
};
export const changename_function_as_action = (value: string) => {
  return {
    type: 'ChangeName',
    payload: value,
  };
};

//for register
export const updateName = (value: string) => {
  return {
    type: 'SaveName',
    payload: value,
  };
};
export const updateEmail = (value: string) => {
  return {
    type: 'SaveEmail',
    payload: value,
  };
};
