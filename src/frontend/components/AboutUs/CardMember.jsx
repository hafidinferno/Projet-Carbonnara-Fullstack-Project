import React from 'react';

function CardMember({ image, name, rolePrincipal, roleSecondaire }) {
  return (
    <div className="card-member">
      <img src={image} alt={name} className="member-photo" />
      <div className="member-info">
        <h3>{name}</h3>

        <p className="rolePrincipal">{rolePrincipal}</p>
        <p className="roleSecondaire">{roleSecondaire}</p>
      </div>
    </div>
  );
}

export default CardMember;
