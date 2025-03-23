export interface Itasks {
  current: string[];
  backlog: string[];
}

export const parse = (str: string | null) => (str ? JSON.parse(str) : null);

export const setLocal = (state: Record<string, unknown>) =>{
  if (typeof window !== "undefined")
    Object.entries(state).forEach(([key, value]) =>
      localStorage.setItem(key, JSON.stringify(value))
    );
}

export const getLocal = (key: string) =>
  typeof window === "undefined" ? null : localStorage.getItem(key);
