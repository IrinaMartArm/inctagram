export const countries = [
  { title: "Belarus", value: "Belarus" },
  { title: "Russia", value: "Russia" },
  { title: "Kazakhstan", value: "Kazakhstan" },
  { title: "Georgia", value: "Georgia" },
  { title: "Armenia", value: "Armenia" },
];
export const russ = [
  { title: "Moscow", value: "Moscow" },
  { title: "Krasnodar", value: "Krasnodar" },
  { title: "Sochi", value: "Sochi" },
  { title: "Volgograd", value: "Volgograd" },
];
export const belarus = [
  { title: "Minsk", value: "Minsk" },
  { title: "Vitebsk", value: "Vitebsk" },
  { title: "Gomel", value: "Gomel" },
  { title: "Brest", value: "Brest" },
];
export const kazakhstan = [
  { title: "Astana", value: "Astana" },
  { title: "Aqtobe", value: "Aqtobe" },
  { title: "Kostanai", value: "Kostanai" },
  { title: "Karaganda", value: "Karaganda" },
];

export const getCityOptions = (country: string) => {
  if (country === "Russia") {
    return russ;
  } else if (country === "Belarus") {
    return belarus;
  } else if (country === "Kazakhstan") {
    return kazakhstan;
  } else {
    return belarus;
  }
};

export const getCountryWithCityName = (cityFromServer: string) => {
  const countriesWithCities = {
    Belarus: belarus,
    Kazakhstan: kazakhstan,
    Russia: russ,
  };

  for (const [country, cities] of Object.entries(countriesWithCities)) {
    // Проверяем, есть ли город в массиве городов текущей страны
    if (cities.some((city) => city.value === cityFromServer)) {
      return country;
    }
  }

  return null;
};
