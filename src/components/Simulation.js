import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './Simulation.css';
import Card from './Card';

function Simulation({ feedback, setSimulationRun }) {
  const [animationDelays, setAnimationDelays] = useState([]);

  useEffect(() => {
    // Create an array of animation delays for feedback cards, speeding up the delay for each
    const delays = feedback.map((_, index) => {
      // Calculate an initial delay and make the delays shorter as we go
      return index * 100; // Increase the delay by 100ms for each subsequent card
    });
    setAnimationDelays(delays);
  }, [feedback]);

  // Calculate sentiment counts for the chart
  const sentimentCounts = feedback.reduce(
    (counts, fb) => {
      counts[fb.sentiment]++;
      return counts;
    },
    { Positive: 0, Neutral: 0, Negative: 0 }
  );

  //const totalFeedback = feedback.length;

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

      {/* Back Button */}
      <div className="back-button-container">
        <button className="back-button" onClick={() => setSimulationRun(false)}>
          Back to Dashboard
        </button>
      </div>

      {/* Pie Chart Centered */}
      <div className="pie-chart-container">
        <Card title="Sentiment Distribution">
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
        </Card>
      </div>

      {/* Feedback Cards in Grid */}
      <div className="feedback-grid">
        {feedback.map((fb, index) => (
          <div
            key={index}
            className={`feedback-card ${fb.sentiment.toLowerCase()}`}
            style={{
              animationDelay: `${animationDelays[index]}ms`, // Apply dynamic delay
            }}
          >
            <h3 className="feedback-sentiment">{fb.sentiment}</h3>
            <p className="feedback-message">{fb.feedbackText}</p>
          </div>
        ))}
      </div>

      
    </div>
  );
}

export default Simulation;
