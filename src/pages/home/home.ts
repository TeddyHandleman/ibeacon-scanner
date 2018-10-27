import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';

import {
  Beacon,
  IBeacon,
  IBeaconDelegate,
  IBeaconPluginResult
} from '@ionic-native/ibeacon';
import { BLE } from '@ionic-native/ble';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';


import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private _beacons: Beacon[] = [];
  private _bleDevices = [];
  private _connectedDevices = [];
  private _unpairedDevices = [];
  private _delegate: IBeaconDelegate;

  constructor(
    private ble: BLE,
    private bs: BluetoothSerial,
    private ibeacon: IBeacon,
    private navCtrl: NavController,
    private ngZone: NgZone
  ) {}

  ionViewDidEnter() {
    this.initialize();
  }

  get beacons(): Beacon[] {
    return this._beacons.sort((a, b) => b.rssi - a.rssi);
  }

  get bleDevices(): any[] {
    return this._bleDevices;
  }

  get connectedDevices(): any[] {
    return this._connectedDevices;
  }

  get unpairedDevices(): any[] {
    return this._unpairedDevices;
  }

  scanForDevices(): any {
    console.log('SCANNING!');
    this.bs.list()
      .then(devices => {
        console.log('Scanned devices:', devices);
        this.ngZone.run(() => this._connectedDevices = devices)
      });
  }


  private initialize() {
    // Request permission to use location on iOS
    this.ibeacon.requestAlwaysAuthorization();
    // create a new delegate and register it with the native layer
    this._delegate = this.ibeacon.Delegate();

    this._delegate
      .didRangeBeaconsInRegion()
      .subscribe((data: IBeaconPluginResult) => {
        this.ngZone.run(() => this._beacons = data.beacons);
      });
    this.enterRegion();
  }

  private  enterRegion() {
    const region = this.ibeacon.BeaconRegion('pO', 'B9407F30-F5F8-466E-AFF9-25556B57FE6D');

    this.ibeacon.startRangingBeaconsInRegion(region)
      .then(
        data => console.log('Native layer received the request to monitoring:', data),
        error => console.error('Native layer failed to begin monitoring: ', error)
      );
  }

  // private connectedPeripherals(): void {}

  // private scanForBLEDevices(): void {
  //   this.ble.startScan([])
  //     .subscribe((device) => {
  //
  //       let idx = this._bleDevices.findIndex(bleDevice => {
  //         return bleDevice.id === device.id
  //       });
  //
  //       if (idx < 0) {
  //         this._bleDevices.push(device);
  //       } else {
  //         this._bleDevices[idx] === device;
  //       }
  //
  //       this._bleDevices
  //         .sort((a, b) => b.rssi - a.rssi)
  //         .filter(device => device.rssi < 127);
  //     });
  // }

  private sortByRssi(a, b) {
    return b.rssi - a.rssi
  }



}
