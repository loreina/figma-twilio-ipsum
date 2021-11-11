// Prefix suggestions
const prefixOptions = ["AC", "OR", "US"];

// Listen on input and suggest options
figma.parameters.on("input", ({ key, query, result }: ParameterInputEvent) => {
  switch (key) {
    case "prefix":
      result.setSuggestions(prefixOptions.filter((s) => s.includes(query)));
      break;
    default:
      return;
  }
});

figma.on("run", async ({ parameters }: RunEvent) => {
  // Inputs
  const prefix = parameters["prefix"];

  if (prefix.length > 2) {
      figma.notify("Prefix is more than 2 characters.", {error: true});
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
  });

  setTimeout(figma.closePlugin, 500);
});

// Function to generate SID
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
