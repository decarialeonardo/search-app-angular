import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemResponse } from '../shared/model/ItemResponse';
@Component({
  selector: 'app-favorite-dialog',
  templateUrl: './favorite-dialog.component.html',
  styleUrls: ['./favorite-dialog.component.scss'],
})
export class FavoriteDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<FavoriteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onAddFavorite(item: ItemResponse) {
    let index = this.data.items.findIndex((i: ItemResponse) => {
      return i.id === item.id;
    });
    if (index !== -1) {
      this.data.items[index].favorite = true;
    } else {
      this.data.items.push({
        title: item.title,
        image: item.image,
        favorite: true,
        id: item.id,
      });
    }
  }

  onRemoveFavorite(item: ItemResponse) {
    const idx = this.data.items.findIndex(
      (i: ItemResponse) => i.id === item.id
    );
    if (idx !== -1) {
      this.data.items.splice(idx, 1);
    }
  }
}
