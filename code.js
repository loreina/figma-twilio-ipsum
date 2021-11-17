var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Parameter suggestions
const prefixList = ["AC", "OR", "US"];
// Listen for inputs
figma.parameters.on("input", ({ key, query, result }) => {
    switch (key) {
        case "prefix":
            result.setSuggestions(prefixList.filter((s) => s.includes(query)));
            break;
        default:
            return;
    }
});
// Run plugin
figma.on("run", ({ command, parameters }) => __awaiter(this, void 0, void 0, function* () {
    // Run function based on command
    switch (command) {
        case "sid":
            createSID(parameters.prefix);
            setTimeout(figma.closePlugin, 500);
            break;
        default:
            return;
    }
}));
// Function to create dummy SIDs
function createSID(prefix) {
    // Throw error is prefix > 2 characters
    if (prefix.length > 2) {
        figma.notify("Prefix is more than 2 characters.", { error: true });
        figma.closePlugin();
    }
    // Array of selected nodes
    const nodes = figma.currentPage.selection;
    nodes.forEach((node) => __awaiter(this, void 0, void 0, function* () {
        if (node.type === "TEXT") {
            // Get all fonts of a text layer
            const fonts = node.getRangeAllFontNames(0, node.characters.length);
            // Load fonts
            for (const font of fonts) {
                yield figma.loadFontAsync(font);
            }
            // Delete all characters
            node.deleteCharacters(0, node.characters.length);
            // Replace text layer with SID
            node.insertCharacters(0, generateSID(prefix));
        }
        figma.notify("Successfully ran Twilio Dummy 🎉");
    }));
}
// Helper function to generate SID
// Twilio uses 34-character SIDs
// https://www.twilio.com/docs/glossary/what-is-a-sid#string-identifiers-at-twilio
function generateSID(prefix) {
    const IdLength = 32;
    const CharacterWhitelist = "abcdef0123456789";
    const CharactersWhitelistLength = CharacterWhitelist.length;
    let id = "";
    for (let i = 0; i < IdLength; i++) {
        id += CharacterWhitelist.charAt(Math.floor(Math.random() * CharactersWhitelistLength));
    }
    return `${prefix}${id}`;
}
