import { MutationTree } from 'vuex';
import { ResultsStateInterface } from './state';

const mutation: MutationTree<ResultsStateInterface> = {
  addResult(state: ResultsStateInterface, result: Record<string, never>) {
    state.results.push(result);
  },
  clearResults(state: ResultsStateInterface) {
    state.results = [];
  }
};

export default mutation;
