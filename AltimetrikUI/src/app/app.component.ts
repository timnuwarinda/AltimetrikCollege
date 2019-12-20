import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CollegeService } from './college.service';
import {MatTableModule,MatTableDataSource,MatPaginator} from '@angular/material';
import { FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  // searchForm: FormGroup;

  
  title = 'AltimetrikUI';
  name: string;
  num_of_students: number;
  searchForm;


  headElements = ['name', 'studentsNumber'];


  dataSource : any = [];


  constructor( private collegeService: CollegeService, private formBuilder: FormBuilder,
    ) { 
      this.searchForm = this.formBuilder.group({
        zip: '',
        degrees: '',
        year:''
      });

    }


  ngOnInit() {
 
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
  }

  onSubmit(formData) {
    
    this.collegeService.search(formData.zip, formData.degrees, formData.year)
      .subscribe((data)=> { 
          // if(parseInt(data.success) === 1) {
          console.log(data);
          this.dataSource = [...data.results];
          // }else {

          // }
    } );
    
  }
}