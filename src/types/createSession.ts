export interface UploadedPage {
  id: string;
  fileName: string;
  fileSizeKB: number;
  pageLabel: string;
  ocrStatus: string;
  thumbnailColor?: string;
}

export interface GenerationEstimate {
  estimatedCards: number;
  mechanismsCount: number;
  termsCount: number;
  yieldEquationsCount: number;
  estimatedSeconds: number;
}