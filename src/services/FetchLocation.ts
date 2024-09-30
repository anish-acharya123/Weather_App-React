const FetchLocation = async (lat: number | undefined, lon: number | undefined) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );
    const data = await res.json();
    return data
  } catch (error) {
    console.log("Error fetching location data", error);
  }
};

export default FetchLocation;
