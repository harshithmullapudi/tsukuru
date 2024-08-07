export interface Tab {
  group: string;
  pages: string[];
}

export interface TsukuruConfigType {
  name: string;
  description: string;
  navigation: Array<Tab>;
  socials: {
    github?: string;
  };
}
