import fetch from 'node-fetch';

const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
  token_type: string;
  id_token?: string;
  [key: string]: any;
}

export async function exchangeCodeForToken(code: string, clientId: string, clientSecret: string, redirectUri: string): Promise<TokenResponse> {
  const params = new URLSearchParams();
  params.append('code', code);
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('redirect_uri', redirectUri);
  params.append('grant_type', 'authorization_code');

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new Error(`Failed to exchange code: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
