import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nickname='';

  constructor( private socket : Socket , public navCtrl : NavController, public router : Router) {}

     
      

  joinChat(){

    this.socket.connect();
    this.socket.emit('set-nickname',this.nickname);
    // this.navCtrl.navigateForward('chat-room', {nickname : this.nickname});
    console.log( {nickname : this.nickname});
    
    this.router.navigate(['chat-room', {nickname : this.nickname}]);
  }
}
