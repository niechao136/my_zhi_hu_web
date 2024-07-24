
export const getLocal = (key: string) => localStorage.getItem(key)

export const setLocal = (key: string, value: string) => localStorage.setItem(key, value)

export const rmLocal = (key: string) => localStorage.removeItem(key)
