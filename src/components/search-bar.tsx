import { useDebouncedCallback } from 'use-debounce'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = 'Search...',
    className,
    search,
    setSearch,
    ...props
}) => {
    const debouncedSetSearch = useDebouncedCallback((searchTerm: string) => {
        setSearch(searchTerm)
    }, 300)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSetSearch(e.target.value)
    }

    return (
        <Input
            {...props}
            className={cn(className)}
            defaultValue={search || ''}
            onChange={handleSearch}
            placeholder={placeholder}
        />
    )
}
