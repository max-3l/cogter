export interface RefreshToken {
  refreshToken: string;
  issuedAt: string;
  client: string;
  userId: number;
}

export interface AuthStateInterface {
  token: null | string;
  refreshToken: null | RefreshToken;
}

function state(): AuthStateInterface {
  return {
    token: null,
    refreshToken: null
  };
}

export default state;
