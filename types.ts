// types.ts

export enum MarketingMedium {
  COFFEE_MUG = 'coffee_mug',
  BILLBOARD = 'billboard',
  T_SHIRT = 't_shirt',
  NONE = 'none',
}

export interface MediumOption {
  id: MarketingMedium;
  name: string;
  description: string;
  icon: string; // Tailwind icon class or image URL
  prompt: string;
}
