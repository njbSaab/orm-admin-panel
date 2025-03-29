import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../../../../services/message.service';
import { ImageValidatorService } from '../../../../services/image-validator.service';
import { NotificationService } from '../../../../services/notification.service';
import { Message, MessageButtonsList } from '../../../../interfaces/message.interface';

@Component({
  selector: 'app-message-edit-tab',
  templateUrl: './message-edit-tab.component.html',
  styleUrls: ['./message-edit-tab.component.scss'],
  
})
export class MessageEditTabComponent implements OnDestroy {
  messages: Message[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  private successSub: Subscription;
  private errorSub: Subscription;

  constructor(
    private messageService: MessageService,
    private imageValidatorService: ImageValidatorService,
    private notificationService: NotificationService
  ) {
    this.successSub = this.notificationService.successMessage$.subscribe(
      (message) => (this.successMessage = message)
    );
    this.errorSub = this.notificationService.errorMessage$.subscribe(
      (message) => (this.errorMessage = message)
    );
    this.loadMessages(); // Загрузка сообщений при инициализации
  }

  ngOnDestroy(): void {
    this.successSub.unsubscribe();
    this.errorSub.unsubscribe();
  }

  loadMessages(): void {
    this.messages = [];
    this.messageService.getAllMessages().subscribe({
      next: (messages) => {
        console.log('Messages loaded:', messages);
        this.messages = messages.map((m) => ({
          ...m,
          isEditing: false,
          buttons: m.buttons
            .sort((a, b) => a.button.order - b.button.order)
            .map((b) => ({ ...b, isEditing: false })),
        }));
      },
      error: (err) => {
        console.error('Error loading messages:', err);
        this.notificationService.showError('Failed to load messages: ' + err.message);
      },
    });
  }

  toggleEdit(message: Message): void {
    message.isEditing = !message.isEditing;
  }

  isValidImageUrl(url: string): boolean {
    return this.imageValidatorService.isValidImageUrl(url);
  }

  refreshImage(message: Message): void {
    if (message.message_image_url && this.isValidImageUrl(message.message_image_url)) {
      message.message_image_url = message.message_image_url;
    }
  }

  saveChanges(message: Message): void {
    if (message.message_image_url && !this.isValidImageUrl(message.message_image_url)) {
      this.notificationService.showError('Invalid image URL');
      return;
    }

    this.messageService.updateMessage(message).subscribe({
      next: () => {
        this.notificationService.showSuccess('Message updated successfully!');
        message.isEditing = false;
        this.loadMessages(); // Перезагрузка списка после успешного сохранения
      },
      error: (err) => {
        console.error('Error updating message:', err);
        this.notificationService.showError('Failed to update message: ' + err.message);
      },
    });
  }

  toggleButtonEdit(buttonWrapper: MessageButtonsList): void {
    buttonWrapper.isEditing = !buttonWrapper.isEditing;
  }

  saveButtonChanges(message: Message, buttonWrapper: MessageButtonsList): void {
    this.messageService.updateButton(message.id, buttonWrapper.button).subscribe({
      next: () => {
        this.notificationService.showSuccess('Button updated successfully!');
        buttonWrapper.isEditing = false;
        this.loadMessages(); // Перезагрузка списка после успешного сохранения
      },
      error: (err) => {
        console.error('Error updating button:', err);
        this.notificationService.showError('Failed to update button: ' + err.message);
      },
    });
  }

  closeSuccessMessage(): void {
    this.notificationService.clearSuccess();
  }

  closeErrorMessage(): void {
    this.notificationService.clearError();
  }
}