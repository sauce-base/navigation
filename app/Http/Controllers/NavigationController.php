<?php

namespace Modules\Navigation\Http\Controllers;

use Inertia\Inertia;

class NavigationController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Navigation::Index', [
            'message' => 'Welcome to Navigation Module',
            'module' => 'navigation',
        ]);
    }
}
