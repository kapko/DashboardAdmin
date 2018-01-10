import { Component, NgZone, ElementRef, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/first';
import 'rxjs';

// local
import { Post } from '../../interfaces/post.interface';
import { PostService } from 'app/posts/post.service';
import { forSell, typeOfRooms, typeOfFixes, typeOfPlan, typeOfCurrency } from '../post';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// firebase
import * as firebase from 'firebase';

export interface ImageStructure {
  fileName: string;
  file: string;
}

@Component({
  selector: 'app-post-create',
  templateUrl: 'post-create.html',
})

export class PostCreateComponent {
  @ViewChild('search')
  public searchElementRef: ElementRef;

  // DEFAULT OPTIONS
  forSell = forSell;
  typeOfRooms = typeOfRooms;
  typeOfFixes = typeOfFixes;
  typeOfPlan = typeOfPlan;
  typeOfCurrency = typeOfCurrency;
  loader: boolean = false;

  defaultData = {
    lat: 42.8746212,
    lng: 74.5697617,
    zoom: 13,
    images: []
  };

  images: ImageStructure[] = [];

  phoneMask = ['(', /[5-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  areaMask = createNumberMask({
    allowDecimal: true,
    integerLimit: 3,
    decimalSymbol: ',',
    includeThousandsSeparator: false,
    prefix: ''
  });

  numberMask = createNumberMask({prefix: '', integerLimit: 9});

  subscription: Subscription;

  uid: string;

  postKey: string;

  postGroup: FormGroup;

  constructor(
    private postService: PostService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private activeRouter: ActivatedRoute,
  ) {
    this.defaultData.images = [];

    this.postGroup = new FormGroup({
      accountType: new FormControl('agent', [Validators.required]),
      sellingType: new FormControl('sell', [Validators.required]),
      forSell: new FormControl('', [Validators.required]),
      typeOfRoom: new FormControl(''),
      flatCount: new FormControl('', [Validators.required]),
      area: new FormControl('', [Validators.required]),
      areaOfHouse: new FormControl(''),
      floor: new FormControl('', [Validators.required]),
      floorOf: new FormControl(''),
      fixes: new FormControl('none'),
      address: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      currency: new FormControl('dollar'),
      typeOfPlan: new FormControl(''),
      whatsapp: new FormControl(''),
      extraPhone: new FormControl(''),
      phone: new FormControl('', [Validators.required]),
    });

    // get post id
    this.subscription = this.activeRouter.params
      .subscribe(params => {
        this.uid = params.id;
        this.subscription && this.subscription.unsubscribe();
      });

    if (this.uid) {
      this.postService
        .getPost(this.uid)
        .first()
        .subscribe((post: Post) => {
          this.postKey = post.$key;
          this.defaultData.lat = post.lat;
          this.defaultData.lng = post.lng;
          this.defaultData.zoom = 17;
          if (post.images) { this.defaultData.images = post.images; }
          this.postGroup.controls['accountType'].setValue(post.accountType);
          this.postGroup.controls['sellingType'].setValue(post.sellingType);
          this.postGroup.controls['forSell'].setValue(post.forSell);
          this.postGroup.controls['typeOfRoom'].setValue(post.typeOfRoom);
          this.postGroup.controls['flatCount'].setValue(post.flatCount);
          this.postGroup.controls['area'].setValue(post.area);
          this.postGroup.controls['areaOfHouse'].setValue(post.areaOfHouse);
          this.postGroup.controls['floor'].setValue(post.floor);
          this.postGroup.controls['floorOf'].setValue(post.floorOf);
          this.postGroup.controls['fixes'].setValue(post.fixes);
          this.postGroup.controls['address'].setValue(post.address);
          this.postGroup.controls['description'].setValue(post.description);
          this.postGroup.controls['price'].setValue(post.price);
          this.postGroup.controls['currency'].setValue(post.currency);
          this.postGroup.controls['typeOfPlan'].setValue(post.typeOfPlan);
          this.postGroup.controls['whatsapp'].setValue(post.whatsapp);
          this.postGroup.controls['extraPhone'].setValue(post.extraPhone);
          this.postGroup.controls['phone'].setValue(post.phone);

        });
    }
  }

  mapClicked(event: any) {
    this.defaultData.lat = event.coords.lat;
    this.defaultData.lng = event.coords.lng;
  }

  markerDragEnd(event: any) {
    this.defaultData.lat = event.coords.lat;
    this.defaultData.lng = event.coords.lng;
  }

  ngOnInit() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address'],
        componentRestrictions: {country: "kgz"}
      });

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set lat, lng and zoom
          this.defaultData.lat = place.geometry.location.lat();
          this.defaultData.lng = place.geometry.location.lng();
        });
      });
    }); // mapsAPILoader
  }

  // upload files
  onUploadFinished(event: any): void {
    this.images.push({fileName: `${event.file.name}-${Date.now()}`, file: event.src});
  }

  // remove images from array
  onRemoved(event: any): void {
    // clean image Array [{flieName, fileBase64}]
    if (this.images && this.images.length) {
      this.images.forEach((item: any) => {
        if (item.fileName.indexOf(event.file.name) >= 0) {
          this.images.splice(this.images.indexOf(item), 1);
        }
      });
    }

    // remove filename from downloaded pictures arrray[fileName]
    if (this.uid) {
      let fileName = firebase.storage().refFromURL(event.file.name).name;
      this.postService.deletePicture(fileName);

      this.defaultData.images.forEach(item => {
        if (item.indexOf(event.file.name) >= 0) {
          this.defaultData.images.splice(this.images.indexOf(item), 1);
        }
      });
    }
  }

  // return promise of array
  uploadImages(): Array<any> {
    const urls = [];

    this.images.forEach(image => {
      // upload origin pictures
      urls.push(
        this.postService
          .uploadPicture(image.fileName, image.file)
          .then(res => res.downloadURL)
        );
    });

    return urls;
  }

  submitForm(data: Post): void {
    Promise.all(this.uploadImages())
      .then((res: any) => {
        data.address = this.searchElementRef.nativeElement.value;
        data.lat = this.defaultData.lat;
        data.lng = this.defaultData.lng;
        data.created = + new Date();
        data.images = (this.defaultData.images && this.defaultData.images.length)
        ? res.concat(this.defaultData.images) : res;
        // save data
        console.log(data);
        if (!this.uid) {
          this.postService.createPost(data);
        } else {
          this.postService.updatePost(data, this.postKey);
        }
      });
  }

  // submitForm(data: Post): void {
  //   this.loader = true;
  //   Promise.all(this.uploadImages())
  //     .then((res: any) => {
  //       data.address = this.searchElementRef.nativeElement.value;
  //       data.lat = this.defaultData.lat;
  //       data.lng = this.defaultData.lng;
  //       data.created = + new Date();
  //       data.images = (this.defaultData.images && this.defaultData.images.length)
  //       ? res.concat(this.defaultData.images) : res;
  //       // save data
  //       if (!this.uid) {
  //         this.postService.createPost(data);
  //       } else {
  //         this.postService.updatePost(data, this.postKey);
  //       }
  //       this.loader = false;
  //       this.router.navigate(['/admin/posts']);
  //     });
  // }
}
