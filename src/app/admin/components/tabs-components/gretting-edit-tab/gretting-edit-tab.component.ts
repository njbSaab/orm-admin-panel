import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GreetingService } from '../../../../services/greeting.service';
import { ImageValidatorService } from '../../../../services/image-validator.service';
import { NotificationService } from '../../../../services/notification.service';
import { GreetingBot } from '../../../../interfaces/greeting.interface';

@Component({
  selector: 'app-gretting-edit-tab',
  templateUrl: './gretting-edit-tab.component.html',
  styleUrls: ['./gretting-edit-tab.component.scss'],
  
})
export class GrettingEditTabComponent implements OnDestroy {
  greetings: GreetingBot[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  private successSub: Subscription;
  private errorSub: Subscription;

  constructor(
    private greetingService: GreetingService,
    private imageValidatorService: ImageValidatorService,
    private notificationService: NotificationService
  ) {
    this.successSub = this.notificationService.successMessage$.subscribe(
      (message) => (this.successMessage = message)
    );
    this.errorSub = this.notificationService.errorMessage$.subscribe(
      (message) => (this.errorMessage = message)
    );
  }

  ngOnDestroy(): void {
    this.successSub.unsubscribe();
    this.errorSub.unsubscribe();
  }

  // Загрузить все приветствия
  loadGreetings(): void {
    this.greetings = [];
    this.greetingService.getAllGreetings().subscribe({
      next: (greetings) => {
        this.greetings = greetings.map((g) => ({ ...g, isEditing: false }));
      },
      error: (err) => {
        this.notificationService.showError('Failed to load greetings: ' + err.message);
      },
    });
  }

  // Переключение режима редактирования
  toggleEdit(greeting: GreetingBot): void {
    greeting.isEditing = !greeting.isEditing;
  }

  // Проверка валидности URL через сервис
  isValidImageUrl(url: string): boolean {
    return this.imageValidatorService.isValidImageUrl(url);
  }

  // Обновление изображения после изменения URL
  refreshImage(greeting: GreetingBot): void {
    if (greeting.image_url && this.isValidImageUrl(greeting.image_url)) {
      greeting.image_url = greeting.image_url; // Триггерим обновление
    }
  }

  // Сохранение изменений
  saveChanges(greeting: GreetingBot): void {
    if (!this.isValidImageUrl(greeting.image_url || '')) {
      this.notificationService.showError('Invalid image URL');
      return;
    }

    this.greetingService.updateGreeting(greeting.id, greeting).subscribe({
      next: (updatedGreeting) => {
        Object.assign(greeting, updatedGreeting);
        greeting.isEditing = false;
        this.notificationService.showSuccess('Greeting updated successfully!');
        this.loadGreetings();
      },
      error: (err) => {
        this.notificationService.showError('Failed to update greeting: ' + err.message);
      },
    });
  }

  // Закрытие сообщения об успехе
  closeSuccessMessage(): void {
    this.notificationService.clearSuccess();
  }

  // Закрытие сообщения об ошибке
  closeErrorMessage(): void {
    this.notificationService.clearError();
  }
}