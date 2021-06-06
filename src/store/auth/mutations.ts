import { MutationTree } from 'vuex';
import { AuthStateInterface, RefreshToken } from './state';

const mutation: MutationTree<AuthStateInterface> = {
  clearAuth(state: AuthStateInterface) {
    state.token = null;
    state.refreshToken = null;
  },
  setToken(state: AuthStateInterface, token: string) {
    state.token = token;
  },
  setRefreshToken(state: AuthStateInterface, refreshToken: RefreshToken) {
    state.refreshToken = refreshToken;
  }
};

export default mutation;
