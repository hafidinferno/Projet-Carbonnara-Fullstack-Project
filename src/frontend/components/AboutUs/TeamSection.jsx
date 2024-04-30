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
            <h2>L'équipe</h2>
            <div className="team-container">
                <CardMember image={youssefImage} name="BERTHOLON Noah" rolePrincipal="VM & Intégration" roleSecondaire="UI/UX" />
                <CardMember image={hayetImage} name="BONHOTAL Jules" rolePrincipal="UI/UX" roleSecondaire="Tests" />
                <CardMember image={oliviaImage} name="BOUAMAMA Youssef" rolePrincipal="Backend" roleSecondaire="Base de données" />
                <CardMember image={hafidImage} name="CHEN Olivia" rolePrincipal="Backend" roleSecondaire="Base de données" />
                <CardMember image={julesImage} name="DANOUN Hayet" rolePrincipal="Front" roleSecondaire="UI/UX - Test" />
                <CardMember image={noahImage} name="OUCOUC Hafid" rolePrincipal="Front" roleSecondaire="UI/UX - Test" />
            </div>
        </section>

        
    );
}

export default TeamSection;
