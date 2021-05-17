import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-favorite-dialog',
  templateUrl: './favorite-dialog.component.html',
  styleUrls: ['./favorite-dialog.component.scss'],
})
export class FavoriteDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<FavoriteDialogComponent>) {}

  ngOnInit(): void {}
}
