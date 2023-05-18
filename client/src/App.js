import { Outlet } from "react-router-dom";

import ButtonAppBar from "./component/navbar";
// import ShowData from "./component/ShowData";
// import BasicCard from "./component/transactiondetails";
import"./style/app.css"

function App() {
 
  return (
    <div className="App">
       <ButtonAppBar/>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
