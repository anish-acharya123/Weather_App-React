export const FetchData = async (lat: number, lon: number) => {
  const apiKey = "24ac5bb94d540dcf497b9d2142d8d279";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching weather data:", error);
    throw error;
  }
};
