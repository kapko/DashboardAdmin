import { Component, NgZone, ElementRef, ViewChild } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { PostService } from 'app/posts/post.service';
import { Promise } from 'firebase/app';
import { forSell, typeOfRooms, typeOfFixes, typeOfPlan, typeOfCurrency } from '../post';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { MapsAPILoader } from '@agm/core';

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

  defaultData = {
    accountType: 'owner',
    sellingType: 'sell',
    forSell: 'room',
    fixes: 'none',
    currency: 'dollar',
    typeOfRoom: 'elite',
    plan: 'slowly',
  };

  images: ImageStructure[] = [];

  phoneMask = ['(', /[5-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  areaMask = createNumberMask({
    allowDecimal: true,
    integerLimit: 3,
    decimalSymbol: ',',
    includeThousandsSeparator: false,
    prefix: ''});

  numberMask = createNumberMask({prefix: '', integerLimit: 9});

  // google maps
  public lat: number;
  public lng: number;
  public zoom: number = 17;

  constructor(
    private postService: PostService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    //set google maps defaults
    this.lat = 42.8746212;
    this.lng = 74.5697617;
  }

  mapClicked(event: any) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }

  markerDragEnd($event: MouseEvent) {
    console.log('dragEnd', $event);
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
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
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
    const urls = [],
      tumbnails = [];

    this.images.forEach(image => {
      // upload origin pictures
      urls.push(
        this.postService
          .uploadPicture(image.fileName, image.file)
          .then(res => res.downloadURL));

      // upload tumbnails 480x480
      this.postService.thumbnailify(image.file, 480, respose => {
        tumbnails.push(
          this.postService
            .uploadPicture(`t480_${image.fileName}`, respose)
            .then(res => res.downloadURL));
      });

    });

    return [urls, tumbnails];
  }

  submitForm(data: Post): void {
    console.log(data);
  // Promise.all(this.uploadImages())
  //   .then((res: any) => {
  //     data.created = + new Date();
  //     data.images = res[0];
  //     data.tumbnails = res[1];
  //     this.postService.createPost(data);
  //   });
  }

}
