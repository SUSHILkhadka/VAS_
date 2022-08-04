import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { isPropertyAccessOrQualifiedName } from 'typescript';
export type obj = {
  Obj: { id: string ,name:string};
};
const ListItem = (props: obj) => {
    const navigate=useNavigate()
  const handleFormSelection = () => {
    navigate("/register")
  };
  return (
    <div>
      <button onClick={handleFormSelection}>        <h2>Name:{props.Obj.name}</h2>
        <h5>id:{props.Obj.id}</h5></button>
    </div>
  );
};

export default ListItem;
