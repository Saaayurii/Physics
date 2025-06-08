"use client";

import Link from "next/link";
import { useState, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import Button from "./Button";
import { navigation } from "@/constants";
import { HamburgerMenu } from "./design/Header";
import MenuSvg from "@/public/assets/svg/MenuSvg";

// Типы
interface NavigationItem {
  id: string;
  title: string;
  url: string;
  onlyMobile?: boolean;
}

// Константы
const HEADER_CLASSES = {
  base: "fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm",
  open: "bg-n-8",
  closed: "bg-n-8/90 backdrop-blur-sm",
  container: "flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4",
  logo: "block w-[12rem] xl:mr-8",
  nav: {
    base: "fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent",
    open: "flex",
    closed: "hidden",
  },
  navContent: "relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row",
  link: {
    base: "block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold lg:leading-5 lg:hover:text-n-1 xl:px-12",
    active: "z-2 lg:text-n-1",
    inactive: "lg:text-n-1/50",
    mobileOnly: "lg:hidden",
  },
  button: {
    desktop: "hidden lg:flex",
    mobile: "ml-auto lg:hidden",
  },
} satisfies Record<string, any>;

// Компонент навигационной ссылки
const NavigationLink = ({ 
  item, 
  isActive, 
  onClick 
}: { 
  item: NavigationItem; 
  isActive: boolean; 
  onClick: () => void; 
}) => {
  const linkClassName = useMemo(() => {
    const classes: string[] = [HEADER_CLASSES.link.base];
    
    if (item.onlyMobile) {
      classes.push(HEADER_CLASSES.link.mobileOnly);
    }
    
    classes.push(isActive ? HEADER_CLASSES.link.active : HEADER_CLASSES.link.inactive);
    
    return classes.join(" ");
  }, [item.onlyMobile, isActive]);

  return (
    <Link
      key={item.id}
      href={item.url}
      onClick={onClick}
      className={linkClassName}
    >
      {item.title}
    </Link>
  );
};

// Компонент навигации
const Navigation = ({ 
  isOpen, 
  onLinkClick 
}: { 
  isOpen: boolean; 
  onLinkClick: () => void; 
}) => {
  const pathname = usePathname();
  
  const navClassName = useMemo(() => {
    const visibilityClass = isOpen ? HEADER_CLASSES.nav.open : HEADER_CLASSES.nav.closed;
    return `${visibilityClass} ${HEADER_CLASSES.nav.base}`;
  }, [isOpen]);

  return (
    <nav className={navClassName}>
      <div className={HEADER_CLASSES.navContent}>
        {navigation.map((item) => (
          <NavigationLink
            key={item.id}
            item={item}
            isActive={item.url === pathname}
            onClick={onLinkClick}
          />
        ))}
      </div>
      <HamburgerMenu />
    </nav>
  );
};

// Основной компонент Header
const Header = () => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  // Мемоизированные обработчики
  const toggleNavigation = useCallback(() => {
    setIsNavigationOpen(prev => {
      const newState = !prev;
      
      if (newState) {
        disablePageScroll();
      } else {
        enablePageScroll();
      }
      
      return newState;
    });
  }, []);

  const handleLinkClick = useCallback(() => {
    if (isNavigationOpen) {
      enablePageScroll();
      setIsNavigationOpen(false);
    }
  }, [isNavigationOpen]);

  // Мемоизированные классы
  const headerClassName = useMemo(() => {
    const backgroundClass = isNavigationOpen 
      ? HEADER_CLASSES.open 
      : HEADER_CLASSES.closed;
    
    return `${HEADER_CLASSES.base} ${backgroundClass}`;
  }, [isNavigationOpen]);

  return (
    <div className={headerClassName}>
      <div className={HEADER_CLASSES.container}>
        {/* Логотип */}
        <Link 
          className={HEADER_CLASSES.logo} 
          href="/"
          onClick={handleLinkClick}
        />

        {/* Навигация */}
        <Navigation 
          isOpen={isNavigationOpen} 
          onLinkClick={handleLinkClick} 
        />

        {/* Кнопка для десктопа */}
        <Link href="/">
          <Button className={HEADER_CLASSES.button.desktop}>
            Формировать
          </Button>
        </Link>

        {/* Кнопка мобильного меню */}
        <Button
          className={HEADER_CLASSES.button.mobile}
          px="px-3"
          onClick={toggleNavigation}
          aria-label={isNavigationOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={isNavigationOpen}
        >
          <MenuSvg openNavigation={isNavigationOpen} />
        </Button>
      </div>
    </div>
  );
};

export default Header;