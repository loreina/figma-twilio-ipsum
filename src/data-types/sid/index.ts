// Parameter suggestions
export const sidPrefixList = ['AC', 'OR', 'US'];

// Function to create dummy SIDs
export function createSID(prefix) {
  // Throw error is prefix > 2 characters
  if (prefix.length > 2) {
    figma.notify('Prefix is more than 2 characters.', {error: true});
    figma.closePlugin();
  } else {
    const IdLength = 32;
    const CharacterWhitelist = 'abcdef0123456789';
    const CharactersWhitelistLength = CharacterWhitelist.length;

    let id = '';
    for (let i = 0; i < IdLength; i++) {
      id += CharacterWhitelist.charAt(Math.floor(Math.random() * CharactersWhitelistLength));
    }

    return `${prefix}${id}`;
  }
}

// // Helper function to generate SID
// // Twilio uses 34-character SIDs
// // https://www.twilio.com/docs/glossary/what-is-a-sid#string-identifiers-at-twilio
// function generateSID(prefix) {

// }
