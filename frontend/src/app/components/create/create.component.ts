import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../../shared/backend.service';
import { FridgeItem } from '../../shared/fridge-item';
import { DialogService } from '../../shared/dialog.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: '../styles/create-detail-styles.css'
})

export class CreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private bs: BackendService,
    private fb: FormBuilder,
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

  ngOnInit(): void {}

  create(): void {
    if (this.form.get('nameControl')?.value.trim() === '') {
      this.dialogService.openErrorDialog('The name field is mandatory. Please provide a name for your item.');
      return;
    }

    if (this.form.invalid) {
      this.dialogService.openConfirmDialog('Missing Fields', 'Not all required fields are filled. Do you still want to create this entry?').subscribe(result => {
        if (result) {
          this.submitForm();
        }
      });
    }
    else {
      this.submitForm();
    }
  }

  submitForm(): void {
    const values = this.form.value;
    const newFridgeItem: FridgeItem = {
      _id: '',
      name: values.nameControl,
      quantity: values.quantityControl,
      date: values.dateControl
    };
    this.bs.addOne(newFridgeItem).subscribe(
      response => {
        this.dialogService.openInfoDialog('Your entry has been successfully created.')
        console.log('Entry created:', response);
        this.router.navigateByUrl('/table');
      },
      error => {
        console.log('Error creating this item:', error);
      }
    );
  }

  cancel(): void {
    this.dialogService.openConfirmDialog('Confirm cancellation', 'Do you really want to cancel this action?').subscribe(
      result => {
        if (result) {
          this.router.navigateByUrl('/table');
        }
      }
    );
  }
}