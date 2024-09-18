// Dashboard.js
import React from 'react';
import Card from './Card';
import './Dashboard.css';

const Dashboard = ({
  dataSources, setDataSources,
  customInstructions, setCustomInstructions,
  aiModel, setAiModel,
  responseLength, setResponseLength,
  runSimulation
}) => {

  const availableDataSources = ['Knowledge Base', 'FAQ', 'User Manuals'];
  const availableInstructions = ['Friendly Tone', 'Concise Answers', 'Detailed Explanations'];

  // Handlers for Data Sources and Custom Instructions
  const handleDataSourceChange = (source) => {
    if (dataSources.includes(source)) {
      setDataSources(dataSources.filter(item => item !== source));
    } else {
      setDataSources([...dataSources, source]);
    }
  };

  const handleInstructionChange = (instruction) => {
    if (customInstructions.includes(instruction)) {
      setCustomInstructions(customInstructions.filter(item => item !== instruction));
    } else {
      setCustomInstructions([...customInstructions, instruction]);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Customer Chatbot Control Dashboard</h1>
      <div className="dashboard">
        {/* Data Sources Card */}
        <Card title="Data Sources">
          {availableDataSources.map(source => (
            <div key={source}>
              <input
                type="checkbox"
                checked={dataSources.includes(source)}
                onChange={() => handleDataSourceChange(source)}
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
                onChange={() => handleInstructionChange(instruction)}
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

      {/* Run Simulation Button */}
      <div className="run-button-container">
        <button className="run-simulation-button" onClick={runSimulation}>
          Run Simulation
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
