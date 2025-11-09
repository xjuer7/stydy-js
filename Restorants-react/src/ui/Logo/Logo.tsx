import LogoIcon from '../../assets/stair.svg?react'

export const Logo = () => {
    const handleClick = () => {
        console.log('Переход по ссылке');
    }

    return (
        <a className="logo" href='#' onClick={handleClick}>
            <LogoIcon width={16} height={16} className="logo__icon" /> Eats
        </a>
    )
}