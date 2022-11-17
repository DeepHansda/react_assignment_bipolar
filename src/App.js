import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { DatePicker } from "antd";
import "antd/dist/antd.min.css";
import "./App.css";
import Main from "./Components/Main";
import Spinner from "./Components/Spinner";









const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

//initializing contaxt-------------------------------
export const ProjectContext = createContext({});


function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
 



  useEffect(() => {
    function handleWidth() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleWidth);

    client
      .get("/users")
      .then((response) => {
        setLoading(false);
        setProfiles(response.data);
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });

    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);




 //app states--------------------------
  const states = {
    width: width,
    profiles: profiles,
    setProfiles : setProfiles
  };




  return (
    //providing states all over app-------------
    <ProjectContext.Provider value={states}>
      <div className="App">{loading ? <Spinner /> : <Main />}</div>
    </ProjectContext.Provider>
  );
}

export default App;
