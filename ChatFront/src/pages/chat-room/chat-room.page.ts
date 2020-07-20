import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ToastController, NavParams, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit {
  public navParams = new NavParams

  messages =[];
  nickname='';
  message='';

  constructor( private socket: Socket, private toastCtrl: ToastController, alertCtrl : AlertController) {
    this.nickname= this.navParams.get('nickname');

    this.getMessages().subscribe(message => {
      this.messages.push(message);
    });

    this.getUsers().subscribe(data => {
      let user = data['user'];
      // console.log(data);
      

      if(data['event'] === 'left'){
          this.showToast('User left: ' + user);
      }else{
        this.showToast('User joined: ' + user);
      }
    });
   }

  ngOnInit() {
  }

  ionViewWillLeave(){
    this.socket.disconnect();
  }
 
  getUsers(){
    let observable = new Observable(  observe=> {
        this.socket.on('users-changed', data => {
          observe.next(data);
        });
 
      });

    return observable;
}

  sendMessage(){
    this.socket.emit('add-message', {text: this.message});
    this.message ='';
  }

  getMessages(){
      let observable = new Observable(  observe=> {
          this.socket.on('message', data => {
            observe.next(data);
          });
      });

      return observable;
  }

 async showToast(msg){
  let toast = await this.toastCtrl.create({
    message: msg,
    position: 'top',
    duration: 2000
  });
  toast.present();
  }

}
