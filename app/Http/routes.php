<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
  Log::info("INFO",['logging'=>true]);
  if(!empty(Auth::user())) Log::warning("WARNING",['user'=>["name"=>Auth::user()->name, "id"=>Auth::user()->id]]);
    //return Redirect::to('/home');
    //dd(Auth::user());
    return view('welcome');
});

Route::auth();
Route::get('/home', 'HomeController@index');
Route::get('/panel', 'ControlPanelController@index');
