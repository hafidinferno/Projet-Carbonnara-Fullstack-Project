import React from 'react';
import CardMember from './CardMember';

function TeamSection() {
    return (
        <section>
            <h2>L'ÉQUIPE</h2>
            <div className="team">
                <div className="team-container">
                    <CardMember name="BOUAMAMA YOUSSEF" role="Backend" specialty="Base de données" />
                    <CardMember name="Hayet DANOUN" role="Frond" specialty="UI/UX - Test" />
                    <CardMember name="Olivia CHEN" role="Backend" specialty="Base de données" />
                    <CardMember name="Hafid OUCOUC" role="Frond" specialty="UI/UX - Test" />
                    <CardMember name="Jules BONHOTAL" role="UI/UX" specialty="Test" />
                    <CardMember name="Noah BERTHOLON" role="VM - intégration" specialty="UI/UX" />
                </div>
            </div>
        </section>

        
    );
}

export default TeamSection;
