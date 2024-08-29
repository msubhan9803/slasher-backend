import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMyListings } from '../../api/businessListings';
import { BusinessListing } from '../../routes/business-listings/type';
import { useAppSelector } from '../../redux/hooks';
import { setListingsFlat } from '../../redux/slices/listingsSlice';

type MyListingResponse = {
  books?: BusinessListing[] | null | undefined;
  movies?: BusinessListing[] | null | undefined;
  podcaster?: BusinessListing[] | null | undefined;
  artist?: BusinessListing[] | null | undefined;
  musician?: BusinessListing[] | null | undefined;
  vendor?: BusinessListing[] | null | undefined;
  video_creator?: BusinessListing[] | null | undefined;
};

export default function useMyListings() {
  const dispatch = useDispatch();
  const userRef = useAppSelector((state) => state.user.user.id);
  const [listings, setListings] = useState<MyListingResponse>();
  const [loadingListings, setLoadingListings] = useState<boolean>(true);
  const [listingError, setListingError] = useState<string | null>(null);

  const fetchMyListingApi = async () => {
    const { data } = await fetchMyListings({ userRef: userRef as string });
    return data as MyListingResponse;
  };

  const fetchBusinessListings = async () => {
    setLoadingListings(true);
    setListingError(null);

    try {
      const data = await fetchMyListingApi();
      setListings(data);
      dispatch(setListingsFlat(Object.values(data as object).flat()));
    } catch (err: any) {
      setListingError('Failed to fetch listings');
    } finally {
      setLoadingListings(false);
    }
  };

  useEffect(() => {
    fetchBusinessListings();
  }, []);

  return {
    listings,
    listingsFlat: listings ? Object.values(listings as object).flat() as BusinessListing[] : [],
    loadingListings,
    listingError,
    fetchMyListingApi,
  };
}
