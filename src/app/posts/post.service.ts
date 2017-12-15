// import { Injectable } from '@angular/core';
// import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
// import { Observable } from 'rxjs';;

// import { Query } from '../interfaces/query';
// import { Post } from './post.model';
// import { PostReport } from './post-report.model';
// import { Comment } from './post-comments/post-comments.model';

// @Injectable()
// export class PostService {

//   private allPosts = '/all-posts/';

//   /**
//    * path for keeping offensive posts
//    */
//   private offensivePosts = '/offensive-posts/';

//   /**
//    * Firebase path for o
//    */
//   postsPath = '/posts/';

//   notificationPath = '/notifications/';

//   /**
//    * Firebase path for hidden posts
//    * @pattern: /hidden-posts/$userId/$postId
//    */
//   private hiddenPostsPath = '/hidden-posts/';

//   /**
//    * Firebase path for users
//    */
//   usersPath = '/users/';

//   /**
//    * Firebase path for post reports
//    */
//   postReportsPath = '/reports/posts/';

//   /**
//    * Firebase path for post comments
//    */
//   commentPath = '/comments/';
//   /**
//    * Firebase path for list posts
//    * @pattern: /lists/$userId
//    */
//   private listPostsPath = '/posts/';

//   public post: Post;

//   constructor(private af: AngularFire) {}

//   getListPosts(listId: string = '-Ki0ndJkbKvC7eK4qhM7', uid: string = '0f540bef7de1a67be107709b52b09c0e'): Observable<Post[]> {
//     this.af.database.list(this.listPostsPath + uid + '/' + listId).forEach(items => {console.log(items);});
//     return this.af.database.list(this.listPostsPath + uid + '/' + listId).flatMap(items => this.replaceWithPosts(items));
//   }

//   /**
//    * Replaces ids with real posts
//    */
//   replaceWithPosts(items: any[], field: string = '$key'): Observable<Post[]> {
//     let observables = [];

//     for (let item of items) {
//       observables.push(
//         this.getPost(item[field]).take(1)
//       );
//     }

//     return Observable.forkJoin(...observables)
//       .defaultIfEmpty([]);
//   }

//   /**
//    * Returns post by id
//    */
//   getPost(id: string): FirebaseObjectObservable<Post> {
//     return this.af.database.object(this.allPosts + id);
//   }

//   /**
//    * Returns post by id from PATH /all-posts/
//    */
//   getPostByIdFromPosts(postId: string): FirebaseObjectObservable<Post> {
//     return this.af.database.object(this.allPosts + postId);
//   }

//   hidePost(post: Post): firebase.Promise<void> {
//     return this.af.database
//       .object(this.postsPath + post.userId + '/' + post.$key + '/hidden/')
//       .set(true);
//   }

//   unhidePost(post: Post): firebase.Promise<void> {
//     return this.af.database
//       .object(this.postsPath + post.userId + '/' + post.$key + '/hidden/')
//       .set(null);
//   }

//   // move post to offensive DB and hide TRUE for show on FRONTEND
//   hidePostModerationType(post: Post): void {
//     let key = post.$key;

//     delete post.$key;
//     post.hidden = true;
//     post.moderationType = 'offensive';

//     this.af.database
//       .object(this.allPosts + key)
//       .set(post);

//     this.af.database
//       .object(this.postsPath + post.userId + '/' + key)
//       .set(post);
//   }

//   // hide report post and move to Offensive
//   hideReportPost(post: Post): void {
//     let key = post.$key;

//     delete post.$key;
//     post.hidden = true;
//     post.moderationType = 'offensive';
//     // splice from reports DB
//     this.af.database
//       .object(this.postReportsPath + post.reportedFrom + '/' + key)
//       .set(null);

//     if (!post.reportedFrom) return;

//     this.af.database
//       .object(this.allPosts + key)
//       .set(post);

//     this.af.database
//       .object(this.postsPath + post.userId + '/' + key)
//       .set(post);
//   }

//   // move post to offensive DB and hide FALSE for hide on FRONTEND
//   approveModerationType(post: Post): void {
//     let key = post.$key;

//     delete post.$key;
//     post.hidden = false;
//     post.moderationType = null;

//     this.af.database.object(this.allPosts + key).set(post);
//     this.af.database.object(this.postsPath + post.userId + '/' + key).set(post);
//   }

//   // move post to offensive DB and hide FALSE for hide on FRONTEND
//   approveReportPost(post: Post): void {
//     let key = post.$key;

//     delete post.$key;
//     post.hidden = false;
//     post.moderationType = null;
//     // splice from reports DB
//     this.af.database
//       .object(this.postReportsPath + post.reportedFrom + '/' + key)
//       .set(null);

//     this.af.database
//       .object(this.postsPath + post.userId + '/' + key)
//       .set(post);
//   }

