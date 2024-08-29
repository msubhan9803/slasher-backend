import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CreatePostInput from '../../../components/ui/post/CreatePostInput';
import ReportModal from '../../../components/ui/ReportModal';
import BusinessListingPosts from '../../../components/ui/BusinessListing/BusinessListingPosts';
import { MovieData, MovieType } from '../../../types';

type Props = {
  movieData: MovieData
};

function MoviePosts({ movieData }: Props) {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('view');
  const [show, setShow] = useState(false);
  const [dropDownValue] = useState('');

  return (
    <>
      {queryParam === 'self' && <CreatePostInput />}

      {movieData.type === MovieType.UserDefined
        && movieData.businessListingRef && (
          <BusinessListingPosts
            businessListingRef={movieData.businessListingRef as string}
          />
      )}

      <ReportModal
        show={show}
        setShow={setShow}
        slectedDropdownValue={dropDownValue}
      />
    </>
  );
}

export default MoviePosts;
