import { useCallback, useEffect, useState } from 'react';
import { ContentSidbarWrapper, ContentPageWrapper } from '../../components/layout/main-site-wrapper/authenticated/ContentWrapper';
import RightSidebarWrapper from '../../components/layout/main-site-wrapper/authenticated/RightSidebarWrapper';
import MainListingWrapper from '../../components/ui/MyListings/MainListingWrapper';
import { Book } from '../books/components/BookProps';
import { myBooks } from '../books/components/booksList';
import RightSidebarSelf from '../../components/layout/right-sidebar-wrapper/right-sidebar-nav/RightSidebarSelf';
import ScrollToTop from '../../components/ScrollToTop';

function MyListings() {
  const [search] = useState<string>('');
  const [, setFilteredBooks] = useState<Book[] | any>(myBooks);

  const searchData = useCallback(() => {
    let searchResult;
    const newFilter = myBooks;
    if (search) {
      searchResult = newFilter && newFilter.length > 0
        ? newFilter.filter((src: any) => src.name.toLowerCase().startsWith(search))
        : [];
      setFilteredBooks(searchResult);
    } else {
      setFilteredBooks(myBooks);
    }
  }, [search]);

  useEffect(() => {
    searchData();
  }, [search, searchData]);

  return (
    <ContentSidbarWrapper>
      <ScrollToTop />

      <ContentPageWrapper>
        <MainListingWrapper />
      </ContentPageWrapper>

      <RightSidebarWrapper>
        <RightSidebarSelf />
      </RightSidebarWrapper>
    </ContentSidbarWrapper>
  );
}

export default MyListings;
