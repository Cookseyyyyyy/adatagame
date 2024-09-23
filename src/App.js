// App.js
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Simulation from './components/Simulation';
import { loadFeedback } from './utils/loadFeedback';
import Jexl from 'jexl'; // Import Jexl

function App() {
  const [dataSources, setDataSources] = useState([]);
  const [customInstructions, setCustomInstructions] = useState([]);
  const [aiModel, setAiModel] = useState('basic');
  const [responseLength, setResponseLength] = useState(50);

  const [budget] = useState(750); // Fixed budget
  const [estimatedInteractions, setEstimatedInteractions] = useState(0);

  const [simulationRun, setSimulationRun] = useState(false);
  const [feedback, setFeedback] = useState([]);
  
  const [feedbackData, setFeedbackData] = useState([]);

  // **New State for Day Counter**
  const [day, setDay] = useState(0);

  useEffect(() => {
    // Load feedback data on component mount
    loadFeedback()
      .then(data => setFeedbackData(data))
      .catch(error => console.error('Error loading feedback data:', error));
  }, []);

  useEffect(() => {
    if (!simulationRun) {
      const newEstimatedInteractions = Math.floor(Math.random() * 100) + 50; // Between 50 and 150
      setEstimatedInteractions(newEstimatedInteractions);
    }
  }, [simulationRun]);

  const runSimulation = async () => {
    let perInteractionCost = 0;
  
    // Calculate costs based on variables
    perInteractionCost += dataSources.length * 2;
    perInteractionCost += customInstructions.length * 1.5;
  
    if (aiModel === 'basic') perInteractionCost += 1;
    else if (aiModel === 'advanced') perInteractionCost += 3;
    else if (aiModel === 'premium') perInteractionCost += 5;
  
    perInteractionCost += responseLength / 50;
  
    // Calculate affordable interactions based on budget
    const affordableInteractions = Math.min(
      estimatedInteractions,
      Math.floor(budget / perInteractionCost)
    );
  
    let feedbackList = [];
  
    // Prepare the context for condition evaluation
    const context = {
      friendlyTone: customInstructions.includes('Friendly Tone'),
      conciseResponses: customInstructions.includes('Concise Answers'),
      detailedExplanations: customInstructions.includes('Detailed Explanations'),
      responseLength: parseInt(responseLength, 10),
      satisfaction: 0, // Placeholder, will be calculated
      budgetExhausted: false, // To be set when budget is exhausted
    };
  
    for (let i = 0; i < estimatedInteractions; i++) {
      if (i < affordableInteractions) {
        // Calculate satisfaction
        let satisfaction = Math.random() * 0.5; // Base random satisfaction
  
        // Adjust satisfaction based on the AI model, tone, and response length
        if (aiModel === 'premium') satisfaction += 0.3;
        else if (aiModel === 'advanced') satisfaction += 0.2;
        else if (aiModel === 'basic') satisfaction += 0.1;
  
        if (context.friendlyTone) satisfaction += 0.1;
        if (context.conciseResponses) satisfaction += 0.05;
        if (context.detailedExplanations) satisfaction += 0.05;
        
        satisfaction += (context.responseLength - 50) / 300;
  
        satisfaction = Math.min(1, Math.max(0, satisfaction)); // Ensure satisfaction is between 0 and 1
        context.satisfaction = satisfaction;
  
        // Match feedback from the CSV based on context
        let selectedFeedback = null;
        let matchingFeedbacks = feedbackData.filter(entry => {
          try {
            return Jexl.evalSync(entry.condition, context);
          } catch (error) {
            console.error('Error evaluating condition:', error);
            return false;
          }
        });
  
        if (matchingFeedbacks.length > 0) {
          const randomIndex = Math.floor(Math.random() * matchingFeedbacks.length);
          selectedFeedback = matchingFeedbacks[randomIndex];
        } else {
          selectedFeedback = { message: 'No feedback available for this situation.' };
        }
  
        feedbackList.push({ sentiment: selectedFeedback.tone, feedbackText: selectedFeedback.message });
      } else {
        // Budget exhaustion logic
        context.budgetExhausted = true;
  
        let budgetFeedback = feedbackData.find(entry => entry.condition === 'budgetExhausted == true');
        feedbackList.push({ sentiment: 'Negative', feedbackText: budgetFeedback ? budgetFeedback.message : 'The chatbot is down.' });
      }
    }
  
    setFeedback(feedbackList);
    setSimulationRun(true);

    // **Increment Day Count When Simulation Ends**
    setDay(prevDay => prevDay + 1);
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
          day={day}           /* **Pass Day as Prop** */
          setDay={setDay}     /* **Pass setDay as Prop** */
        />
      ) : (
        <Simulation 
          feedback={feedback} 
          setSimulationRun={setSimulationRun} 
        />
      )}
    </div>
  );
}

export default App;
