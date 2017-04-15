import { Component, ChangeDetectorRef, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})

export class UploaderComponent {
  
  constructor( private changeDetectorRef: ChangeDetectorRef ) {
  }

  public previewImage: string = '';
  public size_before: string = '';
  public size_after: string = '';
  public img: any = {};
  public success: boolean = false;
  public sizeOverLimit: boolean = false;


  ngOnInit() {
  	this.checkStorageSize();
  }

  checkStorageSize(){
  	let storage;
  	if(storage = localStorage.getItem('imageStorage')){
  		if(storage.length/1024 >= 4096){
  			this.sizeOverLimit = true;
  		}
  	}
  }
  
  addImage(){
    let storage;
    //check if there is already storage
    if(storage = localStorage.getItem('imageStorage')){
    	storage = JSON.parse(storage);
    } else {
    	storage = [];
    }

    //storing image data in an object
	let temp = {imgSrc : this.previewImage, title: this.img.title, desc : this.img.desc};
	//push it to the array and stringify it then store it again 
	storage.push(temp);
	localStorage.setItem("imageStorage", JSON.stringify(storage));

	//empty the fields
	this.img.title = '';
	this.img.desc = '';
	this.previewImage = '';
	//message to the user
	this.success = true;
	this.checkStorageSize();
  }

  addTag(input){
  	if(input !== ''){
		var canvas = document.createElement("canvas");
		var img = document.createElement("img");
		img.src = this.previewImage;

		// Set the canvas to the new calculated dimensions
		canvas.width = img.width;
		canvas.height = img.height;

		var ctx = canvas.getContext("2d");  

		ctx.drawImage(img, 0, 0);
		ctx.font = "30px Arial";
		ctx.fillText(input.value,100,50);
		this.previewImage = canvas.toDataURL('image/jpeg');
  	}
  }

  // This is called when the user selects new files from the upload button
  fileChange(input){
    this.readFile(input.files);
  }
  
  readFile(file){

        let reader = new FileReader();

        //when reader is loaded
        reader.onload = () => {

	        let img = document.createElement("img");
	        img.src = reader.result;
	        // let canvas = document.getElementById("myCanvas");
	        // let context = canvas.nativeElement.getContext("2d");
	       
	        // Send this img to the resize function (and wait for callback)
	        this.resize(img, 400, 400, (resized_jpeg, before, after)=>{

	          // size in bytes before and after resize
	        	this.size_before = before;
	        	this.size_after = after;

		        this.previewImage = resized_jpeg;

		        this.changeDetectorRef.detectChanges();
	        });

    	}

    
    // Read the file
    reader.readAsDataURL(file[0]);
  }
  
  resize(img, MAX_WIDTH:number, MAX_HEIGHT:number, callback){
    // This will wait until the img is loaded before calling this function
    return img.onload = () => {
      // Get the images current width and height
      var width = img.width;
      var height = img.height;
      
      // Set the WxH to fit the Max values (but maintain proportions)
      if (width > height) {
          if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
          }
      } else {
          if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
          }
      }
      
      // create a canvas object
      var canvas = document.createElement("canvas");
    
      // Set the canvas to the new calculated dimensions
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");  

      ctx.drawImage(img, 0, 0,  width, height); 
      
      // Get this encoded as a jpeg
      // IMPORTANT: 'jpeg' NOT 'jpg'
      var dataUrl = canvas.toDataURL('image/jpeg');
      
      // callback with the results
      callback(dataUrl, img.src.length, dataUrl.length);
    };
  }
}