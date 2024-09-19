import React from 'react';
import Card from './Card';
import './Dashboard.css';

const Dashboard = ({
  dataSources, setDataSources,
  customInstructions, setCustomInstructions,
  aiModel, setAiModel,
  responseLength, setResponseLength,
  budget, estimatedInteractions,
  runSimulation
}) => {

  const availableDataSources = ['Knowledge Base', 'FAQ', 'User Manuals'];
  const availableInstructions = ['Friendly Tone', 'Concise Answers', 'Detailed Explanations'];

  // Calculate estimated cost per interaction
  let perInteractionCost = 0;
  perInteractionCost += dataSources.length * 2; // Each data source adds $2 per interaction
  perInteractionCost += customInstructions.length * 1.5; // Each instruction adds $1.5 per interaction

  if (aiModel === 'basic') perInteractionCost += 1;
  else if (aiModel === 'advanced') perInteractionCost += 3;
  else if (aiModel === 'premium') perInteractionCost += 5;

  perInteractionCost += responseLength / 50; // Every 50 words adds $1

  // Estimated budget usage
  const estimatedCost = perInteractionCost * estimatedInteractions;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Customer Chatbot Control Dashboard</h1>

      {/* Budget, Estimated Interactions, and Estimated Cost */}
      <div className="dashboard-info">
        <h3>Daily Budget: ${budget}</h3>
        <h3>Estimated Customer Interactions: {estimatedInteractions}</h3>
        <h3>Estimated Cost per Interaction: ${perInteractionCost.toFixed(2)}</h3>
        <h3>Estimated Total Cost: ${estimatedCost.toFixed(2)}</h3>
      </div>

      {/* Run Simulation Button */}
      <div className="run-button-container">
        <button className="run-simulation-button" onClick={runSimulation}>
          Run Simulation
        </button>
      </div>

      <div className="dashboard">
        {/* Data Sources Card */}
        <Card title="Data Sources">
          {availableDataSources.map(source => (
            <div key={source}>
              <input
                type="checkbox"
                checked={dataSources.includes(source)}
                onChange={() => {
                  if (dataSources.includes(source)) {
                    setDataSources(dataSources.filter(item => item !== source));
                  } else {
                    setDataSources([...dataSources, source]);
                  }
                }}
              />
              <label>{source}</label>
            </div>
          ))}
        </Card>

        {/* Custom Instructions Card */}
        <Card title="Custom Instructions">
          {availableInstructions.map(instruction => (
            <div key={instruction}>
              <input
                type="checkbox"
                checked={customInstructions.includes(instruction)}
                onChange={() => {
                  if (customInstructions.includes(instruction)) {
                    setCustomInstructions(customInstructions.filter(item => item !== instruction));
                  } else {
                    setCustomInstructions([...customInstructions, instruction]);
                  }
                }}
              />
              <label>{instruction}</label>
            </div>
          ))}
        </Card>

        {/* AI Model Card */}
        <Card title="AI Model">
          <select value={aiModel} onChange={(e) => setAiModel(e.target.value)}>
            <option value="basic">Basic Model</option>
            <option value="advanced">Advanced Model</option>
            <option value="premium">Premium Model</option>
          </select>
        </Card>

        {/* Response Length Card */}
        <Card title="Response Length">
          <input
            type="range"
            min="10"
            max="200"
            value={responseLength}
            onChange={(e) => setResponseLength(e.target.value)}
          />
          <span>{responseLength} words</span>
        </Card>
      </div>

      
    </div>
  );
};

export default Dashboard;