//   getPosts(userId: string): Observable<Post[]> {
//     return this.af.database.list(this.postsPath + '/' + userId);
//   }

//   getAllPosts(): FirebaseListObservable<Post[]> {
//     return this.af.database.list(this.allPosts, {
//       query: {
//         orderByChild: 'moderationType',
//         equalTo: null
//       }
//     });
//   }

//   // get all posts from  PATH  ===> /all-posts/
//   getOffensivePost(args): Observable<Post[]> {
//     return this.af.database.list(this.allPosts, {
//       query: {
//         orderByChild: 'moderationType',
//         equalTo: 'offensive' }
//     }).flatMap((items: Post[]) => {
//       let observables = [];
//       items.forEach(item => {
//         observables.push(
//           this.af.database.object(this.postsPath + item.userId + '/' + item.$key)
//         );
//       })
//       return Observable.combineLatest(...observables)
//         .map(posts => {
//           items.forEach((item, key) => {
//             if (item.hasOwnProperty('data')) {
//               items[key] = this.formatPostData(posts[key]);
//             }
//           });
//           return items;
//         });
//     });
//   }

//   getOffensiveAvatars(): any {
//     return this.af.database
//       .list('/offensive-avatars/')
//       .flatMap(offensiveAvatars => {
//         let observables = [];

//         if (!offensiveAvatars.length) {
//           return Observable.of([]);
//         }

//         for (let i in offensiveAvatars) {
//           let observable = this.af.database
//               .object(this.usersPath + offensiveAvatars[i]['$key'])
//               .take(1)
//               .map(data => {
//                 return Object.assign({}, {
//                   avatar: offensiveAvatars[i]['$value'],
//                   $key: offensiveAvatars[i]['$key']
//                 }, data);
//               })
//           observables.push(observable);
//         }

//         return Observable.forkJoin(observables);
//       })
//   }

//   formatPostData(post) {
//     post.hidden = false;
//     post.mediaType = post.image ? 'image' : (post.video ? 'video' : 'text');
//     post.imageLabels = post.mediaType == 'image' && post.labels ? post.labels.join(', ') : '';
//     post.videoLabels = post.mediaType == 'video' && post.labels ? post.labels.join(', ') : '';
//     post.transcription = post.transcription ? post.transcription : '';
//     post.googleCloudVideolabel = post.googleCloudVideolabels ? post.googleCloudVideolabels.map((data)=>data.description).join(', ') : '';
//     post.safeSearchAnnotation = post.safeSearchAnnotation ? post.safeSearchAnnotation : '';
//     post.webEntities = post.webEntities ? post.webEntities : '';
//     post.magnitude = post.magnitude ? parseFloat(post.magnitude).toFixed(2) : (post.score === 0) ? 0 : '';
//     post.score = post.score ? parseFloat(post.score).toFixed(2) : (post.score === 0) ? 0 : '';
//     post.imageLogos = post.mediaType == 'image' && post.logos ? post.logos.join(', ') : '';
//     post.imageText = post.mediaType == 'image' && post.imageText && (post.imageText instanceof Array) ? post.imageText.join(', ') : '';

//     return post;
//   }

//   getReports(postId: string): Observable<PostReport[]> {
//     return this.af.database
//     .list(this.postReportsPath)
//     .map(
//       allReports => {
//         let reports = [];
//         for (let index in allReports) {
//           reports[allReports[index].$key] = allReports[index];
//         }
//         return this.filterPostReports(postId, reports);
//       }
//     )
//     .flatMap((items: PostReport[]) => {
//       let observables = [];
//       items.forEach(item => {
//         observables.push(
//           this.af.database.object(this.usersPath + item.reporterUserId)
//         );
//       })
//       return Observable.combineLatest(...observables)
//         .map(users => {
//           items.forEach((item, key) => {
//             item['reporterUser'] = users[key];
//           });

//           return items;
//         });
//     });
//   }

//   getNeedToReviewPosts(): Observable<Post[]> {
//     return this.af.database.list(this.allPosts, {
//       query: {
//         orderByChild: 'moderationType',
//         equalTo: 'need_to_review'
//       }
//     }).flatMap((items: Post[]) => {
//       let observables = [];
//       items.forEach(item => {
//         observables.push(
//           this.af.database.object(this.postsPath + item.userId + '/' + item.$key)
//         );
//       })
//       return Observable.combineLatest(...observables)
//         .map(posts => {
//           items.forEach((item, key) => {
//             if (item.hasOwnProperty('data')) {
//               items[key] = this.formatPostData(posts[key]);
//             }
//           });
//           return items;
//         });
//     }).flatMap((items: Post[]) => {
//       let observables = [];
//       items.forEach(item => {
//         observables.push(
//           this.af.database.object(this.usersPath + item.userId)
//         );
//       })
//       return Observable.combineLatest(...observables)
//         .map(users => {
//           items.forEach((item, key) => {
//             item['user'] = users[key];
//           });
//           return items;
//         });
//     })
//   }

