import React from 'react';

function CardMember({ name, rolePrincipal, roleSecondaire }) {
    return (
        <div className="card-member">
            <div className="member-photo"></div>
            <div className="member-info">
                <h3>{name}</h3>
                <p className="rolePrincipal">{rolePrincipal}</p>
                <p className="roleSecondaire">{roleSecondaire}</p>
            </div>
        </div>
    );
}

export default CardMember;
