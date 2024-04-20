import PropTypes from "prop-types";
import useFetchData from "../../Controleur/TestBD";

const DataDisplay = ({ url }) => {
  const { data, loading, error } = useFetchData(url);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement des données.</p>;
  if (!data) return <p>Aucune donnée à afficher.</p>; // Ajoutez ceci pour gérer l'absence de données
  console.log(Array.isArray(data));
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {data.map((data) => {
        return (
          <div
            key={data.id}
            style={{
              margin: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              padding: "20px",
              width: "300px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{data.name}</h3>
            {data.emoji && <p>Emoji: {data.emoji}</p>}
            {data.slug && <p>Slug: {data.slug}</p>}
          </div>
        );
      })}
    </div>
  );
};

DataDisplay.propTypes = {
  url: PropTypes.string.isRequired,
};

export default DataDisplay;
