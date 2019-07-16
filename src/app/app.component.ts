import { Component, ViewChild } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { InspeccionesPage } from '../pages/inspecciones/inspecciones';
import { LoginPage } from '../pages/login/login';
import { Network } from '@ionic-native/network';
import { NetworkService } from '../providers/network/network';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    user: any;
    rootPage: any = HomePage;
    pages: Array<{title: string, component: any}>;
    registrado: any;
    version: any;

    constructor(
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public networkStatus: NetworkService,
        public network: Network,
        public events: Events,
        private appVersion: AppVersion
    ) {
        this.initializeApp();
        this.pages = [
            { title: 'Inspecciones', component: InspeccionesPage }
        ];
    }
    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
    initializeApp() {
        this.platform.ready().then(() => {
            this.registrado = true;
            this.user = JSON.parse(localStorage.getItem('info_user'));
            if(this.user == null){
                this.registrado = false;
                this.rootPage = LoginPage;
            }else{
                this.rootPage = InspeccionesPage;
            }
            this.setStatusBar('#4CA64C');
            this.splashScreen.hide();
            /* Get app version */
            this.appVersion.getVersionNumber()
            .then(version=>{
                this.version = version;
                localStorage.setItem('appversion',version);
                console.log(version);
            });
            this.network.onConnect().subscribe(() => {
                this.events.publish('network:online', true);
                console.log('Online');
                if(
                    this.network.type == 'unknown'
                    || this.network.type == 'none'
                    || this.network.type == '2g'
                    || this.network.type == '3g'
                ){
                    this.setStatusBar('#FFA500');
                }else{
                    this.setStatusBar('#4CA64C');
                }
            });
            this.network.onDisconnect().subscribe(() => {
                this.events.publish('network:online', false);
                console.log('Offline');
                this.setStatusBar('#FF3232');
            });
        });
    }
    logout() {
        this.unsetUser();
        window.location.reload();
    }
    unsetUser(){
        localStorage.setItem("info_user", null);
    }
    setStatusBar(color?){
        if(color){
            this.statusBar.backgroundColorByHexString(color);
        }
        else{
            this.statusBar.styleDefault();
        }
    }
}
