var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Prefix suggestions
const prefixOptions = ["AC", "OR", "US"];
// Listen on input and suggest options
figma.parameters.on("input", ({ key, query, result }) => {
    switch (key) {
        case "prefix":
            result.setSuggestions(prefixOptions.filter((s) => s.includes(query)));
            break;
        default:
            return;
    }
});
figma.on("run", ({ parameters }) => __awaiter(this, void 0, void 0, function* () {
    // Inputs
    const prefix = parameters["prefix"];
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
    }));
    setTimeout(figma.closePlugin, 500);
}));
// Function to generate SID
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
