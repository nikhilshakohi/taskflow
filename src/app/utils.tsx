export interface Itasks {
    current: string[];
    backlog: string[];
  }

export const parse = (str: string) => JSON.parse(str);
  

export const setLocal = (state: Record<string, unknown>) =>
  Object.entries(state).forEach(([key, value]) =>
    localStorage.setItem(key, JSON.stringify(value))
  );
  