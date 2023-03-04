import NonConnected from "./Components/Landing page/NonConnected";
import {Routes, Route} from "react-router-dom"
import "./styles//App.css"
import HomePage from "./Components/Home page/HomePage";

function App() {

   return (
    <Routes>
      <Route path={"/*"} element={<NonConnected/>}/>
      <Route path={"/home/*"} element={<HomePage/>}/>
    </Routes>
  );
}

export default App;
