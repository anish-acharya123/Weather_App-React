export const FetchByMeteo = async (lat: number, lon: number) => {
  // console.log(lat, lon);
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,precipitation,rain,weather_code,wind_speed_10m,wind_direction_10m&daily=sunrise,sunset,weather_code,uv_index_max,uv_index_clear_sky_max,rain_sum,temperature_2m_max,temperature_2m_min&timezone=auto`;

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
