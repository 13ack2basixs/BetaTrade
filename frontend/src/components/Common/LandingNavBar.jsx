const navItems = [
    { name: 'intro', href: '#intro' },
    { name: 'motivation', href: '#motivation'},
    { name: 'features', href: '#features'},
    { name: 'how-it-works', href: '#how-it-works'},
    { name: 'about', href: '#about'},
]

const LandingNavBar = () => {
    return (
        <nav className='navbar'>
            {navItems.map(item => (
                <a key={item.href} href={item.href}>{item.name}</a>
            ))}
        </nav>
    )
}

export default LandingNavBar;