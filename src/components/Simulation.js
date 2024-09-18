// Simulation.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './Simulation.css';

function Simulation({ feedback, setSimulationRun }) {
  // Calculate sentiment counts for the chart
  const sentimentCounts = feedback.reduce(
    (counts, fb) => {
      counts[fb.sentiment]++;
      return counts;
    },
    { Positive: 0, Neutral: 0, Negative: 0 }
  );

  const totalFeedback = feedback.length;

  const data = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        data: [
          sentimentCounts.Positive,
          sentimentCounts.Neutral,
          sentimentCounts.Negative,
        ],
        backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
      },
    ],
  };

  return (
    <div className="simulation-container">
      <h1 className="feedback-title">Customer Feedback</h1>

      {/* Pie Chart Centered */}
      <div className="pie-chart-container">
        <h2>Sentiment Distribution</h2>
        <Pie
          data={data}
          options={{
            plugins: {
              legend: {
                display: true,
              },
            },
            elements: {
              arc: {
                borderWidth: 0,
                borderColor: 'grey',
              },
            },
          }}
        />
      </div>

      {/* Feedback Cards in Grid */}
      <div className="feedback-grid">
        {feedback.map((fb, index) => (
          <div
            key={index}
            className={`feedback-card ${fb.sentiment.toLowerCase()}`}
          >
            <h3 className="feedback-sentiment">{fb.sentiment}</h3>
            <p className="feedback-message">{fb.feedbackText}</p>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <div className="back-button-container">
        <button className="back-button" onClick={() => setSimulationRun(false)}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Simulation;
