<?php

use Illuminate\Support\Facades\Route;
use Modules\Navigation\Http\Controllers\NavigationController;

Route::resource('navigation', NavigationController::class);
