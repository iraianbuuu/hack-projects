import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useResolvedThemeSafe  } from '@/hooks/useResolvedTheme';

export const Logo = ({ className }: { className?: string;}) => {
    const currentTheme = useResolvedThemeSafe(); 
    return (
        <Image
            src={currentTheme === 'dark' ? "/logo-dark.png" : "/logo.png"}
            alt="Logo"
            className={cn('text-foreground w-auto', className)}
            height={128}
            width={256}
        />
    )
}

export const HacktoberFestLogo = ({ className }: { className?: string }) => {
    return (
        <Image
            src="/hacktoberfest-logo.svg"
            alt="HacktoberFest Logo"
            className={cn('text-foreground h-5 w-auto', className)}
            height={24}
            width={24}
        />
    )
}