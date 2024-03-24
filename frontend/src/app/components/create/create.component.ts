import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../../shared/backend.service';
import { FridgeItem } from '../../shared/fridge-item';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private bs: BackendService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      nameControl: ['', Validators.required],
      quantityControl: ['', Validators.required],
      dateControl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Hier könntest du zusätzliche Initialisierungslogik hinzufügen, wenn nötig
  }

  create(): void {
    const values = this.form.value;
    const newFridgeItem: FridgeItem = {
        _id: '', // Du kannst das leere String hier lassen, wenn das Backend die ID generiert
        name: values.nameControl,
        quantity: values.quantityControl,
        date: values.dateControl
    };
    this.bs.addOne(newFridgeItem).subscribe(
        response => {
            console.log('Eintrag erstellt:', response);
            // Hier könntest du weitere Aktionen ausführen, z.B. eine Weiterleitung nach erfolgreicher Erstellung
            this.router.navigateByUrl('/table');
        },
        error => {
            console.log('Fehler beim Erstellen des Eintrags:', error);
            // Hier könntest du eine Fehlerbehandlung hinzufügen, z.B. eine Fehlermeldung anzeigen
        }
    );
}


  cancel(): void {
    // Hier könntest du eine Abbruchlogik hinzufügen, z.B. eine Weiterleitung oder eine Benachrichtigung
    this.router.navigateByUrl('/table');
  }
}
