import Papa from 'papaparse';

// Function to load and parse the CSV file
export const loadFeedback = async () => {
  const response = await fetch('/feedback.csv');
  const csvData = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        // Parse the conditions into a more usable format
        const feedbackEntries = results.data.map(entry => ({
          tone: entry.tone,
          condition: entry.condition,
          message: entry.message
        }));
        resolve(feedbackEntries);
      },
      error: (error) => reject(error)
    });
  });
};
