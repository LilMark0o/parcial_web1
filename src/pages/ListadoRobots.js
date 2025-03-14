import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import messagesEn from "../locales/en.json";
import messagesEs from "../locales/es.json";
import { IntlProvider, FormattedMessage } from "react-intl";

const ListadoRobots = () => {
  const [robots, setRobots] = useState([]);
  const [selectedRobot, setSelectedRobot] = useState(null);
  const [error, setError] = useState("");
  const messages = {
  en: messagesEn,
  es: messagesEs,
};
  const locale = 'es';
  // const locale = 'en';
  function getImageFromID(id) {
    const dictionary = {
        1: "https://github.com/fai-aher/T34-Wiki-Backup/blob/main/images/robot1.png?raw=true",
        2: "https://github.com/fai-aher/T34-Wiki-Backup/blob/main/images/robot2.png?raw=true",
        3: "https://github.com/fai-aher/T34-Wiki-Backup/blob/main/images/robot3.png?raw=true",
        4: "https://github.com/fai-aher/T34-Wiki-Backup/blob/main/images/robot4.png?raw=true",
        5: "https://github.com/fai-aher/T34-Wiki-Backup/blob/main/images/robot5.png?raw=true",
        6: "https://github.com/fai-aher/T34-Wiki-Backup/blob/main/images/robot6.png?raw=true",
    };

    return dictionary[id] || "ID no encontrado";
}

  // Fetch all robots
  useEffect(() => {
    const fetchAllRobots = async () => {
      try {
        const response = await fetch("http://localhost:3001/robots");
        if (!response.ok) {
          throw new Error("Error al cargar la lista de robots");
        }
        const data = await response.json();
        setRobots(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAllRobots();
  }, []);

  // Fetch a single robot when clicked
  const handleRobotClick = async (robotId) => {
    try {
      const response = await fetch(`http://localhost:3001/robots/${robotId}`);
      if (!response.ok) {
        throw new Error("No se pudo cargar la información del robot");
      }
      const data = await response.json();
      setSelectedRobot(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setSelectedRobot(null);
    }
  };

  return (
          <IntlProvider locale={locale} messages={messages[locale]}>
    <div className="container my-4">

        <Banner/>
      {error && <p className="text-danger">{error}</p>}

      <div className="row mt-4">
        <div className="col-md-8">
          <table className="table">
            <thead class="table-dark">
              <tr>
                <th>ID</th>
                <th> <FormattedMessage id="name" /></th>
                <th><FormattedMessage id="model" /></th>
                <th><FormattedMessage id="manufacturer" /></th>
              </tr>
            </thead>
            <tbody>
              {robots.map((robot) => (
                <tr 
                  key={robot.id} 
                  style={{ cursor: "pointer" }} 
                  onClick={() => handleRobotClick(robot.id)}
                >
                  <td>{robot.id}</td>
                  <td>{robot.nombre}</td>
                  <td>{robot.modelo}</td>
                  <td>{robot.empresaFabricante}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-md-4 d-flex justify-content-center">
          {selectedRobot ? (
            <div className="p-3" style={{
              backgroundColor: "#EAEAEA",
              border: "2px solid black",
              textAlign: "center",
              padding: "15px",
              width: "100%",
              maxWidth: "300px"
            }}>
              {/* Obligao a ponerle color especifico :( */}
              <h5 className="fw-bold">{selectedRobot.nombre}</h5>
              <img
                src={getImageFromID(selectedRobot.id)}
                alt={selectedRobot.nombre}
                className="img-fluid mb-3"
                style={{ borderRadius: "10px", maxWidth: "100%", height: "auto" }}
                />
              <p className="text-start">
                <span style={{ fontWeight: "bold" }}>→ <FormattedMessage id="year_of_manufacture" />:</span> {selectedRobot.añoFabricacion}
              </p>
              <p className="text-start">
                <span style={{ fontWeight: "bold" }}>→ <FormattedMessage id="processing_capacity" />:</span> {selectedRobot.capacidadProcesamiento}
              </p>
              <p className="text-start">
                <span style={{ fontWeight: "bold" }}>→ <FormattedMessage id="mood" />:</span> {selectedRobot.humor}
              </p>
                {/* Flechitas para que se parezca al 100% */}
            </div>
          ) : (
            <div>
            </div>
          )}
        </div>
      </div>
        <Footer/>
    </div>
        </IntlProvider>

  );
};

export default ListadoRobots;
