export interface Tab {
  name: string;
  content: string;
  path: string;
}

export interface TsukuruConfigType {
  name: string;
  description: string;
  tabs: Array<Tab>;
  socials: {
    github?: string;
  };
}
