import type {
  KreedzApiRecord,
  KreedzDemoResponse,
  ScraperResult,
} from '../types/index.js';

export async function scrapeKreedz(mapName: string): Promise<ScraperResult> {
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

    const firstRecord = data.find((record) => record.mapName === mapName);

    if (!firstRecord) {
      console.log('No records found for map:', mapName, 'on Kreedz');
      return null;
    }

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
