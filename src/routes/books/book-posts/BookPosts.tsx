import { useState } from 'react';
import ReportModal from '../../../components/ui/ReportModal';
import { BookData, BookType } from '../../../types';
import BusinessListingPosts from '../../../components/ui/BusinessListing/BusinessListingPosts';

type Props = {
  bookData: BookData;
};

function BookPosts({ bookData }: Props) {
  const [show, setShow] = useState(false);
  const [dropDownValue] = useState('');

  return (
    <>
      {/* {queryParam === 'self' &&  */}
      {/* <CustomCreatePost className="mt-3 mt-lg-0" /> */}
      {/* } */}
      <div className="mt-3">
        {/* <PostFeed
          postFeedData={postData}
          popoverOptions={popoverOptions}
          isCommentSection={false}
          onPopoverClick={handlePopoverOption}
        /> */}

        {bookData.type === BookType.UserDefined
        && bookData.businessListingRef && (
          <BusinessListingPosts
            businessListingRef={bookData.businessListingRef as string}
          />
        )}
      </div>
      <ReportModal show={show} setShow={setShow} slectedDropdownValue={dropDownValue} />
    </>
  );
}

export default BookPosts;
