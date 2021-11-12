// Parameter suggestions
const prefixList = ["AC", "OR", "US"];

// Listen for inputs
figma.parameters.on("input", ({ key, query, result }: ParameterInputEvent) => {
  switch (key) {
    case "prefix":
      result.setSuggestions(prefixList.filter((s) => s.includes(query)));
      break;
    default:
      return;
  }
});

// Run plugin
figma.on("run", async ({ command, parameters }: RunEvent) => {
  // Run function based on command
  switch (command) {
    case "sid":
      createSID(parameters.prefix);
      setTimeout(figma.closePlugin, 500);
      break;
    default:
      return;
  }
});

// Function to create dummy SIDs
function createSID(prefix) {
  // Throw error is prefix > 2 characters
  if (prefix.length > 2) {
    figma.notify("Prefix is more than 2 characters.", { error: true });
    figma.closePlugin();
  }

  // Array of selected nodes
  const nodes = figma.currentPage.selection;

  nodes.forEach(async (node: TextNode) => {
    if (node.type === "TEXT") {
      // Get all fonts of a text layer
      const fonts = node.getRangeAllFontNames(0, node.characters.length);

      // Load fonts
      for (const font of fonts) {
        await figma.loadFontAsync(font);
      }

      // Delete all characters
      node.deleteCharacters(0, node.characters.length);

      // Replace text layer with SID
      node.insertCharacters(0, generateSID(prefix));
    }

    figma.notify("Successfully ran Twilio Dummy 🎉");
  });
}

// Helper function to generate SID
function generateSID(prefix) {
  const IdLength = 32;
  const CharacterWhitelist = "abcdef0123456789";
  const CharactersWhitelistLength = CharacterWhitelist.length;

  let id = "";
  for (let i = 0; i < IdLength; i++) {
    id += CharacterWhitelist.charAt(
      Math.floor(Math.random() * CharactersWhitelistLength)
    );
  }

  return `${prefix}${id}`;
}
