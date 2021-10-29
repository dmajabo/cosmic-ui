export const SessionsApi = {
  getAllSessions: () => 'tesseract/api/v1/tesseract/sessions',
  getSankeyData: (time: string) => 'telemetry/api/v1/sankey?startTime=' + time,
};
