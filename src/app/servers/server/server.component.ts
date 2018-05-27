import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverParamsSubscription : Subscription;
  serverId: number;
  constructor(private serversService: ServersService, private route: ActivatedRoute) { }

  ngOnInit() {
   const id = +this.route.snapshot.params['id'];
     this.server = this.serversService.getServer(id);

    this.serverParamsSubscription = this.route.params
    .subscribe(
      (params : Params) => {
        this.server = this.serversService.getServer(+params['id']);
      } 
    );
  }

}
