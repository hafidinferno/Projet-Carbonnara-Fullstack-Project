import DataDisplay from "./BD";

function BaseDonnees() {
  return (
    <>
      <style>
        {`
          .header {
            background-color: #282c34; 
            color: white;
            text-align: center; 
            padding: 20px 0; 
            font-size: 2.5rem; 
            font-family: 'Arial', sans-serif; 
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
          }
          
        `}
      </style>
      <header className="header">Hello World</header>
      <div className="App" style={{ textAlign: "center" }}>
        <header
          className="App-header"
          style={{ backgroundColor: "#282c34", color: "white" }}
        >
          <DataDisplay url="http://192.168.75.17:8080/test" />
        </header>
      </div>
    </>
  );
}

export default BaseDonnees;
