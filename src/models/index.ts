export interface NewCases {
  newInfections: number;
  newDeaths: number;
  newRecovered: number;
  lastUpdated: string;
}

export interface Timeline {
  totalConfirmed: number;
  totalDeaths: number;
  totalRecovered: number;
  lastUpdated: string;
}

export interface Country {
  countryCode: string;
  country: string;
  emoji?: string;
  lat: number;
  lng: number;
  totalConfirmed: number;
  totalRecovered: number;
  totalDeaths: number;
  dailyConfirmed: number;
  dailyDeaths: number;
  activeCases: number;
  totalCritical: number;
  totalConfirmedPerMillionPopulation: number;
  totalDeathsPerMillionPopulation: number;
  FR: string;
  PR: string;
  lastUpdated: string;
  newCases?: NewCases[];
  timeline?: Timeline[];
  slug?: string;
  news?: CountryNews[];
}

export interface GlobalInfo {
  country: string;
  emoji?: string;
  totalConfirmed: number;
  totalDeaths: number;
  totalRecovered: number;
  totalNewCases: number;
  totalNewDeaths: number;
  totalActiveCases: number;
  totalCasesPerMillionPop: number;
  created: string;
  timeline?: Timeline[];
  slug?: string;
}

export interface CountryNews {
  nid: number;
  title: string;
  description: string;
  content: string;
  author: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  addedOn: string;
  siteName: string;
  language: string;
  countryCode: string;
  status: number;
}

export interface Pagination {
  currentPageNumber: number;
  limit: number;
  totalPages: number;
}

export interface PaginationElement {
  name: string | number;
  pageNumber: number;
}
