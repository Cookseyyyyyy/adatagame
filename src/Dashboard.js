// Dashboard.js
import React from 'react';

function Dashboard(props) {
  const {
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
  } = props;

  const availableDataSources = ['Knowledge Base', 'FAQ', 'User Manuals'];
  const availableInstructions = ['Friendly Tone', 'Concise Answers', 'Detailed Explanations'];

  const handleDataSourceChange = (source) => {
    if (dataSources.includes(source)) {
      setDataSources(dataSources.filter((item) => item !== source));
    } else {
      setDataSources([...dataSources, source]);
    }
  };

  const handleInstructionChange = (instruction) => {
    if (customInstructions.includes(instruction)) {
      setCustomInstructions(customInstructions.filter((item) => item !== instruction));
    } else {
      setCustomInstructions([...customInstructions, instruction]);
    }
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
  const estimatedBudgetUsage = perInteractionCost * estimatedInteractions;

  return (
    <div>
      <h1>Dashboard</h1>

      <div>
        <h3>Budget: ${budget}</h3>
        <h3>Estimated Customer Interactions: {estimatedInteractions}</h3>
        <h3>Estimated Budget Usage: ${estimatedBudgetUsage.toFixed(2)}</h3>
      </div>

      <h2>Set Variables</h2>
      <div>
        <h3>Data Sources</h3>
        {availableDataSources.map((source) => (
          <div key={source}>
            <input
              type="checkbox"
              checked={dataSources.includes(source)}
              onChange={() => handleDataSourceChange(source)}
            />
            {source}
          </div>
        ))}
      </div>
      <div>
        <h3>Custom Instructions</h3>
        {availableInstructions.map((instruction) => (
          <div key={instruction}>
            <input
              type="checkbox"
              checked={customInstructions.includes(instruction)}
              onChange={() => handleInstructionChange(instruction)}
            />
            {instruction}
          </div>
        ))}
      </div>
      <div>
        <h3>AI Model</h3>
        <select value={aiModel} onChange={(e) => setAiModel(e.target.value)}>
          <option value="basic">Basic Model</option>
          <option value="advanced">Advanced Model</option>
          <option value="premium">Premium Model</option>
        </select>
      </div>
      <div>
        <h3>Response Length</h3>
        <input
          type="range"
          min="10"
          max="200"
          value={responseLength}
          onChange={(e) => setResponseLength(e.target.value)}
        />
        <span>{responseLength} words</span>
      </div>
      <button onClick={runSimulation}>Go</button>
    </div>
  );
}

export default Dashboard;