//   getReportedPosts(): any {
//     return this.af.database.list(this.postReportsPath)
//       .map(items => {
//         let reports = [];
//         items.forEach(element => {
//           for (let i in element) {
//             element[i].keys = i;
//             reports.push(element[i]);
//           }
//         });
//         return reports;
//       })
//       .flatMap(items => {
//         let observables = [];
//         items.forEach(element => {
//           observables.push(this.af.database.object(this.allPosts + element.keys).take(1));
//         });
//         return Observable
//           .combineLatest(...observables)
//           .do(els => {
//             items.forEach((e, index) => {
//               els[index]['cause'] =        items[index].cause;
//               els[index]['reportedFrom'] = items[index].fromUser;
//               els[index]['email'] =        items[index].userId;
//             });
//             return els;
//           });
//       });
//   }

//   deleteReport(report: PostReport): firebase.Promise<void> {
//     return this.af.database
//       .object(this.postReportsPath + report.reporterUserId + '/' + report.postId)
//       .set(null);
//   }

//   private filterPostReports(postId: string = null, allReports: PostReport[]) {
//     let postReports = [];

//     for (let userKey in allReports) {
//       let userReports = allReports[userKey];
//       for (let postKey in userReports) {
//         if (postKey == postId || postId === null) {
//           let report: PostReport = userReports[postKey];
//           report.reporterUserId = userKey;
//           report.postId = postKey;
//           postReports.push(report);
//         }
//       }
//     }

//     return postReports;
//   }

//   /**
//      * Returns comments
//      */
//     getComments(userId: string, postId: string): FirebaseListObservable<any> {
//         return this.af.database.list(this.commentPath + userId + '/' + postId);
//     }

//     /**
//      * Returns post by => ID
//      */
//     getPostByComment(userId: string): FirebaseObjectObservable<Post> {
//         return this.af.database.object(this.commentPath + userId);
//     }

//     /**
//      * Hide comment by ID
//      */
//     hideComment(userId: string, postId: string, commentId: string): void {
//       this.af.database
//         .object(this.commentPath + userId + '/' + postId + '/' + commentId + '/hidden')
//         .set(true);
//     }

//     /**
//      * Show comment by ID
//      */
//     unhideComment(userId: string, postId: string, commentId: string): void {
//       this.af.database
//         .object(this.commentPath + userId + '/' + postId + '/' + commentId + '/hidden')
//         .set(null);
//     }

//     /**
//      * Remove post by ID
//      */
//     deletePost(userId: string, postId: string) {
//       return this.af.database
//         .object(this.postsPath + userId + '/' + postId)
//         .set(null);
//     }

//     /**
//      * Move post from offensive to All post!
//      */
//     publishPost(post: Post): void {
//       delete post['moderationType'];
//       post.hidden = false;

//       this.af.database
//         .object(this.allPosts + post.$key)
//         .set(post);

//       this.af.database
//         .object(this.postsPath + post.userId + '/' + post.$key)
//         .set(post);

//       this.af.database
//         .list(this.notificationPath + post.userId)
//         .push({
//           userId: 'admin',
//           created: + new Date(),
//           order: - new Date(),
//           type: 'offensiveReviewed',
//           read: false,
//           postId: post.$key
//         });

//       this.af.database
//         .object(`/unread-notifications-count/${post.userId}`)
//         .$ref
//         .ref.transaction(value => value + 1);
//     }


//     // delete avatar
//     deleteAvatar(post: Post): void {
//       let userId = post.$key;
//       this.af.database.object(`/removed-offensive-avatars/${userId}`).set(post.avatar);
//       this.af.database.object(`/offensive-avatars/${userId}`).set(null);
//     }

//     // publish avatar
//     publishAvatar(post: Post): void {
//       let userId = post.$key;
//       this.af.database.object(`/offensive-avatars/${userId}`).set(null);
//       this.af.database.object(`/publish-offensive-avatars/${userId}`).set(post.avatar);
//     }

//     /**
//      * Move post from all post Collection ==> Offensive Collection
//      */
//     putToOffensive(post: Post): void {
//       this.af.database
//         .object(this.offensivePosts + post.userId + '/' + post.$key)
//         .set(post);

//       this.af.database
//         .object(this.allPosts + post.$key)
//         .set(null);
//     }

//     /**
//      * Returns email
//      */
//     getEmailName(userId: string): FirebaseObjectObservable<any> {
//         return this.af.database.object(this.usersPath + userId);
//     }


// }
