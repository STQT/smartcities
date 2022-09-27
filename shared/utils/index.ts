export const addBaseURL = (str: string) => {
  if (str) {
    return str.includes("https://api.smartcities.uz")
      ? str
      : `https://api.smartcities.uz${str}`
  }
}
