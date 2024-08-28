import { useState } from 'react';
import { BusinessListingType, ListingName } from '../../routes/business-listings/type';

export default function useListingTypes() {
  const [listingTypes] = useState<BusinessListingType[]>([
    {
      name: ListingName.LISTING1,
      label: 'Pro',
      features: [
        'Listing in our movies database',
        'Appear in Suggested section',
        'Appear in our newsletter',
      ],
      price: 30,
    },
  ]);

  return {
    listingTypes,
  };
}
