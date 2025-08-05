// app/data/dummyVariants.ts
import { VariantGroup } from './types';

export const DUMMY_VARIANT_GROUPS: VariantGroup[] = [
  {
    id: '1',
    name: 'Size',
    isEnabled: true,
    isRequired: true,
    description: 'Choose your preferred size',
    itemId: 'espresso',
    subVariants: [
      { id: '1a', name: 'Small', description: '8oz', stock: 100, extraCharge: 0 },
      { id: '1b', name: 'Medium', description: '12oz', stock: 80, extraCharge: 5000 },
      { id: '1c', name: 'Large', description: '16oz', stock: 50, extraCharge: 10000 },
    ]
  },
  {
    id: '2',
    name: 'Milk Type',
    isEnabled: false,
    isRequired: false,
    description: 'Choose your milk preference',
    itemId: 'espresso',
    subVariants: [
      { id: '2a', name: 'Regular Milk', description: 'Fresh cow milk', stock: 100, extraCharge: 0 },
      { id: '2b', name: 'Almond Milk', description: 'Plant-based alternative', stock: 50, extraCharge: 8000 },
      { id: '2c', name: 'Oat Milk', description: 'Creamy oat-based milk', stock: 30, extraCharge: 10000 },
    ]
  },
  {
    id: '3',
    name: 'Sugar Level',
    isEnabled: true,
    isRequired: false,
    description: 'Customize your sweetness',
    itemId: 'espresso',
    subVariants: [
      { id: '3a', name: 'No Sugar', description: 'Sugar-free', stock: 999, extraCharge: 0 },
      { id: '3b', name: 'Less Sugar', description: '25% sugar', stock: 999, extraCharge: 0 },
      { id: '3c', name: 'Normal Sugar', description: '100% sugar', stock: 999, extraCharge: 0 },
      { id: '3d', name: 'Extra Sugar', description: '150% sugar', stock: 999, extraCharge: 2000 },
    ]
  },
  // Cappuccino variants
  {
    id: '4',
    name: 'Size',
    isEnabled: true,
    isRequired: true,
    description: 'Choose your preferred size',
    itemId: 'cappuccino',
    subVariants: [
      { id: '4a', name: 'Regular', description: '8oz', stock: 100, extraCharge: 0 },
      { id: '4b', name: 'Large', description: '12oz', stock: 80, extraCharge: 5000 },
    ]
  },
  {
    id: '5',
    name: 'Foam Level',
    isEnabled: true,
    isRequired: false,
    description: 'Choose foam intensity',
    itemId: 'cappuccino',
    subVariants: [
      { id: '5a', name: 'Light Foam', description: 'Minimal foam', stock: 999, extraCharge: 0 },
      { id: '5b', name: 'Regular Foam', description: 'Standard foam', stock: 999, extraCharge: 0 },
      { id: '5c', name: 'Extra Foam', description: 'Maximum foam', stock: 999, extraCharge: 2000 },
    ]
  },
  // Latte variants
  {
    id: '6',
    name: 'Size',
    isEnabled: true,
    isRequired: true,
    description: 'Choose your preferred size',
    itemId: 'latte',
    subVariants: [
      { id: '6a', name: 'Small', description: '8oz', stock: 100, extraCharge: 0 },
      { id: '6b', name: 'Medium', description: '12oz', stock: 80, extraCharge: 5000 },
      { id: '6c', name: 'Large', description: '16oz', stock: 50, extraCharge: 10000 },
    ]
  },
  {
    id: '7',
    name: 'Syrup',
    isEnabled: true,
    isRequired: false,
    description: 'Add flavor syrup',
    itemId: 'latte',
    subVariants: [
      { id: '7a', name: 'Vanilla', description: 'Sweet vanilla flavor', stock: 50, extraCharge: 5000 },
      { id: '7b', name: 'Caramel', description: 'Rich caramel flavor', stock: 40, extraCharge: 5000 },
      { id: '7c', name: 'Hazelnut', description: 'Nutty hazelnut flavor', stock: 35, extraCharge: 6000 },
    ]
  },
];
