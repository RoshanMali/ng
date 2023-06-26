import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss'],
})
export class FilmComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['title', 'releaseYear', 'length', 'rating'];
  dataSource = new MatTableDataSource<Film>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageIndex = 0;
  pageSize = 5;
  activeSort: string;
  sortDirection: string;
  totalElements: number;
  searchForm: FormGroup;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getData();
    this.searchForm = new FormGroup({
      filmSearchStr: new FormControl(),
      releaseYear: new FormControl(),
      rating: new FormControl(),
    });
  }

  getData() {
    const payload = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      sortBy: this.activeSort,
      sortOrder: this.sortDirection,
      ...this.searchForm?.value,
    };
    this.http
      .post(`http://localhost:8080/film/films`, payload)
      .subscribe((res: any) => {
        this.dataSource = res.data.content;
        this.totalElements = res.data.totalElements;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sort?.sortChange.subscribe((res: MatSort) => {
      this.activeSort = res.active;
      this.sortDirection = res.direction;
      this.getData();
    });
    this.paginator?.page.subscribe((res: PageEvent) => {
      this.pageSize = res.pageSize;
      this.pageIndex = res.pageIndex;
      this.getData();
    });
    this.searchForm.get('filmSearchStr')?.valueChanges?.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
          this.getData();
      });
  }
}
export interface Film {
  film_id: number;
  title: string;
  description: number;
  release_year: string;
  rating: string;
  length: number;
  actors: string;
}
