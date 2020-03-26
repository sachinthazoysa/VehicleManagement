import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/shared/vehicle.service';
import { Vehicle } from 'src/app/shared/vehicle.model';
import { ToastrService } from 'ngx-toastr';
import {  MatDialog, MatDialogConfig} from "@angular/material";
import { VehiclesComponent } from '../vehicles.component';
import { VehicleComponent } from '../vehicle/vehicle.component';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
}) 
export class VehicleListComponent implements OnInit {

  constructor(
    public service : VehicleService,
    private toastr : ToastrService,
    private dialog:MatDialog ) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(veh : Vehicle){
    this.service.formData= veh;
  

    //  const dialogConfig = new MatDialogConfig();
    //  dialogConfig.data={veh};

    //  this.dialog.open(VehicleComponent,dialogConfig);
   
  }

  onDelete(id : number){
    if (confirm('Are you sure to delete this Vehicle?')){
    this.service.deleteVehicle(id).subscribe(res=>{
      this.service.refreshList();
      this.toastr.warning('Deleted succesfully','VHCL.MNGMNT'); 
    });
  }}

  onClick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width="50%";
 
    this.dialog.open(VehicleComponent)
  }


}
