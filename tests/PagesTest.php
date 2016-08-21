<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PagesTest extends TestCase
{
    /**
     * General functional test.
     *
     * @return void
     */
    public function testBasicExample()
    {
        $this->visit('/')
             ->see('Welcome');
    }
    public function testPanelAuth()
    {
        $this->visit('/panel')
             ->see('<div class="panel-heading">Login</div>');
    }
    public function testPanelPreloader()
    {
        $user = \App\User::first();
        $this->be($user);
        $this->visit('/panel')
             ->see('Loading...');
    }
}
