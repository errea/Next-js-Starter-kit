'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  // Handle search input change
  // This function updates the URL with the search term
  // and navigates to the new URL.
  // It uses the Next.js router to handle navigation.
  // The search term is extracted from the input field.
  // If the search term is empty, it removes the 'query' parameter from the URL.
  // The function creates a new URLSearchParams object
  // based on the current search parameters and updates it with the new term.
  // Finally, it navigates to the new URL with the updated search parameters.
  // This allows the search functionality to work seamlessly
  // with the Next.js routing system, updating the URL without a full page reload.
  // const query = searchParams.get('query') || '';

  const handleSearch = useDebouncedCallback((term) => {
    // console.log(`Searching... $(term)`);
    // Update the search parameters with the new term
    const params = new URLSearchParams(searchParams.toString());
    // Handle search input change
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  // Use useDebouncedCallback to debounce the search input
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
