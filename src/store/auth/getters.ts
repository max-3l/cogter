import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { AuthStateInterface, RefreshToken } from './state';

const getters: GetterTree<AuthStateInterface, StateInterface> = {
  token(state: AuthStateInterface): string | null {
    return state.token;
  },
  refreshToken(state: AuthStateInterface): RefreshToken | null {
    return state.refreshToken;
  },
  isAuthenticated(state: AuthStateInterface): boolean {
    return (state.token !== null) && (state.refreshToken !== null);
  }
};

export default getters;
