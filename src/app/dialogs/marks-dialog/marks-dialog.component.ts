import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-marks-dialog',
  templateUrl: './marks-dialog.component.html',
  styleUrls: ['./marks-dialog.component.scss']
})
export class MarksDialogComponent {
  marksForm !: FormGroup;
  actionBtn: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<MarksDialogComponent>
  ) {}

  ngOnInit() {
    this.marksForm = this.formBuilder.group({
      english: ['', Validators.required],
      maths: ['', Validators.required],
      science: ['', Validators.required],
      envScience: ['', Validators.required],
      social: ['', Validators.required],
      physics: ['', Validators.required]
    })

    if(this.editData) {
      this.actionBtn = 'Update'
      this.marksForm.controls['english'].setValue(this.editData.english);
      this.marksForm.controls['maths'].setValue(this.editData.maths);
      this.marksForm.controls['science'].setValue(this.editData.science);
      this.marksForm.controls['envScience'].setValue(this.editData.envScience);
      this.marksForm.controls['social'].setValue(this.editData.social);
      this.marksForm.controls['physics'].setValue(this.editData.physics);
    }
  }

  addStudent() {
    if(!this.editData) {
      if(this.marksForm.valid) {
        this.sharedService.saveMarks(this.marksForm.value)
        .subscribe({
          next: (res) => {
            this.marksForm.reset()
            this.dialogRef.close('save');
          },
          error: (err) => {
            alert("Error while adding marks")
          }
        })
      }
    } else {
      this.updateStudent();
    }
  }

  updateStudent() {
    this.sharedService.putMarks(this.marksForm.value, this.editData.id).subscribe({
      next: (res) => {
        this.marksForm.reset();
        this.dialogRef.close('update');
      },
      error: (err) => {
        return 'Error while updating marks';
      }
    })
  }
}
