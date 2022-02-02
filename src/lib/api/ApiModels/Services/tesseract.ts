export const TesseractApi = {
  getAllSessions: () => 'tesseract/api/v1/tesseract/sessions',
  getAggregatedSessions: () => 'tesseract/api/v1/tesseract/aggregatedsessions',

  getSessionsPerSegment: (time: string) => `tesseract/api/v1/tesseract/sessions-per-segment?timeRange=${time}&filters=policy_action:DENY`, // policy_action:ALLOW // res => ITesseractGetTotalSessionsPerSegmentResponse
};
