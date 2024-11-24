import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-package',
  standalone: false,
  
  templateUrl: './package.component.html',
  styleUrl: './package.component.scss'
})
export class PackageComponent {
  packageArray: any[] = [];
  isReslutLoaded = false;
  isUpdateFomrActive = false;

  package_name: string = "";
  package_desti: string = "";
  package_arr: string = "";
  package_price: string = "";
  package_go: string = "";
  
  // New fields
  package_back: string = "";
  package_desc: string = "";
  package_left: string = "";

  currentPackageID = "";

  constructor(private http: HttpClient) {
    this.getAllPackage();
  }

  ngOnInit(): void {}

  getAllPackage() {
    this.http.get("http://localhost:8085/api/package")
      .subscribe((resultData: any) => {
        this.isReslutLoaded = true;
        console.log(resultData.data); 
        this.packageArray = resultData.data; 
      }, (error) => {
        console.error("Error fetching packages:", error);
      });
  }

  register() {
    let bodyData = {
      "package_name": this.package_name,
      "package_price": this.package_price,
      "package_go": this.package_go,
      "package_desti": this.package_desti,
      "package_arr": this.package_arr,
      "package_back": this.package_back,  // New field
      "package_desc": this.package_desc,  // New field
      "package_left": this.package_left   // New field
    };

    this.http.post("http://localhost:8085/api/package/add", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert('Package added successfully');
      this.getAllPackage();
    });
  }

  setUpdate(data: any) {
    this.package_name = data.package_name;
    this.package_price = data.package_price;
    this.package_go = data.package_go;
    this.package_desti = data.package_desti;
    this.package_arr = data.package_arr;
    this.package_back = data.package_back;  // New field
    this.package_desc = data.package_desc;  // New field
    this.package_left = data.package_left;  // New field
    this.currentPackageID = data.package_id;
  }

  UpdateRecord() {
    if (!this.currentPackageID) {
      alert("No package selected for update.");
      return;
    }

    let bodyData = {
      "package_name": this.package_name,
      "package_price": this.package_price,
      "package_go": this.package_go,
      "package_desti": this.package_desti,
      "package_arr": this.package_arr,
      "package_back": this.package_back,  // New field
      "package_desc": this.package_desc,  // New field
      "package_left": this.package_left   // New field
    };

    this.http.put(`http://localhost:8085/api/package/update/${this.currentPackageID}`, bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        if (resultData.status) {
          alert("Package updated successfully");
        } else {
          alert("Failed to update package");
        }
        this.getAllPackage();
      }, (error) => {
        console.error("Error updating package:", error);
        alert("Error updating package");
      });
  }

  save() {
    if (this.currentPackageID == '') {
      this.register();
    } else {
      this.UpdateRecord();
    }
  }

  setDelete(data: any) {
    this.http.delete(`http://localhost:8085/api/package/delete/${data.package_id}`).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Package deleted");
      this.getAllPackage();
    });
  }
}
