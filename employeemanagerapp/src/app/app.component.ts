import { Component, OnInit } from '@angular/core';
import { Employee } from './models/employee';
import { EmployeeService } from './services/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  emp!: Employee;
  employees!: Employee[];
  editEmployee!: Employee;
  deleteEmployee!: Employee;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
      this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  

  onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click()
    this.employeeService.addEmployee(addForm.value).subscribe(
      (respponse: Employee) => {
        console.log(respponse)
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (respponse: Employee) => {
        console.log(respponse)
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onDeleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (respponse: void) => {
        console.log(respponse)
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  searchEmployees(key: string): void {
    const result: Employee[] = [];
    for(const employee of this.employees) {
      if(employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      employee.employeeDepartment.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        result.push(employee)
      }
    }
    this.employees = result;
    if(result.length === 0 || !key) {
      this.getEmployees();
    }
  }

  onOpenModal(employee: Employee, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');


    if(mode === 'add') {
      this.emp = employee;
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if(mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if(mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }
  
}
