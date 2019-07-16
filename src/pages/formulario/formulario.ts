import { Component, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-formulario',
  templateUrl: 'formulario.html',
})
export class FormularioPage {
    data: any;
    formData: FormGroup;
    pointRange: any = [
        {value:1,text:'1'},
        {value:2,text:'2'},
        {value:3,text:'3'},
        {value:4,text:'4'},
        {value:5,text:'5'}
    ];
    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, formBuilder: FormBuilder, private dataService: DataProvider, public element:ElementRef){
        this.data = this.navParams.data;
        this.formData = formBuilder.group({
            dueno_nombre: [this.data.dueno_nombre ? this.data.dueno_nombre : ''],
            dueno_apellido: [this.data.dueno_apellido ? this.data.dueno_apellido : ''],
            marca: [this.data.marca ? this.data.marca : ''],
            modelo: [this.data.modelo ? this.data.modelo : ''],
            cilindrada: [this.data.cilindrada ? this.data.cilindrada : ''],
            ano: [this.data.ano ? this.data.ano : ''],
            kilometraje: [this.data.kilometraje ? this.data.kilometraje : ''],
            patente: [this.data.patente ? this.data.patente : ''],
            nchasis: [this.data.nchasis ? this.data.nchasis : ''],
            revision_marca: [this.data.revision_marca ? this.data.revision_marca : 0],
            seguro_obligatorio: [(this.data.seguro_obligatorio == 0) ? false : true],
            padron: [(this.data.padron == 0) ? false : true],
            permiso_circulacion: [(this.data.permiso_circulacion == 0) ? false : true],
            analisis_gases: [(this.data.analisis_gases == 0) ? false : true],
            revision_tecnica: [(this.data.revision_tecnica == 0) ? false : true],
            manual_propietario: [(this.data.manual_propietario == 0) ? false : true],
            libro_mantenciones: [(this.data.libro_mantenciones == 0) ? false : true],
            transmision: [this.data.transmision ? this.data.transmision : ''],
            combustible: [this.data.combustible ? this.data.combustible : ''],
            carroceria: [this.data.carroceria ? this.data.carroceria : ''],
            traccion: [this.data.traccion ? this.data.traccion : ''],
            direccion: [this.data.direccion ? this.data.direccion : ''],
            aire_acondicionado: [(this.data.aire_acondicionado == 0) ? false : true],
            climatizador: [(this.data.climatizador == 0) ? false : true],
            alarma: [(this.data.alarma == 0) ? false : true],
            cierre_centralizado: [(this.data.cierre_centralizado == 0) ? false : true],
            vidrios_electricos: [(this.data.vidrios_electricos == 0) ? false : true],
            asiento_cuero: [(this.data.asiento_cuero == 0) ? false : true],
            velocidad_crucero: [(this.data.velocidad_crucero == 0) ? false : true],
            radio_desmontable: [(this.data.radio_desmontable == 0) ? false : true],
            bluetooth: [(this.data.bluetooth == 0) ? false : true],
            volante_regulable: [(this.data.volante_regulable == 0) ? false : true],
            corridas_asiento: [(this.data.corridas_asiento == 0) ? false : true],
            llantas_aleacion: [(this.data.llantas_aleacion == 0) ? false : true],
            neblineros: [(this.data.neblineros == 0) ? false : true],
            laminas_seguridad: [(this.data.laminas_seguridad == 0) ? false : true],
            sunroof: [(this.data.sunroof == 0) ? false : true],
            techo_panoramico: [(this.data.techo_panoramico == 0) ? false : true],
            espejos_electricos: [(this.data.espejos_electricos == 0) ? false : true],
            espejos_abatibles: [(this.data.espejos_abatibles == 0) ? false : true],
            espejos_rigidos: [(this.data.espejos_rigidos == 0) ? false : true],
            abs: [(this.data.abs == 0) ? false : true],
            airbags: [(this.data.airbags == 0) ? false : true],
            control_traccion: [(this.data.control_traccion == 0) ? false : true],
            control_estabilidad: [(this.data.control_estabilidad == 0) ? false : true],
            camara_retroceso: [(this.data.camara_retroceso == 0) ? false : true],
            sensor_estacionamiento: [(this.data.sensor_estacionamiento == 0) ? false : true],
            cinturon_seguridad: [(this.data.cinturon_seguridad == 0) ? false : true],
            sistema_anclaje: [(this.data.sistema_anclaje == 0) ? false : true],
            llave_encendido: [(this.data.llave_encendido == 0) ? false : true],
            segunda_llave: [(this.data.segunda_llave == 0) ? false: true],
            rueda_repuesto: [(this.data.rueda_repuesto == 0) ? false : true],
            gata: [(this.data.gata == 0) ? false : true],
            llave_rueda: [(this.data.llave_rueda == 0) ? false : true],
            kit_seguridad: [(this.data.kit_seguridad == 0) ? false : true],
            antena: [(this.data.antena == 0) ? false : true],
            sistema_audio: [(this.data.sistema_audio == 0) ? false : true],
            ext1: [this.data.ext1 ? this.data.ext1 : ''],
            ext2: [this.data.ext2 ? this.data.ext2 : ''],
            ext3: [this.data.ext3 ? this.data.ext3 : ''],
            ext4: [(this.data.ext4 == 0) ? false : true],
            ext5: [this.data.ext5 ? this.data.ext5 : ''],
            ext6: [(this.data.ext6 == 0) ? false : true],
            ext7: [(this.data.ext7 == 0) ? false : true],
            ext8: [(this.data.ext8 == 0) ? false : true],
            ext9: [(this.data.ext9 == 0) ? false : true],
            ext10: [(this.data.ext10 == 0) ? false : true],
            ext11: [this.data.ext11 ? this.data.ext11 : ''],
            ext12: [this.data.ext12 ? this.data.ext12 : ''],
            ext13: [(this.data.ext13 == 0) ? false : true],
            ext14: [(this.data.ext14 == 0) ? false : true],
            ext15: [this.data.ext15 ? this.data.ext15 : ''],
            ext16: [this.data.ext16 ? this.data.ext16 : ''],
            ext17: [this.data.ext17 ? this.data.ext17 : ''],
            ext18: [this.data.ext18 ? this.data.ext18 : ''],
            ints1: [this.data.ints1 ? this.data.ints1 : ''],
            ints2: [this.data.ints2 ? this.data.ints2 : ''],
            ints3: [this.data.ints3 ? this.data.ints3 : ''],
            ints4: [this.data.ints4 ? this.data.ints4 : ''],
            ints5: [this.data.ints5 ? this.data.ints5 : ''],
            ints6: [(this.data.ints6 == 0) ? false : true],
            ints7: [(this.data.ints7 == 0) ? false : true],
            ints8: [(this.data.ints8 == 0) ? false : true],
            ints9: [(this.data.ints9 == 0) ? false : true],
            ints10: [this.data.ints10 ? this.data.ints10 : ''],
            ints11: [this.data.ints11 ? this.data.ints11 : ''],
            ints12: [this.data.ints12 ? this.data.ints12 : ''],
            ints13: [this.data.ints13 ? this.data.ints13 : ''],
            motor1: [this.data.motor1 ? this.data.motor1 : ''],
            motor2: [this.data.motor2 ? this.data.motor2 : ''],
            motor3: [this.data.motor3 ? this.data.motor3 : ''],
            motor4: [this.data.motor4 ? this.data.motor4 : ''],
            motor5: [(this.data.motor5 == 0) ? false : true],
            motor6: [this.data.motor6 ? this.data.motor6 : ''],
            motor7: [this.data.motor7 ? this.data.motor7 : ''],
            motor8: [this.data.motor8 ? this.data.motor8 : ''],
            motor9: [this.data.motor9 ? this.data.motor9 : ''],
            lectura_escaner: [this.data.lectura_escaner ? this.data.lectura_escaner : ''],
            motorfun1: [this.data.motorfun1 ? this.data.motorfun1 : ''],
            motorfun2: [(this.data.motorfun2 == 0) ? false : true],
            motorfun3: [(this.data.motorfun3 == 0) ? false : true],
            motorfun4: [(this.data.motorfun4 == 0) ? false : true],
            motorfun5: [this.data.motorfun5 ? this.data.motorfun5 : ''],
            motorfun6: [this.data.motorfun6 ? this.data.motorfun6 : ''],
            motorfun7: [this.data.motorfun7 ? this.data.motorfun7 : ''],
            motorfun9: [this.data.motorfun9 ? this.data.motorfun9 : ''],
            comentarios: [this.data.comentarios ? this.data.comentarios : ''],
            finalizar: [this.data.finalizar ? this.data.finalizar : ''],
        });
    }
    close(data?){
        this.viewCtrl.dismiss(data);
    }
    blur(campo, valor){
        if(typeof valor == 'boolean'){
            valor = valor ? 1 : 0;
        }
        this.dataService.updateDataInspeccion({valor:valor,campo:campo,id_ins:this.data.id_ins}).then(data => {
            if(data["op"] == 1){
                //Poner mensajes de error de con toast
            }
        });
    }
    ionViewDidLoad() {
    }
    protected autoSizeDescription(): void {
		let textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
		textArea.style.overflow = 'hidden';
		textArea.style.height 	= 'auto';
		textArea.style.height 	= textArea.scrollHeight + 'px';
		return;
    }
}
