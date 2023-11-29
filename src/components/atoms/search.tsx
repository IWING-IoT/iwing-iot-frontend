"use client";
import { SearchInput } from "../ui/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

type SearchProps = {
  className?: string;
  placeholder?: string;
};

export const Search = ({ className, placeholder }: SearchProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (searchQuery: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set("searchQuery", searchQuery);
    } else {
      params.delete("searchQuery");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <SearchInput
      className={className}
      placeholder={placeholder}
      id="search"
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      defaultValue={searchParams.get("searchQuery")?.toString()}
    />
  );
};
