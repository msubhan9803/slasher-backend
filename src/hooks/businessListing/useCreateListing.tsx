/* eslint-disable max-len */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createListing } from '../../api/businessListings';
import { BusinessListing } from '../../routes/business-listings/type';
import { setListingsFlat } from '../../redux/slices/listingsSlice';
import useMyListings from './useMyListings';

export default function useCreateListing() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string[]>();
  const [success, setSuccess] = useState<boolean>(false);
  const { fetchMyListingApi } = useMyListings();

  const createBusinessListing = async (listing: BusinessListing, handleAfterSuccessfullApi: () => void) => {
    setLoading(true);
    setErrorMessages([]);
    setSuccess(false);

    try {
      await createListing(listing);
      setSuccess(true);
      setLoading(false);
      handleAfterSuccessfullApi();

      const data = await fetchMyListingApi();
      dispatch(setListingsFlat(Object.values(data as object).flat()));
    } catch (err: any) {
      setErrorMessages(err.response.data.message);
      throw Error(err.response.data.message);
    }
  };

  return {
    createBusinessListing,
    loading,
    errorMessages,
    success,
  };
}
