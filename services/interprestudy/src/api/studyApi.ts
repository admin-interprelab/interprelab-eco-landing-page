// services/interprestudy/src/api/studyApi.ts
export const studyApi = {
  getMnemonic: async (root: string, en_meaning: string) => {
    console.log(`Fetching mnemonic for ${root}: ${en_meaning}`);
    // Simulate API call
    return {
      etymology: `Etymology for ${root}`,
      mnemonic: `Mnemonic for ${en_meaning}`,
    };
  },
};
