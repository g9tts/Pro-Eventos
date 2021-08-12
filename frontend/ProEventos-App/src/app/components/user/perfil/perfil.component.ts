import { ValidatorField } from './../../../helpers/ValidatorField';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  form!: FormGroup;

  get f(): any {
    return this.form.controls;
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validation();
  }

  private validation(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'passwordConfirm')
    };

    this.form = this.fb.group({
      titulo: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      descricao: ['', Validators.required],
      funcao: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.nullValidator]],
      passwordConfirm: ['', Validators.nullValidator]
    }, formOptions);
  }

  onSubmit(): void {

    if (this.form.invalid) {
      return;
    }
  }

  public resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }
}
