import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ActionSheetController } from 'ionic-angular';
import * as moment from 'moment-shortformat';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@Component({
  selector: 'page-galeriafoto',
  templateUrl: 'galeriafoto.html',
})
export class GaleriafotoPage {
  uploading: Array<any>= [];
  photos: Array<any>= [];
  private id_ins:any;
  url:any;
  constructor(
    public navParams: NavParams,
    private camera: Camera,
    private dataService: DataProvider,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private photoViewer: PhotoViewer
  ) {
  }
  ionViewDidLoad() {
    this.id_ins = this.navParams.data.id_ins;
    this.getPhotos(this.id_ins);
  }
  getPhotos(id_ins){
    this.dataService.getFotosInspeccion(id_ins).then((res:any)=>{
      this.url = res.url
      this.photos = res.photos;
    });
  }
  showPhoto(host,photo, title?){
    this.photoViewer.show(host+photo, title, {share: false});
  }
  uploadPhoto(sourceType){
    const options: CameraOptions = {
        quality: 30,
        sourceType: sourceType,
        destinationType: 0,
        encodingType: 0,
        mediaType: 0,
        cameraDirection: 0,
        correctOrientation: true,
    }
    this.camera.getPicture(options).then((imageData) =>{
      this.uploading.push({foto:imageData,eliminado:3});
      this.dataService.uploadPhoto2Inspeccion({id_ins:this.id_ins,base64img:imageData}).then((res:any)=>{
        this.uploading.splice(this.uploading.indexOf({foto:imageData,eliminado:3},1));
        this.ionViewDidLoad();
      }).catch(()=>{
        this.uploading[this.uploading.indexOf({foto:imageData,eliminado:3})] = {foto:imageData,eliminado:2};
      });
    },(err)=>{
        //Handle error
    });
  }
  deletePhoto(id_img){
    let toast = this.toastCtrl.create({
      message: 'Eliminando foto...',
      duration: 2500,
      position: 'bottom'
    });
    toast.present();
    this.dataService.deletePhotoInspeccion(id_img).then((res:any)=>{
      toast.present();
      this.ionViewDidLoad();
    });
  }
  getStatus(status){
    switch(status){
      case '0':{
        return 'Activo';
      }
      case '1':{
        return 'Eliminado';
      }
      case '2':{
        return 'Error';
      }
      default:{
        return 'Procesando';
      }
    }
  }
  calendar(date){
    return moment.utc(date).local().short();
  }
  actionSheet(photo) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Foto',
      buttons: [
        {
          text: 'Ver foto',
          handler: () => {
            this.showPhoto(this.url,photo.foto,this.calendar(photo.date_created));
          }
        },{
          text: 'Eliminar foto',
          role: 'destructive',
          handler: () => {
            this.deletePhoto(photo.id_img);
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  photoActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Tipo de foto',
      buttons: [
        {
          text: 'Libreria de fotos',
          handler: () => {
            this.uploadPhoto(0);
          }
        },{
          text: 'Camara',
          handler: () => {
            this.uploadPhoto(1);
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
        }
      ]
    });
    actionSheet.present();
  }
}
