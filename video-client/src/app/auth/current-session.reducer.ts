
export interface CurrentSession {
  name: string;
  nickname: string;
  picture: string;
  updated_at: Date;
}

export function currentSession(state: CurrentSession, { type, payload }: { type: string, payload?: any }) {
  switch (type) {
    case 'LOGIN':
      return payload;
    case 'LOG_OUT':
      return undefined;
    default:
      return state;
  }
}

export function login(session) {
  return { type: 'LOGIN', payload: session };
}

export function logout() {
  return { type: 'LOG_OUT' };
}