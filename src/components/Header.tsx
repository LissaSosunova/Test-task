import { useState, useRef, useEffect } from 'react'
import UserInfo from './UserInfo'
import { useNavigate } from 'react-router-dom'
import LoginModal from './LoginModal'
import { useAuth } from '../shared/AuthContext/useAuth'

function useMediaQuery(query: string) {
    return window.matchMedia(query).matches;
}

function Header() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const { user, loading } = useAuth();
    const [desktopOpen, setDesktopOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const toggle = () => {
        isMobile
            ? setMobileOpen(p => !p)
            : setDesktopOpen(p => !p);
    };

    const close = () => {
        isMobile
            ? setMobileOpen(false)
            : setDesktopOpen(false);
    };

    const [isOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const toggleDropdownMenu = () => {
        setMenuOpen(!isOpen)
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current?.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const [showLogin, setShowLogin] = useState(false)
    const navigate = useNavigate()

    const isuser = !!localStorage.getItem('user');

    const handleAdminClick = () => {
        const user = localStorage.getItem('user')
        if (!!user) {
            navigate('/admin-pannel')
        } else {
            setShowLogin(true)
        }
    }

    const handleLoginSuccess = () => {
        setShowLogin(false)
    }

    if (loading) return null;

    return (
        <>
            <header className="header flex align-items-center justify-content-center">
                <section className="lg:col-8 md:col-10 col-12 flex align-items-center justify-content-between">
                    <a href="/">
                        <div className="logo-top"></div>
                    </a>
                    <div className="menu-wrapper flex justify-content-end">
                        <div className="burger"
                            onClick={toggleDropdownMenu}>
                            <div></div>
                            <div></div>
                        </div>
                        {/* Mobile */}
                        <div className={`menu mobile-lang ${isOpen ? 'open' : ''}`}
                            ref={dropdownRef}>
                            <div className="close-btn"
                                id="closeBtn" onClick={toggleDropdownMenu}>&times;</div>
                            <a href="/">Home</a>
                            <a href="/admin-pannel">
                            {!user ? '' : 'Applications'}
                            </a>
                            {(isMobile && isuser) && (
                                <UserInfo
                                    isOpened={mobileOpen}
                                    isMobile={true}
                                    onToggle={toggle}
                                    onClose={close}
                                />
                            )}
                            <a
                                href="#"
                                onClick={e => {
                                    e.preventDefault()
                                    handleAdminClick()
                                }}
                            >
                                {!user ? 'Registration' : ''}
                            </a>

                            {showLogin && (
                                <LoginModal
                                    onClose={() => setShowLogin(false)}
                                    onSuccess={handleLoginSuccess}
                                />
                            )}
                        </div>

                        {/* Desktop */}
                        <div className="menu-opened desktop-lang">
                            <a href="/">Home</a>
                            <a href="/admin-pannel">{!user ? '' : 'Applications'}</a>
                            {/* Desktop */}
                            {(!isMobile && isuser) && (
                                <UserInfo
                                    isOpened={desktopOpen}
                                    isMobile={false}
                                    onToggle={toggle}
                                    onClose={close}
                                />
                            )}
                            <a
                                href="#"
                                onClick={e => {
                                    e.preventDefault()
                                    handleAdminClick()
                                }}
                            >
                                {!user ? 'Login' : ''}
                            </a>

                            {showLogin && (
                                <LoginModal
                                    onClose={() => setShowLogin(false)}
                                    onSuccess={handleLoginSuccess}
                                />
                            )}
                        </div>
                    </div>
                </section>
            </header>
        </>
    )
}

export default Header