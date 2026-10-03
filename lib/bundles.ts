export type BundleOffer = {
  name: string;
  price: number;
  was: number;
  pieces: number;
  contents: string;
  totalCapacity?: string;
  description: string;
  badge?: string;
};

export const bundleOffers: BundleOffer[] = [
  {
    name: 'The Original 12-Piece Set',
    price: 135000,
    was: 180000,
    pieces: 12,
    contents: 'Four square, four round, and four rectangular containers',
    description: 'Our complete classic set, with a versatile mix of sizes for snacks, lunches, leftovers, meal prep, and family meals.',
    badge: 'Classic complete set',
  },
  {
    name: 'The Essentials Trio',
    price: 85000,
    was: 115000,
    pieces: 3,
    contents: 'One 1L, one 2L, and one 2.5L',
    totalCapacity: '5.5L total storage',
    description: 'A great mix for trying the bigger sizes alongside a 1L container for everyday use.',
    badge: 'A balanced first set',
  },
  {
    name: 'The Jumbo 4-Piece',
    price: 135000,
    was: 185000,
    pieces: 4,
    contents: 'Four 2.5L containers',
    totalCapacity: '10L total storage',
    description: 'Maximum capacity for generous family meals, large leftovers, and batch cooking.',
  },
  {
    name: 'The Deep Storage 5-Piece',
    price: 165000,
    was: 215000,
    pieces: 5,
    contents: 'Two 2L and three 2.5L containers',
    totalCapacity: '11.5L total storage',
    description: 'The heavy-duty option: only large and extra-large containers, with no small sizes.',
  },
  {
    name: 'The Family 6-Piece',
    price: 175000,
    was: 225000,
    pieces: 6,
    contents: 'Two 1L, two 2L, and two 2.5L containers',
    totalCapacity: '11L total storage',
    description: 'Matching pairs of every size for a complete, beautifully organized kitchen.',
    badge: 'Complete kitchen upgrade',
  },
  {
    name: 'The Ultimate Bulk Set',
    price: 198000,
    was: 235000,
    pieces: 8,
    contents: 'Four 2L and four 2.5L containers',
    totalCapacity: '18L total storage',
    description: 'Eight of the largest capacities for serious bulk storage at the best bulk discount.',
    badge: 'Best bulk value',
  },
];

export const formatNaira = (amount: number) => `₦${amount.toLocaleString('en-NG')}`;
