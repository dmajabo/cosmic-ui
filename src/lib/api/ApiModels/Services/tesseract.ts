export const TesseractApi = {
  getAllSessions: () => 'tesseract/api/v1/tesseract/sessions',
  getAggregatedSessions: () => 'tesseract/api/v1/tesseract/aggregatedsessions',

  getSegmentsBytes: (time: string) => `tesseract/api/v1/tesseract/segments/bytes?startTime=${time}`, // ITesseractGetBytesBetweenSegmentsResponse
  getSessionsPerSegment: (time: string) => `tesseract/api/v1/tesseract/sessions-per-segment?timeRange=${time}&filters=policy_action:ALLOW`, // policy_action:ALLOW // res => ITesseractGetTotalSessionsPerSegmentResponse
  getSessionBwSegments: (time: string) => `tesseract/api/v1/tesseract/sessions-bw-segments?timeRange=${time}`, // res => ITesseractGetSessionsBetweenSegmentsResponse

  getStitchedSessions: () => 'tesseract/api/v1/tesseract/stitched/sessions', // res => ITesseractListStitchedSessionsResponse
  getStitchedSessionsById: (sessionId: string) => `tesseract/api/v1/tesseract/stitched/sessions/${sessionId}`, // res => ITesseractGetStitchedSessionResponse
};
