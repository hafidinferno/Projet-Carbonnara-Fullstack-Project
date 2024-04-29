import React from 'react';
import CardMember from './CardMember';

function TeamSection() {
    return (
        <section id="team">
            <h2>L'équipe</h2>
            <div className="team-container">
                <CardMember name="BERTHOLON Noah" rolePrincipal="VM & Intégration" roleSecondaire="UI/UX" />
                <CardMember name="BONHOTAL Jules" rolePrincipal="UI/UX" roleSecondaire="Tests" />
                <CardMember name="BOUAMAMA Youssef" rolePrincipal="Backend" roleSecondaire="Base de données" />
                <CardMember name="CHEN Olivia" rolePrincipal="Backend" roleSecondaire="Base de données" />
                <CardMember name="DANOUN Hayet" rolePrincipal="Front" roleSecondaire="UI/UX - Test" />
                <CardMember name="OUCOUC Hafid" rolePrincipal="Front" roleSecondaire="UI/UX - Test" />
            </div>
        </section>

        
    );
}

export default TeamSection;
