import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ResultsStateInterface } from './state';

const getters: GetterTree<ResultsStateInterface, StateInterface> = {
  someGetter(/* context */) {
    // your code
  }
};

export default getters;
