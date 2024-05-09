import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/share/components/add-update-product/add-update-product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

firebaseSvc = inject(FirebaseService);
utilSvc = inject(UtilsService);

  ngOnInit() {
  }


  //=================== cerrar sesion>

  signOut(){
    this.firebaseSvc.signOut();
  }

  //-------------------- agregar o actualizar videos

  appUpdateProduct(){
    this.utilSvc.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'appUpdateModal'
  })
  }
}
