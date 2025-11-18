export interface RecordData {
  mapName: string;
  playerName: string;
  time: string;
  youtubeLink: string | null;
  difficulty: string;
  downloadLink: string | null;
}

export interface KzRushRawRecord {
  mapName: string;
  mapUrl: string;
  time: string;
  player: string;
  downloadLink: string;
  youtubeLink: string | null;
}

export interface KreedzApiRecord {
  mapName: string;
  playerName: string;
  time: string;
  youtubeLink?: string | null;
  difficulty?: string;
  demoId: string;
  hasCp: boolean;
  [key: string]: unknown;
}

export interface KreedzDemoResponse {
  presignedUrl: string;
  fileName: string;
}

export type ScraperResult = RecordData | null;
