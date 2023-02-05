import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.scss']
})
export class StudentDialogComponent {
  studentForm !: FormGroup;
  hobbies = ['Cricket', 'Reading Books', 'Playing Chess', "Listening Music"];
  actionBtn: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<StudentDialogComponent>
  ) {}

  ngOnInit() {
    this.studentForm = this.formBuilder.group({
      studentName: ['', Validators.required],
      fatherName: ['', Validators.required],
      gender: ['', Validators.required],
      class: ['', Validators.required],
      dob: ['', Validators.required],
      phone: ['', Validators.required],
      address: [''],
    })

    if(this.editData) {
      this.actionBtn = 'Update'
      this.studentForm.controls['studentName'].setValue(this.editData.studentName);
      this.studentForm.controls['fatherName'].setValue(this.editData.fatherName);
      this.studentForm.controls['gender'].setValue(this.editData.gender);
      this.studentForm.controls['class'].setValue(this.editData.class);
      this.studentForm.controls['dob'].setValue(this.editData.dob);
      this.studentForm.controls['phone'].setValue(this.editData.phone);
      this.studentForm.controls['address'].setValue(this.editData.address);
    }
  }

  addStudent() {
    if(!this.editData) {
      if(this.studentForm.valid) {
        this.sharedService.saveStudent(this.studentForm.value)
        .subscribe({
          next: (res) => {
            this.studentForm.reset()
            this.dialogRef.close('save');
          },
          error: (err) => {
            return "Error while adding student"
          }
        })
      }
    } else {
      this.updateStudent();
    }
  }

  updateStudent() {
    this.sharedService.putStudent(this.studentForm.value, this.editData.id).subscribe({
      next: (res) => {
        this.studentForm.reset();
        this.dialogRef.close('update');
      },
      error: (err) => {
        return 'Error while updating student';
      }
    })
  }
}
