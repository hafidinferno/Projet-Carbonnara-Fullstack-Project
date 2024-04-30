import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import "../CSS/ResultPage.css";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Title,
    CategoryScale,
    LinearScale,
    BarElement,
    ChartDataLabels
);

const ResultPage = () => {
    const categories = ['electromenager', 'boissons', 'eaux', 'repas', 'fruitsetlegumes', 'transport', 'numerique', 'usagenumerique'];

    const carbonData = categories.map(category => parseFloat(localStorage.getItem(category) || 0));

    const pieData = {
        labels: categories,
        datasets: [{
            label: 'Répartition Carbone par Catégorie',
            data: carbonData,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FFA07A', '#20B2AA', '#778899', '#6495ED', '#FFD700'],
            hoverOffset: 4,
        }],
    };

    const barData = {
        labels: categories,
        datasets: [{
            label: 'Empreinte Carbone par Catégorie (kg CO2)',
            data: carbonData,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FFA07A', '#20B2AA', '#778899', '#6495ED', '#FFD700'],
        }],
    };

    const options = {
        plugins: {
            legend: {
                position: "top",
            },
            datalabels: {
                color: '#fff',
                formatter: (value, ctx) => `${(value * 100 / ctx.chart._metasets[0].total).toFixed(2)}%`,
                font: {
                    weight: 'bold'
                }
            },
            title: {
                display: true,
                text: "Répartition de l'Empreinte Carbone par Catégorie",
            },
        },
    };

    const barOptions = {
        plugins: {
            legend: {
                position: 'top',
            },
            datalabels: {
                color: '#000',
                display: true,
                anchor: 'end',
                align: 'top',
                formatter: (value) => `${value.toFixed(2)} kg CO2`,
            },
            title: {
                display: true,
                text: 'Empreinte Carbone par Catégorie',
            },
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div className="result-container">
            <h2>Répartition de l'Empreinte Carbone</h2>
            <div className="chart-container">
                <Doughnut
                    data={pieData}
                    options={options}
                />
            </div>
            <div className="chart-container">
                <Bar
                    data={barData}
                    options={barOptions}
                />
            </div>
        </div>
    );
};

export default ResultPage;
