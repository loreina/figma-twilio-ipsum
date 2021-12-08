import { createSID, sidPrefixList } from "./sid";

// Listen for inputs
figma.parameters.on("input", ({ key, query, result }: ParameterInputEvent) => {
  switch (key) {
    case "prefix":
      result.setSuggestions(sidPrefixList.filter((s) => s.includes(query)));
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