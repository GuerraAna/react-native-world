import type {ReactNode} from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import {
  useNavbarMobileSidebar,
  useNavbarSecondaryMenu,
} from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';

// Painel secundário do drawer: itens da navbar no topo + divider +
// conteúdo contextual (sidebar da doc). Assim, links como GitHub e o
// seletor de tema continuam acessíveis quando saem da topbar.
export default function NavbarMobileSidebarSecondaryMenu(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();
  const secondaryMenu = useNavbarSecondaryMenu();
  const items = useThemeConfig().navbar.items;

  return (
    <>
      <ul className="menu__list">
        {items.map((item, i) => (
          <NavbarItem
            mobile
            {...item}
            onClick={() => mobileSidebar.toggle()}
            key={i}
          />
        ))}
      </ul>
      <div className="navbar-sidebar__divider" aria-hidden="true" />
      {secondaryMenu.content}
    </>
  );
}
