export async function fetchProteinData(query: string) {
  const uniprotResponse = await fetch(`https://rest.uniprot.org/uniprotkb/search?query=${query}&format=json`);
  const uniprotData = await uniprotResponse.json();

  if (uniprotData.results && uniprotData.results.length > 0) {
    const pdbId = uniprotData.results[0].uniProtKBCrossReferences
      .find((ref: any) => ref.database === 'PDB')?.id;

    if (pdbId) {
      const pdbResponse = await fetch(`https://data.rcsb.org/rest/v1/core/entry/${pdbId}`);
      const pdbData = await pdbResponse.json();
      return { uniprotData: uniprotData.results[0], pdbData };
    }
  }

  return { uniprotData: uniprotData.results[0], pdbData: null };
}

