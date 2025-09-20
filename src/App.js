import "./App.css";
import Home from "./Component/HomePage/Home";
import DesginOne from "./Component/Resume/DesginMain/DesginOne/DesginOne";
import { Route, Routes } from "react-router-dom";
import Desgin from "./Component/Resume/DesginMain/Desgin";
import FormProvider from "../src/Component/Resume/Context/FormProvider";
function App() {
  return (
    <>
      {/* <Home/> */}
      {/* <Provider> */}
      <FormProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/DesginOne" element={<DesginOne />}></Route>
          <Route path="/MainDesgin" element={<Desgin />}></Route>
        </Routes>
      </FormProvider>
      {/* </Provider> */}
    </>
  );
}

export default App;
