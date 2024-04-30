import React from 'react';

function CardMember({ image, name, rolePrincipal, roleSecondaire }) {
  return (
    <div className="card-member">
      {/* Utilisez la balise <img> avec l'attribut src pour afficher votre image */}
      <img src={image} alt={name} className="member-photo" />
        <div className="member-info">
          <div class="roles">
          <h3>{name}</h3>

          <p className="rolePrincipal">{rolePrincipal}</p>
          <p className="roleSecondaire">{roleSecondaire}</p>
        </div>
      </div>
    </div>
  );
}

export default CardMember;
