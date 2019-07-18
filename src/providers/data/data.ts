import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadingController, AlertController } from "ionic-angular";
import "rxjs/add/operator/map";
import { env } from "../../env/env.dev";

@Injectable()
export class DataProvider {
  private loader: any;
  inspecciones: any = [];
  link: string;
  headers: any;
  options: any;
  private _isDev: boolean = (<any>window)["IonicDevServer"] != undefined;
  constructor(
    public http: HttpClient,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.link = this._isDev ? "/dev/" : env.API_URL;
    console.log(this.link);
  }
  getAllInspecciones() {
    this.presentLoading();
    const user = JSON.parse(localStorage.getItem("info_user"));
    return new Promise((resolve, reject) => {
      this.http
        .get(env.API_URL + "inspeccion", {
          headers: { code: user.code },
          params: { id_user: user.id_user, status: "0" }
        })
        .subscribe(
          res => {
            this.loader.dismiss();
            console.log("inspecciones", res);
            resolve(res);
          },
          err => {
            this.loader.dismiss();
            this.handleError(err);
            reject(err);
          }
        );
    });
  }
  getFotosInspeccion(id_ins) {
    let info = JSON.parse(localStorage.getItem("info_user"));
    const body = new HttpParams()
      .set("id_user", info.id_user)
      .set("code", info.code)
      .set("id_ins", id_ins);
    return new Promise((resolve, reject) => {
      this.http.post(env.API_URL + "fotos_inspeccion.php", body).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  createInspeccion(item) {
    this.presentLoading();
    let info = JSON.parse(localStorage.getItem("info_user"));
    const body = {
      inspector: { id: info.id_user },
      cliente: {
        nombre: item.nombre,
        apellido: item.apellido,
        correo: item.correo
      },
      vehiculo: {
        patente: item.patente,
        marca: item.marca,
        modelo: item.modelo
      }
    };
    console.log("params", body);
    return new Promise(resolve => {
      this.http
        .post(env.API_URL + "inspeccion", body, {
          headers: { code: info.code }
        })
        .subscribe(
          res => {
            this.loader.dismiss();
            console.log("guardar inspeccion", res);
            resolve(res);
          },
          err => {
            this.loader.dismiss();
            console.log("error guardar inspeccion", err);
            this.handleError(err);
          }
        );
    });
  }
  uploadPhoto2Inspeccion({ id_ins, base64img }) {
    let info = JSON.parse(localStorage.getItem("info_user"));
    let encodedImg = encodeURIComponent(base64img);
    const body = new HttpParams()
      .set("id_user", info.id_user)
      .set("id_ins", id_ins)
      .set("code", info.code)
      .set("image", encodedImg);
    return new Promise(resolve => {
      this.http.post(env.API_URL + "upload.php", body).subscribe(
        (res: any) => {
          resolve(res);
        },
        err => {
          this.handleError(err);
        }
      );
    });
  }
  updateDataInspeccion({ valor, campo, id_ins }) {
    const user = JSON.parse(localStorage.getItem("info_user"));
    return new Promise((resolve, reject) => {
      this.http
        .put(
          env.API_URL + "inspeccion" + "/" + id_ins,
          { [campo]: valor },
          { headers: { code: user.code } }
        )
        .subscribe(
          res => {
            console.log("Respuesta API");
            console.log(res);
            resolve(res);
          },
          err => {
            //reject(err);
            this.handleErr(err);
          }
        );
    });
  }
  deletePhotoInspeccion(id_img) {
    let info = JSON.parse(localStorage.getItem("info_user"));
    const body = new HttpParams()
      .set("id_user", info.id_user)
      .set("code", info.code)
      .set("id_img", id_img);
    return new Promise((resolve, reject) => {
      this.http.post(env.API_URL + "eliminar_foto.php", body).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  login(email, password) {
    this.presentLoading();
    const data = { username: email, password: password };
    return new Promise(resolve => {
      this.http.post(env.API_URL + "user/login", data).subscribe(
        res => {
          this.loader.dismiss();
          resolve(res);
        },
        err => {
          this.loader.dismiss();
          this.handleErr(err);
        }
      );
    });
  }
  private presentLoading(msg?) {
    this.loader = this.loadingCtrl.create({
      content: msg ? msg : "Por favor, espere..."
    });
    this.loader.present();
  }
  private showAlert(title, subtitle) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ["OK"]
    });
    alert.present();
  }
  private handleError(e) {
    console.log(e);
    if (e.status) {
      switch (e.status) {
        case 0: {
          this.showAlert(
            "Error!",
            "Usted está trabajando sin internet. Revise su conexión."
          );
          break;
        }
        case 404: {
          this.showAlert(
            "Error!",
            "Recurso no encontrado. Contacte al administrador."
          );
          break;
        }
        case 500: {
          this.showAlert(
            "Error!",
            "Estamos presentando errores con los servicios. Intente más tarde."
          );
          break;
        }
        default: {
          this.showAlert("Error!", e.error.msg);
          break;
        }
      }
    } else {
      if (e.message) {
        this.showAlert("Error!", e.error.msg);
      } else {
        this.showAlert("Error!", e);
      }
    }
  }
  private handleErr(e) {
    console.log(e);
    if (e.status) {
      switch (e.status) {
        case 0: {
          this.showAlert(
            "Error!",
            "Usted está trabajando sin internet. Revise su conexión."
          );
          break;
        }
        case 401: {
          this.showAlert("Error!", "Acceso no autorizado.");
          break;
        }
        case 404: {
          this.showAlert(
            "Error!",
            "Recurso no encontrado. Contacte al administrador."
          );
          break;
        }
        case 500: {
          this.showAlert(
            "Error!",
            "Estamos presentando errores con los servicios. Intente más tarde."
          );
          break;
        }
        default: {
          this.showAlert("Error!", e.error.message);
          break;
        }
      }
    } else {
      if (e.message) {
        this.showAlert("Error!", e.error.msg);
      } else {
        this.showAlert("Error!", e);
      }
    }
  }
}
