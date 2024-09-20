// Dashboard.js
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

  // Handlers for Data Sources and Custom Instructions
  const handleDataSourceToggle = (source) => {
    if (dataSources.includes(source)) {
      setDataSources(dataSources.filter(item => item !== source));
    } else {
      setDataSources([...dataSources, source]);
    }
  };

  const handleInstructionToggle = (instruction) => {
    if (customInstructions.includes(instruction)) {
      setCustomInstructions(customInstructions.filter(item => item !== instruction));
    } else {
      setCustomInstructions([...customInstructions, instruction]);
    }
  };

  const handleAIModeChange = (event) => {
    setAiModel(event.target.value);
  };

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
        <div className="info-item">
          <h3>Daily Budget: ${budget}</h3>
        </div>
        <div className="info-item">
          <h3>Estimated Customer Interactions: {estimatedInteractions}</h3>
        </div>
        <div className="info-item">
          <h3>Estimated Cost per Interaction: ${perInteractionCost.toFixed(2)}</h3>
        </div>
        <div className="info-item">
          <h3>Estimated Total Cost: ${estimatedCost.toFixed(2)}</h3>
        </div>
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
          <div className="toggle-container">
            {availableDataSources.map(source => (
              <label key={source} className="switch">
                <input
                  type="checkbox"
                  checked={dataSources.includes(source)}
                  onChange={() => handleDataSourceToggle(source)}
                />
                <span className="slider"></span>
                <span className="toggle-label" title={source}>{source}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Custom Instructions Card */}
        <Card title="Custom Instructions">
          <div className="toggle-container">
            {availableInstructions.map(instruction => (
              <label key={instruction} className="switch">
                <input
                  type="checkbox"
                  checked={customInstructions.includes(instruction)}
                  onChange={() => handleInstructionToggle(instruction)}
                />
                <span className="slider"></span>
                <span className="toggle-label" title={instruction}>{instruction}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* AI Model Card */}
        <Card title="AI Model">
          <div className="radio-group">
            {['basic', 'advanced', 'premium'].map(model => (
              <label key={model} className={`radio-label ${model}`}>
                <input
                  type="radio"
                  name="aiModel"
                  value={model}
                  checked={aiModel === model}
                  onChange={handleAIModeChange}
                />
                <span className="radio-text">
                  {model.charAt(0).toUpperCase() + model.slice(1)} Model
                </span>
              </label>
            ))}
          </div>
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
