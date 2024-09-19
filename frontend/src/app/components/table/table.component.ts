import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../shared/backend.service';
import { FridgeItem } from '../../shared/fridge-item';
import { DialogService } from '../../shared/dialog.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  fridgeItems!: FridgeItem[];
  deleted = false;

  constructor(
    private bs: BackendService, 
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.readAll();
  }

  readAll(): void {
    this.bs.getAll().subscribe(
      (response: FridgeItem[]) => {
        this.fridgeItems = response;
        console.log(this.fridgeItems);
      },
      error => console.log(error)
    );
  }

  delete(id: string): void {
    this.dialogService.openConfirmDialog('Confirm Deletion', 'Are you sure you want to delete this entry?')
      .subscribe(result => {
        if (result) {
          this.bs.deleteOne(id).subscribe(
            response => {
              console.log('response : ', response);
              if (response.status === 204) {
                this.dialogService.openInfoDialog('The entry was successfully deleted');
                this.readAll();
              } else {
                console.log(response.status);
                console.log(response.error);
              }
            },
            error => console.log(error)
          );
        }
      });
  }
}
