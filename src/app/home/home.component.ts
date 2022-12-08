import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  datatype: any = "";
  image: any ="";
  result: any = {};
  loading : any = false;
  video: any = "";
  loading1 : any = false;
  

  getdatatype(text: any) {
    this.datatype = text;
  }
  openclass() {
    $('.inputfile').click();
  }
  openclass1() {
    $('.upvd').click();
  }
  
  async change(event: any) {
    this.loading = true;
    this.image = event.target.files[0];
    let formData: FormData = new FormData();
    const data = {
      datatype: this.datatype,
    };
    formData.append('image', this.image);
    formData.append('data', JSON.stringify(data));
    await axios
      .post('http://35.212.140.235:3001/yolomodel', formData)
      .then(async (response) => {
        this.image = 'data:;base64,' + response.data['image'];
        this.loading= false;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
   hexToBase64(str : any ) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}
  constructor() {}

  async uploadvideo(event: any) {
    this.loading1 = true;
    this.video = event.target.files[0];
    let formData: FormData = new FormData();
  
    formData.append('videos', this.video);
 
    await axios
      .post('http://35.212.140.235:3001/poseestimation', formData)
      .then(async (response) => {
        this.video= response.data
        this.loading1= false;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
 



  ngOnInit(): void {}
}

