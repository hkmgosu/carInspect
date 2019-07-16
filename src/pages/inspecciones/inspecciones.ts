import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { InspeccionPage } from '../../pages/inspeccion/inspeccion';
import { CrearinspeccionPage } from '../../pages/crearinspeccion/crearinspeccion';
import { DataProvider } from '../../providers/data/data';
import { ToastController } from 'ionic-angular';
import moment from 'moment';

@Component({
    selector: 'page-inspecciones',
    templateUrl: 'inspecciones.html',
})
export class InspeccionesPage {
    link: string;
    fecha: string;
    searchTerm: string = '';
    items: any = [];
    filterItems: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private dataService: DataProvider, private toastCtrl: ToastController){
    }
    openCreateModal(){
        const crearModal = this.modalCtrl.create(CrearinspeccionPage);
        crearModal.present();
        crearModal.onDidDismiss(data =>{
            if(typeof data !== 'undefined'){
                this.getAllInspecciones();
            }
        });
    }
    ionViewDidLoad() {
        this.getAllInspecciones();
    }
    doRefresh(refresher){
        this.getAllInspecciones(refresher);
    }
    getAllInspecciones(refresher?){
        this.dataService.getAllInspecciones().then(data => {
            this.items = data;
            this.filterItems = this.items.sort(function(a,b) {return (a.fecha < b.fecha) ? 1 : ((b.fecha < a.fecha) ? -1 : 0);} );
            if(typeof refresher !== 'undefined'){
                refresher.complete();
                this.presentToast('Lista de inspecciones actualizada exitosamente.');
            }
        }).catch(e=>console.log(e));
    }
    setFilteredItems() {
        this.filterItems = this.items.filter((item) => {
            return ((item.patente.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1) 
                || (item.dueno_nombre.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1)
                || (item.dueno_apellido.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1)
                || (item.marca.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1)
                || (item.modelo.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1)
            );
        });
    }
    goToDetail(item){
        this.navCtrl.push(InspeccionPage,item);
    }
    formatDate(date,format?){
        moment.locale('es');
        return moment.utc(date).local().calendar();
    }
    presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 2500,
            position: 'bottom'
        });
        toast.present();
    }
}
