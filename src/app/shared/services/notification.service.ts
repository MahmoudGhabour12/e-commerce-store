import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationsDto } from 'shared/models/notification.model';

let CREATED = false;

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private messageService: MessageService) {
    if (CREATED) {
      alert('Two instances of the same NotificationService');
      return;
    }
    CREATED = true;
    this.messages = new BehaviorSubject(null);
  }

  private messages: BehaviorSubject<NotificationsDto>;

  getNotifications(): Observable<NotificationsDto> {
    return this.messages.asObservable();
  }

  dispatchSuccessMessage(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  dispatchErrorMessage(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
