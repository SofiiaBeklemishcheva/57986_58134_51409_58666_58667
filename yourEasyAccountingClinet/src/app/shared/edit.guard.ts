import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { InvoicesService } from './invoices.service';

export const editGuard: CanActivateFn = (route, state) => {
  const invSer = inject(InvoicesService);
  console.log(invSer.isBeingEdited);
  if (invSer.isBeingEdited) {
    return true;
  } else {
    return false;
  }
};
