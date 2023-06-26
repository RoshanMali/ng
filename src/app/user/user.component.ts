import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  users = []
  isAdd = true;
  updateUserId = null;
  form = this.fb.group({
    name: new FormControl(null, Validators.required),
    gender: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.getUsers()
    this.form.get('name').valueChanges.subscribe(res => this.form.get('email').patchValue(this.form.get('name').value + '@gmail.com'))
  }
  getUsers() {
    this.http.get("http://localhost:8080/demo/all").subscribe((res: any) => {
      this.users = res
    })
  }

  sortBy(gender) {
    this.http.get(`http://localhost:8080/demo/all?gender=${gender}`).subscribe((res: any) => {
      this.users = res
    })
  }

  updateUser(u) {
    this.form.patchValue(u);
    this.isAdd = false
    this.updateUserId = u.id
  }

  deleteUser(id: number, name: string) {
    if (confirm(`Are you sure to delete ${name}`)) {
      this.http.delete(`http://localhost:8080/demo/delete/${id}`).subscribe(res => {
        this.getUsers()
      })
    }
  }

  deleteAllUsers() {
    if (confirm("Are you sure to delete all records?")) {
      this.http.delete(`http://localhost:8080/demo/deleteAll`).subscribe(res => {
        this.getUsers()
      })
    }
  }

  submit() {
    if (this.isAdd) {
      this.http.post("http://localhost:8080/demo/add", this.form.value).subscribe(res => {
        this.getUsers()
        this.form.reset()
      })
    } else {
      this.http.post(`http://localhost:8080/demo/update/${this.updateUserId}`, this.form.value).subscribe(res => {
        this.getUsers()
        this.form.reset()
      })
    }
  }
  reset() {
    this.form.reset()
    this.isAdd = true;
    this.updateUserId = false;
  }
}
