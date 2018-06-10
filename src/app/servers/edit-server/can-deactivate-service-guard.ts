import { Observable } from "rxjs/internal/Observable";
import { CanDeactivate } from "@angular/router/src/interfaces";
import { ActivatedRouteSnapshot } from "@angular/router";
import { RouterStateSnapshot } from "@angular/router";

export interface CanComponentDeactivate {
    canDeactivate: () => boolean | Observable<boolean> | Promise<boolean>;
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(component: CanComponentDeactivate, 
        currentRoute: ActivatedRouteSnapshot, 
        currentState: RouterStateSnapshot, 
        nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return component.canDeactivate();
    }
    
}