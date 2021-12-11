import { destinations, sources } from '../../constants/integration';

// Function to generate a random integration based on type
// Taken from Segment catalog: https://segment.com/catalog/
export function createIntegration(command) {
  switch (command) {
    case 'destination':
      const destinationText = destinations[Math.floor(Math.random() * destinations.length)];
      return destinationText.toString();
    case 'source':
      const sourceText = sources[Math.floor(Math.random() * sources.length)];
      return sourceText.toString();
  }
}
