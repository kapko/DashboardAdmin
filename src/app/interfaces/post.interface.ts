export interface Post {
  $key?:string;
  description: string;
  accountType: 'owner' | 'agent';
  sellingType: 'rent' | 'sell' | 'buy';
  forSell?: 'room' | 'area' | 'house' | 'camp' | 'office' | 'business' | 'other' | 'forShortTime';
  typeOfRoom?: 'elite' | '105' | '104' | '106' | 'old' | 'pso';
  address: string;
  flatCount: number;
  area: string;
  areaOfHouse: string;
  typeOfPlan: string;
  floor: number;
  floorOf: number;
  price: number;
  fixes?: 'euro' | 'design' | 'none' | 'simple';
  currency: 'dollar' | 'euro' | 'som';
  phone: number;
  whatsapp: number;
  extraPhone: number;
  images: any;
  tumbnails: any;
  lat: number;
  lng: number;
  created: number;
  plan: 'ipoteka' | 'rassrochka' | 'slowly' | 'torg';
}
