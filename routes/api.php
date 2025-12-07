<?php

use Illuminate\Support\Facades\Route;
use Modules\Navigation\Http\Controllers\NavigationController;

Route::middleware(['auth:sanctum'])->prefix('api/v1/navigation')->group(function () {
    Route::apiResource('navigation', NavigationController::class);
});
