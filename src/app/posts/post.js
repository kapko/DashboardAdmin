const forSell = [
  { value: "room", name: "Квартира"}, 
  { value: "forShortTime", name: "Жилье на сутки, ночь, час"}, 
  { value: "house", name: "Дом"}, 
  { value: "area", name: "Участок"}, 
  { value: "office", name: "Офис"}, 
  { value: "business", name: "Под бизнес"}, 
  { value: "other", name: "Не жилое"}
];

const typeOfRooms = [
  { value: "elite", name: "Элитка"}, 
  { value: "105", name: "105"}, 
  { value: "106", name: "106"}, 
  { value: "104", name: "104"}, 
  { value: "old", name: "Хрущевка"}, 
  { value: "pso", name: "ПСО(под сам. отделку)"}
];

const typeOfFixes = [
  { value: "simple", name: "Косметический"},
  { value: "euRo", name: "Евро"},
  { value: "design", name: "Дизайнерский"},
  { value: "none", name: "Без ремонта"},
];

const typeOfPlan = [
  { value: "ipoteka", name: "Ипотека"},
  { value: "rassrochka", name: "Рассрочка"},
  { value: "slowly", name: "Продаю не спеша"},
  { value: "torg", name: "Возможен торг"},
];

const typeOfCurrency = [
  { value: "dollar", name: "$(USA)"},
  { value: "som", name: "Сом"},
  { value: "euro", name: "Евро"},
];

export { forSell, typeOfRooms, typeOfCurrency, typeOfFixes, typeOfPlan};
