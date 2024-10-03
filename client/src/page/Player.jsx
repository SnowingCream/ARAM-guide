import { useLocation } from "react-router-dom";

function Player() {
  // useLocation gives us access to the current location object
  const location = useLocation();

  // Destructure 'returnedData' from location.state,
  // or fallback to an empty object if state is undefined.
  const returnedData = location.state || {};

  return (
    <div>
      <h1>This is the Player page.</h1>
      {/* Conditionally render the returned data */}
      {console.log(location)}
      {returnedData ? (
        <div>
          <h2>Data from Backend:</h2>
          {/* Display the returned data in a formatted way */}
          <pre>{JSON.stringify(returnedData, null, 2)}</pre>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default Player;
