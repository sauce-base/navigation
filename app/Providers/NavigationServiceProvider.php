<?php

namespace Modules\Navigation\Providers;

use Illuminate\Support\ServiceProvider;
use Modules\Navigation\Services\NavigationRegistry;
use Modules\Navigation\Services\NavigationTransformer;

class NavigationServiceProvider extends ServiceProvider
{
    /**
     * Boot the application events.
     */
    public function boot(): void {}

    /**
     * Register the service provider.
     */
    public function register(): void
    {
        // Register NavigationRegistry as a singleton
        $this->app->singleton(NavigationRegistry::class, function ($app) {
            return new NavigationRegistry;
        });

        // Register NavigationTransformer as a singleton
        $this->app->singleton(NavigationTransformer::class, function ($app) {
            return new NavigationTransformer;
        });
    }
}
