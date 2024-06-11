import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dueDateStatus',
  standalone: true,
})
export class DueDatePipe implements PipeTransform {
  transform(value: Date): string {
    const dueDate = new Date(value);
    const currentDate = new Date();
    return dueDate > currentDate ? 'W terminie' : 'Po terminie';
  }
}
