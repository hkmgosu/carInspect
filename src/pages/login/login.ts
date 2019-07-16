import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from 'ionic-angular';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    formData: FormGroup;
    appVersion:any = '';
    constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, formBuilder: FormBuilder, private dataService: DataProvider, private toastCtrl: ToastController){
        this.formData = formBuilder.group({
            email: [''],
            password: ['']
        });
        this.appVersion = localStorage.getItem('appversion');
    }
    dismiss(submit){
        this.close();
    }
    close(){
        this.viewCtrl.dismiss();
    }
    login(){
        this.dataService.login(this.formData.value.email,this.formData.value.password).then((data:any) => {
          localStorage.setItem("info_user", JSON.stringify(data));
          this.presentToast('Bienvenido !');
          window.location.reload();
        });
    }
    presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 2500,
            position: 'bottom'
        });
        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });
        toast.present();
    }
}
