import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import axios from 'axios';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  datatype: any = '';
  image: any = '';
  result: any = {};
  loading: any = false;
  video: any = '';
  video1: any = '';
  loading1: any = false;
  loading2: any = false;

  getdatatype(text: any) {
    this.datatype = text;
  }
  openclass() {
    $('.inputfile').click();
  }
  openclass1() {
    $('.upvd').click();
  }
  openclass2() {
    $('.upvd1').click();
  }

  downloadCsv(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
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
        this.loading = false;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  hexToBase64(str: any) {
    return btoa(
      String.fromCharCode.apply(
        null,
        str
          .replace(/\r|\n/g, '')
          .replace(/([\da-fA-F]{2}) ?/g, '0x$1 ')
          .replace(/ +$/, '')
          .split(' ')
      )
    );
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
        this.video = response.data;
        this.loading1 = false;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async uploadvideo1(event: any) {
    this.loading2 = true;
    this.video1 = event.target.files[0];
    let formData: FormData = new FormData();
    formData.append('videos', this.video1);
    await axios
      .post('http://35.212.140.235:3001/mediapipe', formData)
      .then(async (response) => {
        let a = response.data;
        this.downloadCsv(a, 'example.csv');
        this.loading2 = false;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  ngOnInit(): void {}
}
