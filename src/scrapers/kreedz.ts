import type {
  KreedzApiRecord,
  KreedzDemoResponse,
  ScraperResult,
} from '../types/index.js';

type KzMode = 'cp' | 'non-cp';

export async function scrapeKreedz(
  mapName: string,
  mode: KzMode = 'non-cp'
): Promise<ScraperResult> {
  try {
    const response = await fetch(
      'https://kreedz.com/api/record/all-demos?sortColumn=releaseDate&sortDirection=DESC'
    );

    if (!response.ok) {
      console.error('Failed to fetch from Kreedz API');
      return null;
    }

    const data: KreedzApiRecord[] =
      (await response.json()) as KreedzApiRecord[];

    const mapRecords = data.filter((record) => record.mapName === mapName);

    if (mapRecords.length === 0) {
      console.log(`No records found for map: ${mapName} on Kreedz`);
      return null;
    }

    const hasCp = mode === 'cp';
    const filteredRecords = mapRecords.filter(
      (record) => record.hasCp === hasCp
    );

    if (filteredRecords.length === 0) {
      console.log(
        `No ${mode.toUpperCase()} records found for map: ${mapName} on Kreedz`
      );
      return null;
    }

    const firstRecord = filteredRecords[0];

    let downloadLink: string | null = null;

    try {
      const demoResponse = await fetch(
        `https://kreedz.com/api/record/demo-file?demoId=${firstRecord.demoId}`
      );

      if (demoResponse.ok) {
        const json: KreedzDemoResponse =
          (await demoResponse.json()) as KreedzDemoResponse;
        downloadLink = json.presignedUrl;
      }
    } catch (error) {
      console.error('Failed to fetch demo download link');
    }

    return {
      mapName: firstRecord.mapName,
      playerName: firstRecord.playerName,
      time: firstRecord.time,
      youtubeLink: firstRecord.youtubeLink ?? null,
      difficulty: firstRecord.difficulty ?? 'N/A',
      downloadLink,
    };
  } catch (error) {
    console.error('Error in scrapeKreedz:', error);
    return null;
  }
}
