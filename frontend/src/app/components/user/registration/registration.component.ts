import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form !: FormGroup;

  constructor(public fb: FormBuilder) { }

  get f(): any{
    return this.form.controls;
  }

  ngOnInit(): void {
    this.validation();
  }

  private validation(): void{

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'passwordConfirm')
    };

    this.form = this.fb.group({
      firstName:['', Validators.required] ,
      lastName:['', Validators.required] ,

      email:['',
      [Validators.required, Validators.email]
      ],
      userName:['', Validators.required],
      password:['',
      [Validators.required, Validators.minLength(6)]
      ],
      passwordConfirm:['', Validators.required]

    }, formOptions);
  }

}
