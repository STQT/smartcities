export const generateDayOptions = () => {
  return Array(31)
    .fill("_")
    .map((_, idx) => ({ label: `${idx + 1}`, value: `${idx + 1}` }))
}

export const monthOptions = [
  {
    value: 1,
    label: "Январь"
  },
  {
    value: "2",
    label: "Февраль"
  },
  {
    value: 3,
    label: "Март"
  },
  {
    value: 4,
    label: "Апрель"
  },
  {
    value: 5,
    label: "Май"
  },
  {
    value: 6,
    label: "Июнь"
  },
  {
    value: 7,
    label: "Июль"
  },
  {
    value: 8,
    label: "Август"
  },
  {
    value: 9,
    label: "Сентябрь"
  },
  {
    value: 10,
    label: "Октябрь"
  },
  {
    value: 11,
    label: "Ноябрь"
  },
  {
    value: 12,
    label: "Декабрь"
  }
]

export const yearOptions = [
  {
    value: 1991,
    label: "1991"
  },
  {
    value: 1992,
    label: "1992"
  },
  {
    value: 1993,
    label: "1993"
  },
  {
    value: 1994,
    label: "1994"
  },
  {
    value: 1995,
    label: "1995"
  },
  {
    value: 1996,
    label: "1996"
  },
  {
    value: 1997,
    label: "1997"
  },
  {
    value: 1998,
    label: "1998"
  },
  {
    value: 1999,
    label: "1999"
  },
  {
    value: 2000,
    label: "2000"
  },
  {
    value: 2001,
    label: "2001"
  },
  {
    value: 2002,
    label: "2002"
  }
]

// Only 2 genders
export const genderOptions = [
  { label: "Мужчина", value: "male" },
  { label: "Женщина", value: "female" }
]

export const addBaseURL = (str: string) => {
  if (str) {
    return str.includes("https://api.smartcities.uz")
      ? str
      : `https://api.smartcities.uz${str}`
  }
}
