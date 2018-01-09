import { Component, NgZone, ElementRef, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
// local
import { Post } from '../../interfaces/post.interface';
import { PostService } from 'app/posts/post.service';
import { forSell, typeOfRooms, typeOfFixes, typeOfPlan, typeOfCurrency } from '../post';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms/src/model';
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
    zoom: 17
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

  postId: string;

  subject: Subject<any>;

  post: Post;

  postGroup: FormGroup;

  constructor(
    private postService: PostService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private activeRouter: ActivatedRoute,
  ) {
    this.subject = new Subject();

    this.postGroup = new FormGroup({
      accountType: new FormControl('owner', [Validators.required]),
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
        this.postId = params.id;
        this.subscription && this.subscription.unsubscribe();
      });

    if (this.postId) {
      this.postService.getPost(this.postId)
        .subscribe((post: Post) => {
          console.log('post = ', post);

          this.subject.complete();
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
    this.images.push({fileName: event.file.name, file: event.src});
  }

  // remove images from array
  onRemoved(event: any): void {
    this.images.forEach(item => {
      if (item.fileName === event.file.name) {
        this.images.splice(this.images.indexOf(item), 1);
      }
    });
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
    this.loader = true;
    Promise.all(this.uploadImages())
      .then((res: any) => {
        data.address = this.searchElementRef.nativeElement.value;
        data.lat = this.defaultData.lat;
        data.lng = this.defaultData.lng;
        data.created = + new Date();
        data.images = res;
        console.log(data);
        // save data
        // this.postService.createPost(data);
        this.loader = false;
      });
  }
}
