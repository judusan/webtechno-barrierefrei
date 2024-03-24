
import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../shared/backend.service';
import { FridgeItem } from '../../shared/fridge-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  fridgeItems!: FridgeItem[];
  deleted = false;

  constructor(private bs: BackendService, private router: Router) { }

  ngOnInit(): void {
    this.readAll();
  }

  readAll(): void {
      this.bs.getAll().subscribe(
      (
        response: FridgeItem[]) => {
                this.fridgeItems = response;
                console.log(this.fridgeItems);
                return this.fridgeItems;
        },
        error => console.log(error)
      );
    }

    delete(id: string): void {
      this.bs.deleteOne(id).subscribe(
        (
          response: any) => {
            console.log('response : ', response);
            if(response.status == 204){
                    console.log(response.status);
                    this.reload(true);
                  } else {
                    console.log(response.status);
                    console.log(response.error);
                    this.reload(false);
                  }
          },
          error => console.log(error)
        );
    }
  
    reload(deleted: boolean)
    {
      this.deleted = deleted;
      this.readAll();
      this.router.navigateByUrl('/table');
    }
}