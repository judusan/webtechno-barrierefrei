import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../shared/backend.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FridgeItem } from '../../shared/fridge-item';
import { DialogService } from '../../shared/dialog.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: '../../shared/styles/create-detail-styles.css'
})

export class DetailComponent implements OnInit {
  id: string = '';
  fridgeItem!: FridgeItem;
  form: FormGroup;
  originalFormValues: any;

  constructor(
    private route: ActivatedRoute,
    private bs: BackendService,
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private dialogService: DialogService
  )
  {
    this.form = this.fb.group({
      nameControl: ['', Validators.required],
      quantityControl: ['', Validators.required],
      dateControl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.readOne(this.id);
  }

  readOne(id: string): void {
    this.bs.getOne(id).subscribe(
      (response: FridgeItem) => {
        this.fridgeItem = response;
        console.log(this.fridgeItem);

        this.form.patchValue({
          nameControl: this.fridgeItem?.name,
          quantityControl: this.fridgeItem?.quantity,
          dateControl: new Date(this.fridgeItem?.date).toISOString().substr(0, 10)
        });

        this.originalFormValues = this.form.value;
        return this.fridgeItem;
      },
      error => console.log(error)
    );
  }

  hasFormChanged(): boolean {
    return JSON.stringify(this.form.value) !== JSON.stringify(this.originalFormValues);
  }

  update(): void {
    if (this.form.get('nameControl')?.value.trim() === '') {
      this.dialogService.openErrorDialog('The name field is mandatory. Please provide a name for your item.');
      return;
    }
    if (this.form.invalid) {
      this.dialogService.openConfirmDialog('Missing Fields', 'Not all required fields are filled. Do you still want to proceed anyway?')
        .subscribe(result => {
          if (result) {
            this.performUpdate();
          }
        });
    }
    else {
      this.performUpdate();
    }
  }

  performUpdate(): void {
    const values = this.form.value;
    this.fridgeItem.name = values.nameControl;
    this.fridgeItem.quantity = values.quantityControl;
    this.fridgeItem.date = values.dateControl;

    this.bs.update(this.id, this.fridgeItem).subscribe(
      response => {
        console.log(response);
        this.dialogService.openInfoDialog('Entry was successfully updated!');
        this.router.navigateByUrl('/table');
      },
      error => {
        console.log(error);
      }
    );
  }

  cancel(): void {
    if (this.hasFormChanged()) {
      this.dialogService.openConfirmDialog('Confirm Cancellation', 'Changes have been made. Are you sure you want to cancel?')
        .subscribe(result => {
          if (result) {
            this.location.back();
          }
        });
    } else {
      this.location.back();
    }
  }
}