import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Geolocation from "./services/Geolocation";
import { Dataprovider } from "./context/Dataprovider";
import Home from "./pages/Home";
import Nopage from "./pages/Nopage";
import Layout from "./hoc/Maxwidth";
import Info from "./pages/Info";
import DetailsPage from "./pages/DetailsPage";
import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "./app/Store";

function App() {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    const fetchCurrentWeatherData = async () => {
      try {
        const location = await Geolocation();
        setUserLocation(location);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchCurrentWeatherData();
  }, []);

  if (userLocation) {
    localStorage.setItem("userlocation", JSON.stringify(userLocation));
  }

  const [isDark, setIsDark] = useState<boolean>(false);
  const mode = useSelector((state: RootState) => state.ToogleDark.value);
  useEffect(() => {
    const dark = JSON.parse(localStorage.getItem("isDarkMode") || "false");
    setIsDark(dark);
  }, [mode]);

  return (
    <>
      <BrowserRouter>
        <Dataprovider
          latitude={userLocation?.latitude}
          longitude={userLocation?.longitude}
        >
          <div className={`${isDark && "bg-black text-white"}`}>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/info"
                  element={
                    <Info
                      setUserLocation={setUserLocation}
                      userlocation={userLocation}
                    />
                  }
                />
                <Route
                  path="/info/:district/:lat/:lon"
                  element={<DetailsPage />}
                />
                <Route path="*" element={<Nopage />} />
              </Routes>
            </Layout>
          </div>
        </Dataprovider>
      </BrowserRouter>
    </>
  );
}

export default App;
