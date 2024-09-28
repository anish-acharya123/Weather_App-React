const Geolocation = async (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  try {
    if (!navigator.geolocation) {
      throw new Error("Geolocation is not supported by this browser.");
    }

    const permissionStatus = await navigator.permissions.query({
      name: "geolocation",
    });

    console.log(permissionStatus);
    if (permissionStatus.state === "denied") {
      alert(
        "You have previously denied location access. Please enable it in your browser settings."
      );
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error("User denied the request for Geolocation.");
              reject(new Error("Permission denied"));
              break;
            case error.POSITION_UNAVAILABLE:
              console.error("Location information is unavailable.");
              reject(new Error("Position unavailable"));
              break;
            case error.TIMEOUT:
              console.error("The request to get user location timed out.");
              reject(new Error("Timeout"));
              break;
            default:
              reject(new Error("An unknown error occurred."));
              break;
          }
        }
      );
    });
  } catch (error) {
    console.error("Error in Geolocation:", error);
    throw error;
  }
};

export default Geolocation;
