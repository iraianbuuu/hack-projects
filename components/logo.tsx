import Image from 'next/image'
import { cn } from '@/lib/utils'

export const Logo = ({ className, theme }: { className?: string; theme: string }) => {
    return (
        <Image
            src={theme === 'dark' ? "/logo-dark.png" : "/logo.png"}
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