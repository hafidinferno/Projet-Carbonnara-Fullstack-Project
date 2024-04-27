import React from 'react';
import CardMember from './CardMember';

function TeamSection() {
    return (
        <section id="team">
            <h2>L'ÉQUIPE</h2>
            <div className="team-container">
                <CardMember name="BOUAMAMA YOUSSEF" rolePrincipal="Backend" roleSecondaire="Base de données" />
                <CardMember name="Hayet DANOUN" rolePrincipal="Frond" roleSecondaire="UI/UX - Test" />
                <CardMember name="Olivia CHEN" rolePrincipal="Backend" roleSecondaire="Base de données" />
                <CardMember name="Hafid OUCOUC" rolePrincipal="Frond" roleSecondaire="UI/UX - Test" />
                <CardMember name="Jules BONHOTAL" rolePrincipal="UI/UX" roleSecondaire="Test" />
                <CardMember name="Noah BERTHOLON" rolePrincipal="VM - intégration" roleSecondaire="UI/UX" />
            </div>
        </section>

        
    );
}

export default TeamSection;
