import React from "react";
import  Search  from "../icons/Search";
import { Input } from "./Input";
import { Spinner } from "./Spinner";

export interface SearchBarProps
  extends React.ComponentPropsWithoutRef<"input"> {
  inputClassName?: string;
  mobile?: boolean;
  isLoading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  className = "",
  inputClassName = "",
  isLoading = false,
  mobile = false,
  ...props
}) => {
  return (
    <div
      className={`items-center flex pr-2 py-2 w-full bg-white text-[#4f4e4e] transition duration-200 ease-in-out focus-within:text-primary-100 rounded-lg ${className}`}
    >
      <div className="h-full mx-4 flex items-center pointer-events-none">
        <Search />
      </div>
      <Input
        autoFocus
        data-testid="searchbar"
        className={`${inputClassName} pl-0 w-full`}
        {...props}
      />
      {isLoading && (
        <div
          className={`h-full mx-4 flex items-center pointer-events-none`}
        >
          <Spinner />
        </div>
      )}
    </div>
  );
};