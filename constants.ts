// constants.ts
import { MarketingMedium, MediumOption } from './types';

export const MARKETING_MEDIUMS: MediumOption[] = [
  {
    id: MarketingMedium.COFFEE_MUG,
    name: 'Coffee Mug',
    description: 'Visualize your product on a custom coffee mug.',
    icon: 'https://picsum.photos/40/40?random=mug',
    prompt: 'Place the product from the uploaded image onto a coffee mug, ensuring the product looks consistent and naturally integrated.',
  },
  {
    id: MarketingMedium.BILLBOARD,
    name: 'Billboard',
    description: 'See your product advertised on a large city billboard.',
    icon: 'https://picsum.photos/40/40?random=billboard',
    prompt: 'Place the product from the uploaded image on a large billboard in a vibrant city environment, ensuring the product looks consistent and naturally integrated.',
  },
  {
    id: MarketingMedium.T_SHIRT,
    name: 'T-Shirt',
    description: 'Design a t-shirt featuring your product.',
    icon: 'https://picsum.photos/40/40?random=tshirt',
    prompt: 'Place the product from the uploaded image onto the front of a white t-shirt, ensuring the product looks consistent and naturally integrated.',
  },
];

export const GENERAL_EDIT_PROMPT = 'Edit the uploaded image based on the following instruction, maintaining product consistency: ';
export const INITIAL_APP_STATE_MESSAGE = 'Upload a product image to get started!';
export const SELECT_MEDIUM_MESSAGE = 'Now, select a marketing medium or enter a custom prompt.';
export const GENERATING_IMAGE_MESSAGE = 'Generating your image... This may take a moment.';
export const ERROR_MESSAGE_PREFIX = 'Error: ';
export const API_KEY_ERROR_MESSAGE = 'API key is not configured. Please ensure process.env.API_KEY is set.';
