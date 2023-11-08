import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-edit-asset',
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.scss']
})
export class EditAssetComponent implements OnInit {
  submitted: boolean = false;

  employeeFieldData!: any[];
  employeeForm!: FormGroup

  editUserForm;
  userService: any;
  userList: any;
  dataSource: any;
  sort: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditAssetComponent>,
    private fb: FormBuilder,
    private auth: UserService,
    private route: Router,
    private formBuilder: FormBuilder
  ) {
    this.editUserForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      approve:  new FormControl('', Validators.required),

    });

  }
  userId = this.data.id;

  ngOnInit(): void {
    this.getPageData(this.data);

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

  async onSubmit() {

    this.submitted = true;
    if(this.editUserForm.valid && this.editUserForm?.value) {

        this.auth.editUser(this.userId, this.editUserForm.value).subscribe({
          next: async (res: { status: number; data: { firstName: string; lastName: string; email: string; password: string }; }) => {
            console.log(res);
            if(res.status == 200) {
              if(res.data) {

                this.closeDialog()
                this.userList =  await this.auth.getUsers().toPromise();

                console.log('ll', this.userList)
                this.auth.setData(this.userList['data']);
              }
              else {

              }
            }
          },
          error: (err: { error: { message: any; }; }) => {
            alert('Error updating user')

          }
        })


    }
}

getPageData = async (data: any) => {
  this.userList = await this.auth.getUserDetails(data.id).toPromise();

  alert(this.userList['data'][0].approved)

  this.editUserForm.patchValue({
    firstName: this.userList['data'][0].firstName,
    lastName: this.userList['data'][0].lastName,
    email: this.userList['data'][0].email,
    approve:this.userList['data'][0].approved,
  });
}

  closeDialog() {
    this.dialogRef.close();
  }

}
