<?php

use Modules\Navigation\Http\Controllers\NavigationController;
use Illuminate\Support\Facades\Route;

Route::resource('navigation', NavigationController::class);
