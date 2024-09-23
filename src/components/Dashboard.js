// components/Dashboard.js
import React, { useState, useEffect } from 'react';
import Card from './Card';
import Tooltip from './Tooltip';
import Overlay from './Overlay'; // Import the Overlay component
import './Dashboard.css';

const Dashboard = ({
  dataSources,
  setDataSources,
  customInstructions,
  setCustomInstructions,
  aiModel,
  setAiModel,
  responseLength,
  setResponseLength,
  budget,
  estimatedInteractions,
  runSimulation,
  day,       // **Receive Day as Prop**
  setDay,    // **Receive setDay as Prop (if needed)**
}) => {
  // State for Overlay visibility
  const [isOverlayVisible, setIsOverlayVisible] = useState(day === 0); // Show overlay only on day 0

  // Effect to reset Overlay visibility when day changes
  useEffect(() => {
    if (day === 0) {
      setIsOverlayVisible(true);
    } else {
      setIsOverlayVisible(false);
    }
  }, [day]);

  // Available options
  const availableDataSources = [
    'Knowledge Base',
    'FAQ',
    'User Manuals',
  ];
  const availableInstructions = [
    'Friendly Tone',
    'Concise Answers',
    'Detailed Explanations',
  ];

  // Handlers for Data Sources and Custom Instructions
  const handleDataSourceToggle = (source) => {
    if (dataSources.includes(source)) {
      setDataSources(dataSources.filter((item) => item !== source));
    } else {
      setDataSources([...dataSources, source]);
    }
  };

  const handleInstructionToggle = (instruction) => {
    if (customInstructions.includes(instruction)) {
      setCustomInstructions(
        customInstructions.filter((item) => item !== instruction)
      );
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

  // Handler for running the simulation and tracking days
  const handleRunSimulation = () => {
    runSimulation(); // Execute the simulation logic
    // **Overlay will be managed based on day in the useEffect**
  };

  // Function to hide the overlay manually (if needed)
  const hideOverlay = () => {
    setIsOverlayVisible(false);
  };

  // Static overlay content for day 0
  const initialOverlayContent = {
    image: 'images/mtcooksey_a_3d_pixar_style_avatar_older_female_professional_9fb7709e-4b83-4260-8eda-685c2747d86d.png', // Ensure this path is correct
    title: 'Welcome to the Game!',
    bodyText:
      'Get ready to embark on an exciting journey. Here are some instructions to get you started...',
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Customer Chatbot Control Dashboard</h1>

      {/* Current Day Display */}
      <div className="current-day">
        <h2>Day: {day}</h2> {/* **Display Day from Props** */}
      </div>

      {/* Dashboard Info with Tooltip */}
      <Tooltip
        text="The number of customer interactions changes daily. The cost of an individual interaction is affected by the choices you make. The total cost is calculated by multiplying the estimated number of interactions by the cost per interaction."
      >
        <div className="dashboard-info">
          <div className="info-item">
            <h3>Daily Budget: ${budget}</h3>
          </div>
          <div className="info-item">
            <h3>Estimated Customer Interactions: {estimatedInteractions}</h3>
          </div>
          <div className="info-item">
            <h3>
              Estimated Cost per Interaction: $
              {perInteractionCost.toFixed(2)}
            </h3>
          </div>
          <div className="info-item">
            <h3>Estimated Total Cost: ${estimatedCost.toFixed(2)}</h3>
          </div>
        </div>
      </Tooltip>

      {/* Run Simulation Button */}
      <div className="run-button-container">
        <Tooltip text="Click to simulate customer interactions based on your current settings.">
          <button
            className="run-simulation-button"
            onClick={handleRunSimulation}
          >
            Start Day
          </button>
        </Tooltip>
      </div>

      <div className="dashboard">
        {/* Data Sources Card with Tooltip */}
        <Tooltip text="Select the data sources that the chatbot will use to fetch information.">
          <Card title={<span>Data Sources</span>}>
            <div className="toggle-container">
              {availableDataSources.map((source) => (
                <label key={source} className="switch">
                  <input
                    type="checkbox"
                    checked={dataSources.includes(source)}
                    onChange={() => handleDataSourceToggle(source)}
                  />
                  <span className="slider"></span>
                  <span className="toggle-label">{source}</span>
                </label>
              ))}
            </div>
          </Card>
        </Tooltip>

        {/* Custom Instructions Card with Tooltip */}
        <Tooltip text="Define how the chatbot should communicate with users, such as tone and verbosity.">
          <Card title={<span>Custom Instructions</span>}>
            <div className="toggle-container">
              {availableInstructions.map((instruction) => (
                <label key={instruction} className="switch">
                  <input
                    type="checkbox"
                    checked={customInstructions.includes(instruction)}
                    onChange={() => handleInstructionToggle(instruction)}
                  />
                  <span className="slider"></span>
                  <span className="toggle-label">
                    {instruction}
                  </span>
                </label>
              ))}
            </div>
          </Card>
        </Tooltip>

        {/* AI Model Card with Tooltip */}
        <Tooltip text="Choose the AI model that determines the chatbot's capabilities and cost.">
          <Card title={<span>AI Model</span>}>
            <div className="radio-group">
              {['basic', 'advanced', 'premium'].map((model) => (
                <label
                  key={model}
                  className={`radio-label ${model}`}
                >
                  <input
                    type="radio"
                    name="aiModel"
                    value={model}
                    checked={aiModel === model}
                    onChange={handleAIModeChange}
                  />
                  <span className="radio-text">
                    {model.charAt(0).toUpperCase() + model.slice(1)}{' '}
                    Model
                  </span>
                </label>
              ))}
            </div>
          </Card>
        </Tooltip>

        {/* Response Length Card with Tooltip */}
        <Tooltip text="Adjust the length of the chatbot's responses to balance detail and cost.">
          <Card title={<span>Response Length</span>}>
            <input
              type="range"
              min="10"
              max="200"
              value={responseLength}
              onChange={(e) => setResponseLength(e.target.value)}
            />
            <span>{responseLength} words</span>
          </Card>
        </Tooltip>
      </div>

      {/* Overlay Component */}
      {day === 0 && isOverlayVisible && (
        <Overlay
          image={initialOverlayContent.image}
          title={initialOverlayContent.title}
          bodyText={initialOverlayContent.bodyText}
          onClose={hideOverlay}
        />
      )}
    </div>
  );
};

export default Dashboard;
