import { Injectable } from '@angular/core';
import {
  GET,
  Path,
  PathParam,
  Headers,
  QueryParam,
  POST,
  Body,
  ResponseObservable,
  PUT,
  DELETE
} from '../../../projects/ngx-http-annotations/src/public_api';
import {HttpClient} from '@angular/common/http';
import {from, Observable, of} from 'rxjs';
import {flatMap, map, mergeAll, take, tap, filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
@Headers({
  'someHeader1': 'headerValue1',
  'someHeader2': 'headerValue2',
  'Content-type': 'application/json; charset=UTF-8'
})
@Path('https://jsonplaceholder.typicode.com/')
export class ApiService {

  constructor(private http: HttpClient) { }

  @GET
  @Path('posts/:id')
  @Headers({
    'useMock': 'false',
  })
  public getPost(@PathParam('id') id: number): Observable<any> {
    //return this.http.request('GET', 'https://jsonplaceholder.typicode.com/posts/'+id);
    return of([{id: id, title: 'mock false'}]);
  }

  @GET
  @Path('posts/:id')
  @Headers({
    'useMock': 'true',
  })
  public getPostMock(@PathParam('id') id: number): Observable<any> {
    //return this.http.request('GET', 'https://jsonplaceholder.typicode.com/posts/'+id);
    return of([{id: id, title: 'mock true'}]);
  }


  @GET
  @Path('posts')
  public getPostForUserId(number: number, @QueryParam('userId') userId: number, @ResponseObservable res: Observable<any> = undefined): Observable<any> {
    return res? res.pipe(map((response) => response.slice(0, number))) : of([{id:0, title: 'mock 0'}, {id:1, title: 'mock 1'}, {id:2, title: 'mock 2'}]);
  }

  @POST
  @Headers({
    'someHeader3': 'headerValue3',
  })
  @Path('posts')
  public setPost(@Body post: any): Observable<any> {
    //return this.http.request('POST', 'https://jsonplaceholder.typicode.com/posts/', post);
    return of([{id: 0, title: 'mock'},{id: 1, title: 'mock 1'}]);
  }

  @PUT
  @Path('posts/:id')
  public putPost(@ResponseObservable res: Observable<any>, @Body post: any, @PathParam('id') postId: number): Observable<any> {
    //return this.http.request('PUT', 'https://jsonplaceholder.typicode.com/posts/'+id, post);
    return res? res.pipe(tap(data => console.log(`putPost for Post (${postId}) :`, data))) : of(post);
  }

  @DELETE
  @Path('posts/:id')
  public deletePost(@PathParam('id') postId: number): Observable<any> {
    //return this.http.request('DELETE', 'https://jsonplaceholder.typicode.com/posts/'+id);
    return of([{id: postId, title: 'mock'}]);
  }

  @GET
  @Path('todos')
  public getTodosNotDone(@ResponseObservable res: Observable<any> = undefined): Observable<any> {
    //return this.http.request('GET', 'https://jsonplaceholder.typicode.com/todos');
    console.log('getTodosNotDone', res);
    return res? res.pipe(
      map(todos => todos.filter(todo => !todo.completed)))  : of({title: 'mock', completed: false});
  }


}
