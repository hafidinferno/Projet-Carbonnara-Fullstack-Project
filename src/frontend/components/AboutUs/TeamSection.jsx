import React from 'react';
import CardMember from './CardMember';
import youssefImage from '../../images/AboutUs/BOUAMAMA_Youssef.png';
import hayetImage from '../../images/AboutUs/DANOUN_Hayet.png';
import oliviaImage from '../../images/AboutUs/CHEN_Olivia.png';
import hafidImage from '../../images/AboutUs/OUCOUC_Hafid.png';
import julesImage from '../../images/AboutUs/BONHOTAL_Jules.png';
import noahImage from '../../images/AboutUs/BERTHOLON_Noah.png';

function TeamSection() {
    return (
        <section id="team">
            <h2>L'ÉQUIPE</h2>
            <div className="team-container">
                <CardMember image={youssefImage} name="BOUAMAMA YOUSSEF" rolePrincipal="Backend" roleSecondaire="Base de données" />
                <CardMember image={hayetImage} name="Hayet DANOUN" rolePrincipal="Frond" roleSecondaire="UI/UX - Test" />
                <CardMember image={oliviaImage} name="Olivia CHEN" rolePrincipal="Backend" roleSecondaire="Base de données" />
                <CardMember image={hafidImage} name="Hafid OUCOUC" rolePrincipal="Frond" roleSecondaire="UI/UX - Test" />
                <CardMember image={julesImage} name="Jules BONHOTAL" rolePrincipal="UI/UX" roleSecondaire="Test" />
                <CardMember image={noahImage} name="Noah BERTHOLON" rolePrincipal="VM - intégration" roleSecondaire="UI/UX" />
            </div>
        </section>

        
    );
}

export default TeamSection;
