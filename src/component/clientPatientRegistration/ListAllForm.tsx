import React from "react";
type obj={
    id:string
}
const Items = (props :obj) => {
   const handleFormSelection=()=>{

    

   }
    return (
    <div>
        <button onClick={handleFormSelection}>
        Item {props.id}
        </button>
    </div>
    );
  };
const ListAllFormsPage = () => {


    //read from database, for now localstorage and get id as array of string

    const ids=['1','11','3']

    //get length of list
    const length=ids.length;


  return (
        <div className="App">
            
                    {ids.map((value)=><Items id={value}/>)}
            
        </div>
  );
};
export default ListAllFormsPage;
