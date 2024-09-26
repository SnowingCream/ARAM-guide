import "../asset/App.css";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Body from "./Body.jsx";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const callApi = async () => {
    axios.get("/api").then((res) => console.log(res.data.test));
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div>
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
