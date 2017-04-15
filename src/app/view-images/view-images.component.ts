import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-images',
  templateUrl: './view-images.component.html',
  styleUrls: ['./view-images.component.css']
})
export class ViewImagesComponent implements OnInit {
  
  public images = [];
  constructor() { }

  ngOnInit() {
  	this.loadImages();
  	setInterval(()=> {
  		this.loadImages();
  	}, 2000);
  }

  loadImages() {
  	let storage;
  	if(storage = localStorage.getItem('imageStorage')){
  		this.images = JSON.parse(storage);
  	}
  }

  deleteImage(index){
  	this.images.splice(index, 1);
  	localStorage.setItem('imageStorage', JSON.stringify(this.images));
  }

}
