const Geolocation = async (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  try {
    if (!navigator.geolocation) {
      throw new Error("Geolocation is not supported by this browser.");
    }

    if (navigator.permissions) {
      const permissionStatus = await navigator.permissions.query({
        name: "geolocation",
      });

      if (permissionStatus.state === "denied") {
        alert(
          "You have previously denied location access. Please enable it in your browser settings."
        );
        throw new Error("Permission denied for Geolocation.");
      }
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
              alert(
                "Location access denied. Please enable it in your settings."
              );
              reject(new Error("Permission denied"));
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.");
              reject(new Error("Position unavailable"));
              break;
            case error.TIMEOUT:
              alert("The request to get user location timed out.");
              reject(new Error("Timeout"));
              break;
            default:
              alert("An unknown error occurred.");
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
