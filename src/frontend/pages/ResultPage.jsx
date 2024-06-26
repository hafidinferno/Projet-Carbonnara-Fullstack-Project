import React, { useRef, useEffect } from "react";
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
import chauffageQuiz from "../components/Quiz/ChauffageQuiz.jsx";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
    const chartRef = useRef(null);

    const downloadPDF = async () => {
        const input = chartRef.current;
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 15, 15, 180, 180);
        pdf.save("download.pdf");
    };

    const categories = ['electromenager', 'boissons', 'eaux', 'repas', 'fruitsetlegumes', 'transport', 'numerique', 'usagenumerique','chauffage','mobilier'];

    const carbonData = categories.map(category => parseFloat(localStorage.getItem(category) || 0));

    const pieData = {
        labels: categories,
        datasets: [{
            label: 'Répartition Carbone par Catégorie',
            data: carbonData,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#26130b', '#20B2AA', '#778899', '#6495ED', '#FFD700',"#FFA07A","#FFA01A"],
            hoverOffset: 4,
        }],
    };

    const barData = {
        labels: categories,
        datasets: [{
            label: 'Empreinte Carbone par Catégorie (kg CO2)',
            data: carbonData,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#72412e', '#20B2AA', '#778899', '#6495ED', '#FFD700',"#FFA07A","#FFA01A"],
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
          <div className="chart-container" ref={chartRef}>
            <Doughnut
              data={pieData}
              options={options}
            />
            <Bar
              data={barData}
              options={barOptions}
            />
          </div>
          <div>
            <button onClick={downloadPDF}>Télécharger en PDF</button>
          </div>
        </div>
      );
};

export default ResultPage;
