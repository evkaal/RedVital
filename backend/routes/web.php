<?php

use Illuminate\Support\Facades\Route;

//Route::get('/', function () {
  //  return view('welcome');
//});


// En backend/routes/web.php
Route::get('/', function () {
    return file_get_contents(public_path('index.html'));
});
