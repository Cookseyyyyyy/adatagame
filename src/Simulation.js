// Simulation.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

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
        backgroundColor: ['#28a745', '#6c757d', '#dc3545'],
      },
    ],
  };

  return (
    <div>
      <h1>Customer Feedback</h1>

      {/* Sentiment Distribution Chart */}
      <div>
        <h2>Sentiment Distribution</h2>
        <Pie data={data} />
      </div>

      {/* Feedback Table */}
      <table>
        <thead>
          <tr>
            <th>Sentiment</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {feedback.map((fb, index) => (
            <tr
              key={index}
              style={{
                backgroundColor:
                  fb.sentiment === 'Positive'
                    ? '#d4edda'
                    : fb.sentiment === 'Negative'
                    ? '#f8d7da'
                    : '#e2e3e5',
              }}
            >
              <td>{fb.sentiment}</td>
              <td>{fb.feedbackText}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setSimulationRun(false)}>Back to Dashboard</button>
    </div>
  );
}

export default Simulation;
