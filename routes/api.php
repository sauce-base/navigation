<?php

use Modules\Navigation\Http\Controllers\NavigationController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('api/v1/navigation')->group(function () {
    Route::apiResource('navigation', NavigationController::class);
});
