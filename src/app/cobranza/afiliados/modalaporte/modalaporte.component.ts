import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modalaporte',
  templateUrl: './modalaporte.component.html',
  styleUrls: ['./modalaporte.component.css']
})
export class ModalaporteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}
}
