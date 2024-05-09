import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class noAuthGuard implements CanActivate {
  
  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);
  

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable <boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
      return new Promise((resolve)=>{
        this.firebaseSvc.getAuth().onAuthStateChanged((auth) =>{
if(!auth)
  resolve(true);
else{
  this.utilSvc.routerLink('/main/home');
  resolve(false)
}
        })
      })}
};
