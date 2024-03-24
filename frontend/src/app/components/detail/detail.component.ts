import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../shared/backend.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FridgeItem } from '../../shared/fridge-item';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  id: string = '';
  fridgeItem!: FridgeItem;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private bs: BackendService,
    private fb: FormBuilder,
    private location: Location,
    private router: Router
  )
  {
    this.form = this.fb.group(
      {
        nameControl: ['', Validators.required],
        quantityControl: ['', Validators.required],
        dateControl: ['', Validators.required],
      }
    );
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.readOne(this.id);
  }

  readOne(id: string): void {
      this.bs.getOne(id).subscribe(
      (
        response: FridgeItem) => {
                this.fridgeItem = response;
                console.log(this.fridgeItem);

                this.form.patchValue({
                  nameControl: this.fridgeItem?.name,
                  quantityControl: this.fridgeItem?.quantity,
                  dateControl: new Date(this.fridgeItem?.date).toISOString().substr(0, 10)
                });

                return this.fridgeItem;
        },
        error => console.log(error)
      );
  }

  update(): void {
    const values = this.form.value;
    this.fridgeItem.name = values.nameControl;
    this.fridgeItem.quantity = values.quantityControl;
    this.fridgeItem.date = values.dateControl;
    this.bs.update(this.id, this.fridgeItem)
      .subscribe(
        response => {
          console.log(response);
          console.log(response._id);
        },
        error => {
          console.log(error);
        }
      );
    this.router.navigateByUrl('/table');
  }

  cancel(): void {
    this.location.back();
  }

}