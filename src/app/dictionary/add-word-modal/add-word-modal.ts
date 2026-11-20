import { Component, inject } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  imports: [],
  selector: 'app-add-word-modal',
  styleUrl: './add-word-modal.scss',
  templateUrl: './add-word-modal.html',
})
export class AddWordModal {
  dialogRef = inject<DialogRef>(DialogRef);

  closeModal() {
    this.dialogRef.close();
  }
}
