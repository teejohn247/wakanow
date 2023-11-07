import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.scss']
})
export class CreateAssetComponent implements OnInit {
  submitted: boolean = false;

  employeeFieldData!: any[];
  employeeForm!: FormGroup

  addUserForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
  })
  userList: any;

  constructor(
    public dialogRef: MatDialogRef<CreateAssetComponent>,
    private fb: FormBuilder,
    private auth: UserService,
    private route: Router
  ) { }


  ngOnInit(): void {
    this.employeeFieldData = [
      {
        controlName: 'firstName',
        controlType: 'text',
        controlLabel: 'First Name',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required],
        order: 1
      },
      {
        controlName: 'lastName',
        controlType: 'text',
        controlLabel: 'Last Name',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required],
        order: 2
      },
      {
        controlName: 'officialEmail',
        controlType: 'text',
        controlLabel: 'Company Email Address',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required, Validators.email],
        order: 3
      },
      {
        controlName: 'phoneNo',
        controlType: 'text',
        controlLabel: 'Phone Number',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required],
        order: 4
      },
      {
        controlName: 'dateOfBirth',
        controlType: 'date',
        controlLabel: 'Date of Birth',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required],
        order: 5
      },
      {
        controlName: 'gender',
        controlType: 'select',
        controlLabel: 'Gender',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: {
          Male: 'male',
          Female: 'female'
        },
        validators: [Validators.required],
        order: 6
      },
      {
        controlName: 'personalEmail',
        controlType: 'text',
        controlLabel: 'Personal Email Address',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required, Validators.email],
        order: 7
      },
      {
        controlName: 'employmentType',
        controlType: 'select',
        controlLabel: 'Employment Type',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: {
          Contract: 'contract',
          Permanent: 'permanent'
        },
        validators: [Validators.required],
        order: 8
      },
      {
        controlName: 'department',
        controlType: 'select',
        controlLabel: 'Department',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: {
          Sales: 'sales',
          Marketing: 'marketing'
        },
        validators: [Validators.required],
        order: 9
      },
      {
        controlName: 'role',
        controlType: 'text',
        controlLabel: 'Role',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required],
        order: 10
      },
    ]

    this.employeeFieldData.sort((a,b) => (a.order - b.order));
    this.employeeForm = this.fb.group({})

    this.employeeFieldData.forEach(field => {
      const formControl = this.fb.control(field.initialValue, field.validators)
      this.employeeForm.addControl(field.controlName, formControl)
    })
  }

  onSubmit() {

    this.submitted = true;

    console.log('here', this.addUserForm)
    console.log('here', this.addUserForm.valid)
    if(this.addUserForm.valid) {
        this.auth.addUser(this.addUserForm.value).subscribe({
          next: async (res: { status: number; data: { firstName: string; lastName: string; email: string; password: string }; }) => {
            console.log(res);
            if(res.status == 200) {
              if(res.data) {
                this.userList =  await this.auth.getUsers().toPromise();

                this.auth.setData(this.userList['data']);
                this.closeDialog()

              }
              else {
                // this.route.navigate(['/login']);
              }
            }
          },
          error: (err: { error: { error: any; }; }) => {
            console.log(err)
            alert('Error adding User')

            // this.notify.showError(err.error.error);
          }
        })
    }
}

  closeDialog() {
    this.dialogRef.close();
  }

}
