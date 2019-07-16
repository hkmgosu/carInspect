import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { InspeccionesPage } from '../../pages/inspecciones/inspecciones';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    registrado: any;
    user: any;

    constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

    }

    login_app(){
        const loginModal = this.modalCtrl.create(LoginPage);
        loginModal.present();
    }
    
    ionViewDidLoad(){
        
        this.registrado = true;
        this.user = JSON.parse(localStorage.getItem('info_user'));
        if (this.user === null){
            this.registrado = false;
        }

    }

    page1() {
        this.navCtrl.setRoot(InspeccionesPage);
    }

}
