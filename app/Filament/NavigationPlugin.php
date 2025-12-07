<?php

namespace Modules\Navigation\Filament;

use Coolsam\Modules\Concerns\ModuleFilamentPlugin;
use Filament\Contracts\Plugin;
use Filament\Panel;

class NavigationPlugin implements Plugin
{
    use ModuleFilamentPlugin;

    public function getModuleName(): string
    {
        return 'Navigation';
    }

    public function getId(): string
    {
        return 'navigation';
    }

    public function boot(Panel $panel): void
    {
        //
    }
}
