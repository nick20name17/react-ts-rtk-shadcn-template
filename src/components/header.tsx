import { ModeToggle } from './mode-toggle'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { routes } from '@/config/routes'
import { useAppSelector } from '@/store/hooks'

export const Header = () => {
    const count = useAppSelector((state) => state.counter.value)

    const links = [
        {
            name: 'Form',
            href: routes.main
        },
        {
            name: 'Table',
            href: routes.table
        },
        {
            name: `Counter ${count}`,
            href: routes.counter
        }
    ]

    return (
        <header className='flex items-center justify-between gap-x-20 border-b px-10 py-6'>
            <ModeToggle />
            <NavigationMenu>
                <NavigationMenuList>
                    {links.map((link) => (
                        <NavigationMenuItem key={link.name}>
                            <a href={link.href}>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}>
                                    {link.name}
                                </NavigationMenuLink>
                            </a>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    )
}
