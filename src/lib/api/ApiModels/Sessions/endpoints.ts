export const SessionsApi = {
  getAllSessions: () => 'tesseract/api/v1/tesseract/sessions',
  getSankeyData: (time: string) => 'telemetry/api/v1/sankey?startTime=' + time,
  getAppDetails: (networkName: string, destinationName: string, time: string) => `telemetry/api/v1/appdetail/network/${networkName}/destination/${destinationName}?startTime=${time}`,
};
