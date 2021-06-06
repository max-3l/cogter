export interface ResultsStateInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: Record<string, any>[];
}

function state(): ResultsStateInterface {
  return {
    results: []
  };
}

export default state;
