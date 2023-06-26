import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge } from 'rxjs';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['title', 'releaseYear', 'length', 'rating'];
  dataSource = new MatTableDataSource<Film>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageIndex = 0;
  pageSize = 5
  activeSort: string;
  sortDirection: string;
  totalElements: number

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    const payload = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      sortBy: this.activeSort,
      sortOrder: this.sortDirection,
    }
    this.http.post(`http://localhost:8080/film/films`, payload).subscribe((res: any) => {
      this.dataSource = res.data.content
      this.totalElements = res.data.totalElements
    })
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sort?.sortChange.subscribe((res: MatSort) => {
      this.activeSort = res.active;
      this.sortDirection = res.direction
      this.getData()
    })
    this.paginator?.page.subscribe((res: PageEvent) => {
      this.pageSize = res.pageSize;
      this.pageIndex = res.pageIndex
      this.getData()
    })
  }
}
export interface Film {
  film_id: number,
  title: string;
  description: number;
  release_year: string;
  rating: string;
  length: number;
  actors: string
}