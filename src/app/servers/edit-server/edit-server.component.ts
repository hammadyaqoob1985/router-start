import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Params } from '@angular/router';
import { CanDeactivateGuard, CanComponentDeactivate } from 'src/app/servers/edit-server/can-deactivate-service-guard';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanDeactivateGuard {
  canDeactivate(component: CanComponentDeactivate,
     currentRoute: ActivatedRouteSnapshot, 
     currentState: RouterStateSnapshot, 
     nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    
      if(!this.allowEdit) {
        return true;
      }
      if((this.serverName !== this.server.name  || 
        this.serverStatus !== this.server.status) &&
        !this.changesSaved) {
          return confirm("Do you want to discard the changes?")
        } else {
          return true;
        }
  }
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService,
  private route: ActivatedRoute,
  private router: Router) { }
  ngOnInit() {
   console.log(this.route.snapshot.queryParams);
   console.log(this.route.snapshot.fragment);
   this.route.queryParams.subscribe(
     (queryParams : Params) => this.allowEdit = queryParams['allowEdit'] === '1' ? true : false
   );
   this.route.fragment.subscribe();
   const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.route.params
    .subscribe(
      (params : Params) => {
        this.server = this.serversService.getServer(+params['id']);
      } 
    );
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'],{relativeTo: this.route,
      queryParamsHandling: 'preserve'});
  }

}
