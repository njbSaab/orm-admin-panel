import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { GrettingEditTabComponent } from '../../../components/tabs-components/gretting-edit-tab/gretting-edit-tab.component';
import { MessageEditTabComponent } from '../../../components/tabs-components/message-edit-tab/message-edit-tab.component';
import { KeysMenuTabComponent } from '../../../components/tabs-components/keys-menu-tab/keys-menu-tab.component';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements AfterViewInit {
  activeTab: string = 'Message'; // По умолчанию активна вкладка "Message"

  @ViewChild(GrettingEditTabComponent) greetingTab!: GrettingEditTabComponent;
  @ViewChild(MessageEditTabComponent) messageTab!: MessageEditTabComponent;
  @ViewChild(KeysMenuTabComponent) keysMenuTab!: KeysMenuTabComponent;

  ngAfterViewInit(): void {
    this.updateActiveTab();
  }

  onTabChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.activeTab = target.getAttribute('aria-label') || 'Message';
      this.loadTabData();
    }
  }

  private updateActiveTab(): void {
    const checkedTab = document.querySelector('input.tab:checked') as HTMLInputElement;
    if (checkedTab) {
      this.activeTab = checkedTab.getAttribute('aria-label') || 'Message';
      this.loadTabData();
    }
  }

  private loadTabData(): void {
    if (this.activeTab === 'Greetings' && this.greetingTab) {
      this.greetingTab.loadGreetings();
    } else if (this.activeTab === 'Message' && this.messageTab) {
      this.messageTab.loadMessages();
    } else if (this.activeTab === 'KeysMenu' && this.keysMenuTab) {
      this.keysMenuTab.loadKeysMenus();
    }
  }
}