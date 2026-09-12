// src/components/granthagar/layout/GranthagarHeader.tsx
import GranthagarNavbarClient from "./GranthagarNavbarClient";
import BookCategoryNav from "./BookCategoryNav";

export default function GranthagarHeader() {
  return (
    <header className="w-full">
      <GranthagarNavbarClient />
      <BookCategoryNav />
    </header>
  );
}
