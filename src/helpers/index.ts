// Generate text
export function generateText(input) {
  // Array of selected nodes
  const nodes = figma.currentPage.selection;

  nodes.forEach(async (node: TextNode) => {
    if (node.type === 'TEXT') {
      // Get all fonts of a text layer
      const fonts = node.getRangeAllFontNames(0, node.characters.length);

      // Load fonts
      for (const font of fonts) {
        await figma.loadFontAsync(font);
      }

      // Delete all characters
      node.deleteCharacters(0, node.characters.length);

      // Replace with generated text
      node.insertCharacters(0, input);
    }

    figma.notify('Successfully ran Twilio Ipsum 🎉');
  });
}
