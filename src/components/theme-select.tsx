import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

type Theme = 'light' | 'dark' | 'system'

interface ThemeSelectProps {
    theme: Theme
    onChange: (theme: Theme) => void
}

export const ThemeSelect = ({ theme, onChange }: ThemeSelectProps) => {
    return (
        <Select
            value={theme}
            onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue placeholder='Theme' />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='light'>Light</SelectItem>
                <SelectItem value='dark'>Dark</SelectItem>
                <SelectItem value='system'>System</SelectItem>
            </SelectContent>
        </Select>
    )
}
