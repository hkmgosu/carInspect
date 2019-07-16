import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';

@Component({
    selector: 'page-crearinspeccion',
    templateUrl: 'crearinspeccion.html',
})
export class CrearinspeccionPage {
    newInspeccionForm: FormGroup;

    constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private dataService: DataProvider, formBuilder: FormBuilder, private toastCtrl: ToastController) {
        this.newInspeccionForm = formBuilder.group({
            patente: ['', Validators.compose([Validators.required])],
            marca: ['', Validators.compose([Validators.required])],
            modelo: ['', Validators.compose([Validators.required])],
            correo: ['', Validators.compose([Validators.email,Validators.required])],
            nombre: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'),Validators.required])],
            apellido: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'),Validators.required])]
        });
    }
    close(data?){
        this.viewCtrl.dismiss(data);
    }
    save(){
        this.dataService.createInspeccion(this.newInspeccionForm.value).then(data => {
            this.close(this.newInspeccionForm.value);
            this.presentToast('Inspeccion creada exitosamente.');
        });
    }
    presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 2500,
            position: 'bottom'
        });
        toast.present();
    }
    test(e){
        console.log(e);
    }
}
