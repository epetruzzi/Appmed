import { Injectable, inject } from '@angular/core';
import { LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

loadingCtrl = inject(LoadingController);
toastCtrl = inject(ToastController);
router = inject(Router);
modalCtrl = inject(ModalController);


loading(){
  return this.loadingCtrl.create({spinner: 'crescent'})
}

async presentToast(opts?: ToastOptions) {
  const toast = await this.toastCtrl.create(opts);
  toast.present();
}

routerLink(url: string){
  return this.router.navigateByUrl(url);
}

saveInLocalStorage(key: string, value: any){
  return localStorage.setItem(key, JSON.stringify(value))
}

getFromLocalStorage(key: string){
  return JSON.parse(localStorage.getItem(key)) 
}

//-------------- Modal>

async presentModal(opts: ModalOptions) {
  const modal = await this.modalCtrl.create(opts);

  await modal.present();

  const {data} = await modal.onWillDismiss();
  if(data) return data;
}

dismissModal(data?: any){
return this.modalCtrl.dismiss(data);

}

}


