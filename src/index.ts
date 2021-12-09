// Data types
import { createSID, sidPrefixList } from './data/sid';

// Listen for inputs
figma.parameters.on('input', ({ key, query, result }: ParameterInputEvent) => {
  switch (key) {
    case 'prefix':
      result.setSuggestions(sidPrefixList.filter((s) => s.includes(query)));
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

async function fetchData(type, params) {
  switch (type) {
    case 'sid':
      return await createSID(params);
  }
}

async function generateText(type, params) {
  textNodes.forEach(async (node: TextNode) => {
    const fonts = node.getRangeAllFontNames(0, node.characters.length);

    for (const font of fonts) {
      await figma.loadFontAsync(font);
    }

    // Delete all characters
    node.deleteCharacters(0, node.characters.length);

    // Replace with generated text
    node.insertCharacters(0, await fetchData(type, params));
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
