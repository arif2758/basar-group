import NavbarClient from "./NavbarClient";
import CategoryNav from "./CategoryNav";

export default function Header() {
  return (
    <header className="w-full">
      <NavbarClient />
      <CategoryNav />
    </header>
  );
} 
