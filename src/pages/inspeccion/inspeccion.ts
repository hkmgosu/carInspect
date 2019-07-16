import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { FormularioPage } from '../../pages/formulario/formulario';
import { GaleriafotoPage } from '../galeriafoto/galeriafoto';

@Component({
  selector: 'page-inspeccion',
  templateUrl: 'inspeccion.html',
})
export class InspeccionPage {
    item: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
        this.item = this.navParams.data;
    }

    ionViewDidLoad(){
    }

    formulario(){
        const formModal = this.modalCtrl.create(FormularioPage,this.item);
        formModal.present();
        formModal.onDidDismiss(data=>{
            Object.assign(this.item, data);
        });
    }
    goToGaleria(){
        this.navCtrl.push(GaleriafotoPage,{id_ins:this.item.id_ins});
    }
}
