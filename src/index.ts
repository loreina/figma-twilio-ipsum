// Data library
import { createIntegration } from './lib/integration';
import { createSID } from './lib/sid';

// Constants
import { sidPrefixes } from './constants/sid';

// Listen for inputs
figma.parameters.on('input', ({ key, query, result }: ParameterInputEvent) => {
  switch (key) {
    // case 'integrationType':
    //   result.setSuggestions(integrationTypes.filter((s) => s.includes(query)));
    //   break;
    case 'prefix':
      result.setSuggestions(sidPrefixes.filter((s) => s.includes(query)));
      break;
    default:
      return;
  }
});

// Array of text nodes
const textNodes: TextNode[] = [];

// Traverse current page selection for text nodes
function traverseNodes() {
  const { selection } = figma.currentPage;

  selection.forEach((node: any) => {
    if (node.type === 'TEXT') {
      textNodes.push(node);
    }
  });

  if (textNodes.length == 0) {
    figma.notify('Error: No text layers selected', { error: true });
  }
}

// Fetch data to populate based on command
async function fetchData(command, parameters) {
  switch (command) {
    case 'destination':
    case 'source':
      return await createIntegration(command);
    case 'sid':
      return await createSID(parameters);
  }
}

async function generateText(command, parameters) {
  textNodes.forEach(async (node: TextNode) => {
    const fonts = node.getRangeAllFontNames(0, node.characters.length);

    for (const font of fonts) {
      await figma.loadFontAsync(font);
    }

    // Delete all characters
    node.deleteCharacters(0, node.characters.length);

    // Replace with generated text
    node.insertCharacters(0, await fetchData(command, parameters));
  });
}

// Run plugin
figma.on('run', async ({ command, parameters }: RunEvent) => {
  traverseNodes();

  try {
    await generateText(command, parameters);
  } finally {
    figma.notify('Successfully ran Twilio Ipsum 🎉');
    setTimeout(figma.closePlugin, 500);
  }
});
