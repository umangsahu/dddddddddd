import React from 'react'
import { useState } from "react";

import ShowData from "../component/ShowData";
import BasicCard from "../component/transactiondetails";
const Home = () => {
    const [EditTransaction, setEditTransaction]=useState({});//for update tehe Transaction

  return (
    <div>
       <BasicCard  editTransaction={EditTransaction} />
    
    <ShowData  set={setEditTransaction}/>
    </div>
  )
}

export default Home
