import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ResultsStateInterface } from './state';

const actions: ActionTree<ResultsStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  }
};

export default actions;
