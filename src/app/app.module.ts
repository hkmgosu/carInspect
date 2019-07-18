import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { AppVersion } from "@ionic-native/app-version";
import { Network } from "@ionic-native/network";
import { NetworkService } from "../providers/network/network";
import { PhotoViewer } from "@ionic-native/photo-viewer";
import { HttpModule } from "@angular/http";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TimeoutInterceptor } from "../providers/interceptor/timeout";
import { Camera } from "@ionic-native/camera";
import { FileTransfer } from "@ionic-native/file-transfer";
import { AutoresizeDirective } from "../directives/autosize/autosize";
import { UppercaseDirective } from "../directives/uppercase-input/uppercase";
import { PipesModule } from "../pipes/pipes.module";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { DataProvider } from "../providers/data/data";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { InspeccionesPage } from "../pages/inspecciones/inspecciones";
import { InspeccionPage } from "../pages/inspeccion/inspeccion";
import { FormularioPage } from "../pages/formulario/formulario";
import { CrearinspeccionPage } from "../pages/crearinspeccion/crearinspeccion";

import { GaleriafotoPage } from "../pages/galeriafoto/galeriafoto";
import { LoginPageModule } from "../pages/login/login.module";
import { InspeccionesPageModule } from "../pages/inspecciones/inspecciones.module";
import { InspeccionPageModule } from "../pages/inspeccion/inspeccion.module";
import { FormularioPageModule } from "../pages/formulario/formulario.module";
import { CrearinspeccionPageModule } from "../pages/crearinspeccion/crearinspeccion.module";
import { GaleriafotoPageModule } from "../pages/galeriafoto/galeriafoto.module";

@NgModule({
  declarations: [MyApp, HomePage, AutoresizeDirective, UppercaseDirective],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    PipesModule,
    LoginPageModule,
    InspeccionesPageModule,
    InspeccionPageModule,
    FormularioPageModule,
    CrearinspeccionPageModule,
    GaleriafotoPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    InspeccionesPage,
    InspeccionPage,
    FormularioPage,
    GaleriafotoPage,
    CrearinspeccionPage
  ],
  providers: [
    AppVersion,
    Network,
    NetworkService,
    PhotoViewer,
    StatusBar,
    SplashScreen,
    Camera,
    FileTransfer,
    DataProvider,
    [{ provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true }],
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
