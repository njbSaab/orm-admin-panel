import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KeysMenuService } from '../../../../services/keys-menu.service';
import { KeysMenu } from '../../../../interfaces/keys-menu.interface';

@Component({
  selector: 'app-keys-menu-tab',
  templateUrl: './keys-menu-tab.component.html',
  styleUrls: ['./keys-menu-tab.component.scss'],
  
})
export class KeysMenuTabComponent {
  keysMenus: KeysMenu[] = [];
  activeIndexes: Set<number> = new Set();    // Для управления collapse
  expandedMenus: Set<number> = new Set();      // Для отслеживания раскрытых меню

  constructor(private keysMenuService: KeysMenuService) {
    this.loadKeysMenus();
  }

  // Загрузка меню из сервиса
  loadKeysMenus(): void {
    this.keysMenuService.getAllKeysMenus().subscribe({
      next: (menus) => {
        // Добавляем флаг редактирования к каждому пункту
        this.keysMenus = menus.map((m) => ({ ...m, isEditing: false }));
      },
      error: (err) => console.error('Error loading keys menus:', err),
    });
  }

  // Возвращает меню с заданным parentId, отсортированные по order
  getMenusByParentId(parentId: number | null): KeysMenu[] {
    return this.keysMenus
      .filter((menu) => menu.parentId === parentId)
      .sort((a, b) => a.order - b.order);
  }

  // Проверка наличия дочерних пунктов для данного menuId
  hasChildren(menuId: number): boolean {
    return this.keysMenus.some((m) => m.parentId === menuId);
  }

  // Переключение раскрытия меню
  toggleExpand(menuId: number, event: Event): void {
    event.stopPropagation();
    if (this.expandedMenus.has(menuId)) {
      this.expandedMenus.delete(menuId);
    } else {
      this.expandedMenus.add(menuId);
    }
  }

  // Переключение режима редактирования для пункта меню
  toggleEdit(menu: KeysMenu, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    menu.isEditing = !menu.isEditing;
  }

  // Сохранение изменений пункта меню
  saveChanges(menu: KeysMenu): void {
    this.keysMenuService.updateKeysMenu(menu).subscribe({
      next: () => {
        menu.isEditing = false;
        this.loadKeysMenus();
      },
      error: (err) => console.error('Error updating menu:', err),
    });
  }

  // Переключение состояния collapse (если требуется для дополнительных эффектов)
  toggleClick(index: number): void {
    if (this.activeIndexes.has(index)) {
      this.activeIndexes.delete(index);
    } else {
      this.activeIndexes.add(index);
    }
  }

  // Вычисление уровня меню по цепочке parentId
  getMenuLevel(menu: KeysMenu): number {
    let level = 0;
    let currentMenu = menu;
    while (currentMenu.parentId !== null) {
      level++;
      const parent = this.keysMenus.find((m) => m.id === currentMenu.parentId);
      if (!parent) {
        break;
      }
      currentMenu = parent;
    }
    return level;
  }
}