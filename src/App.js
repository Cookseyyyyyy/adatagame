// App.js
import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Simulation from './Simulation';

function App() {
  const [dataSources, setDataSources] = useState([]);
  const [customInstructions, setCustomInstructions] = useState([]);
  const [aiModel, setAiModel] = useState('basic');
  const [responseLength, setResponseLength] = useState(50);

  const [budget] = useState(1000); // Fixed budget
  const [estimatedInteractions, setEstimatedInteractions] = useState(0);

  const [simulationRun, setSimulationRun] = useState(false);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    if (!simulationRun) {
      const newEstimatedInteractions = Math.floor(Math.random() * 100) + 50; // Between 50 and 150
      setEstimatedInteractions(newEstimatedInteractions);
    }
  }, [simulationRun]);

  const runSimulation = () => {
    let perInteractionCost = 0;
  
    // Calculate costs based on variables
    perInteractionCost += dataSources.length * 2; // Each data source adds $2 per interaction
    perInteractionCost += customInstructions.length * 1.5; // Each instruction adds $1.5 per interaction
  
    if (aiModel === 'basic') perInteractionCost += 1;
    else if (aiModel === 'advanced') perInteractionCost += 3;
    else if (aiModel === 'premium') perInteractionCost += 5;
  
    perInteractionCost += responseLength / 50; // Every 50 words adds $1
  
    const totalCost = perInteractionCost * estimatedInteractions;
  
    // **Ensure this line is present and correctly defined**
    const affordableInteractions = Math.min(
      estimatedInteractions,
      Math.floor(budget / perInteractionCost)
    );
  
    let feedbackList = [];
  
    for (let i = 0; i < estimatedInteractions; i++) {
      if (i < affordableInteractions) {
        // Generate feedback based on satisfaction
        // Base satisfaction is a random value between 0 and 0.5
        let satisfaction = Math.random() * 0.5;

        // Influence of Data Sources
        satisfaction += dataSources.length * 0.1; // Each data source adds 0.1

        // Influence of Custom Instructions
        satisfaction += customInstructions.length * 0.05; // Each instruction adds 0.05

        // Influence of AI Model
        if (aiModel === 'premium') satisfaction += 0.3;
        else if (aiModel === 'advanced') satisfaction += 0.2;
        else if (aiModel === 'basic') satisfaction += 0.1;

        // Influence of Response Length
        satisfaction += (responseLength - 50) / 300; // Normalizes response length influence

        // Cap satisfaction between 0 and 1
        satisfaction = Math.min(1, Math.max(0, satisfaction));

        // Determine sentiment based on satisfaction
        let sentiment = '';
        let feedbackText = '';

        if (satisfaction > 0.7) {
          sentiment = 'Positive';
          // Random positive feedback
          const positiveFeedbacks = [
            'The chatbot was extremely helpful and resolved my issue quickly.',
            'I am very satisfied with the chatbot’s assistance.',
            'Great experience! The chatbot answered all my questions.',
            'The chatbot provided excellent support.',
          ];
          feedbackText =
            positiveFeedbacks[Math.floor(Math.random() * positiveFeedbacks.length)];
        } else if (satisfaction > 0.4) {
          sentiment = 'Neutral';
          // Random neutral feedback
          const neutralFeedbacks = [
            'The chatbot was okay but could be improved.',
            'My experience was average; not bad but great.',
            'The chatbot helped somewhat, but I needed more information.',
            'It was neither good nor bad.',
          ];
          feedbackText =
            neutralFeedbacks[Math.floor(Math.random() * neutralFeedbacks.length)];
        } else {
          sentiment = 'Negative';
          // Random negative feedback
          const negativeFeedbacks = [
            'The chatbot did not help me at all.',
            'I am dissatisfied with the chatbot’s assistance.',
            'Poor experience; my issue remains unresolved.',
            'The chatbot was unhelpful and frustrating.',
          ];
          feedbackText =
            negativeFeedbacks[Math.floor(Math.random() * negativeFeedbacks.length)];
        }

        feedbackList.push({ sentiment, feedbackText });
      } else {
        feedbackList.push({
          sentiment: 'Negative',
          feedbackText: 'The chatbot was down and I couldn’t use it.',
        });
      }
    }
  
    setFeedback(feedbackList);
    setSimulationRun(true);
  };

  return (
    <div>
      {!simulationRun ? (
        <Dashboard
          dataSources={dataSources}
          setDataSources={setDataSources}
          customInstructions={customInstructions}
          setCustomInstructions={setCustomInstructions}
          aiModel={aiModel}
          setAiModel={setAiModel}
          responseLength={responseLength}
          setResponseLength={setResponseLength}
          budget={budget}
          estimatedInteractions={estimatedInteractions}
          runSimulation={runSimulation}
        />
      ) : (
        <Simulation feedback={feedback} setSimulationRun={setSimulationRun} />
      )}
    </div>
  );
}

export default App;
