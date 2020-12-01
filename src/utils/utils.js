export const formatProvinces = (provinces) =>
  provinces.map(province => ({
    key: province.id,
    text: province.name,
    value: province.name
  }))

export const formatDistricts = (districts) =>
  districts
    .sort((a, b) => new Intl.Collator("tr").compare(a.name, b.name))
    .map((district, index) => ({
      key: index,
      text: district.name,
      value: district.name
    }));

export const formatLocalities = (localities) =>
  localities
    .sort((a, b) => new Intl.Collator("tr").compare(a.name, b.name))
    .map((locality, index) => ({
      key: index,
      text: locality.name.split(',',1)[0],
      value: locality.name
    }));

