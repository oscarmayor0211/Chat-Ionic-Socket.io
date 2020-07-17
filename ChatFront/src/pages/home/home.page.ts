import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nickname='';

  constructor( private socket : Socket , public navCtrl : NavController) {}


  joinChat(){
    this.socket.connect();
    this.socket.emit('set-nickname',this.nickname);
    this.navCtrl.navigateRoot('chat-room');
  }
}
