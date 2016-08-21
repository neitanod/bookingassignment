<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('password_resets')->delete();
      DB::table('users')->delete();
      DB::table('users')->insert([
        'id' => '1',
        'name' => 'Sebastian Grignoli',
        'email' => 'grignoli@gmail.com',
        'password' => '$2y$10$mJOGv3CSE.rZyY1FfwhiluS4ufUUbMWX5zEB/sgNP5/AR5gJQjFNS',
        'remember_token' => 'c2u0TFTkSnKwhOueXnSzfjkRTYRZxNk7QYouHlaY8jOkYQSLOZKqISSzbVLe',
        'created_at' => '2016-08-17 17:03:41',
        'updated_at' => '2016-08-21 03:08:44'
      ]);

      DB::table('events')->delete();
      DB::table('events')->insert([
        'id' => '1',
        'name' => '26th Anual Technology Convention',
        'logo' => 'jlkc.jpg',
        'description' => 'The coolest tech event of the year',
        'start_date' => '2016-08-30',
        'end_date' => '2016-09-04',
        'venue_id' => '1'
      ]);
      DB::table('events')->insert([
        'id' => '2',
        'name' => 'Electrical-Electronics Meeting',
        'logo' => 'mbcc.png',
        'description' => 'Meet inspiring speakers and experts',
        'start_date' => '2016-09-11',
        'end_date' => '2016-09-20',
        'venue_id' => '2'
      ]);

      DB::table('venues')->delete();
      DB::table('venues')->insert([
        'id' => '1',
        'name' => 'James L. Knight Center',
        'address' => '400 SE 2nd Ave, Miami, FL',
        'lat' => '25.770914',
        'lng' => '-80.1917892'
      ]);
      DB::table('venues')->insert([
        'id' => '2',
        'name' => 'Miami Beach Convention Center',
        'address' => '1901 Convention Center Dr, Miami Beach, FL',
        'lat' => '25.795614',
        'lng' => '-80.133219'
      ]);

      DB::table('venue_maps')->delete();
      DB::table('venue_maps')->insert([
        'id' => '1',
        'name' => 'Main floor',
        'event_id' => '1',
        'svgdata' => file_get_contents(dirname(__FILE__).'/svg/jlkcenter.svg')
      ]);
      DB::table('venue_maps')->insert([
        'id' => '2',
        'name' => 'Springs Hall',
        'event_id' => '2',
        'svgdata' => file_get_contents(dirname(__FILE__).'/svg/miamibeachcc.svg')
      ]);

      DB::table('stands')->delete();
      DB::table('stands')->insert([
        'id' => '11',
        'venue_map_id' => '1',
        'status' => 'available',
        'price' => 11000,
        'picture' => 'stand1.jpg'
      ]);
      DB::table('stands')->insert([
        'id' => '12',
        'venue_map_id' => '1',
        'status' => 'available',
        'price' => 21000,
        'picture' => 'stand2.jpg'
      ]);
      DB::table('stands')->insert([
        'id' => '13',
        'venue_map_id' => '1',
        'status' => 'reserved',
        'company_id' => 1,
        'price' => 14000,
        'picture' => 'stand3.jpg'
      ]);
      DB::table('stands')->insert([
        'id' => '21',
        'venue_map_id' => '2',
        'status' => 'available',
        'price' => 51000,
        'picture' => 'stand1.jpg'
      ]);
      DB::table('stands')->insert([
        'id' => '22',
        'venue_map_id' => '2',
        'status' => 'reserved',
        'company_id' => 2,
        'price' => 74000,
        'picture' => 'stand2.jpg'
      ]);
      DB::table('stands')->insert([
        'id' => '23',
        'venue_map_id' => '2',
        'status' => 'available',
        'price' => 20000,
        'picture' => 'stand3.jpg'
      ]);

      DB::table('stand_visitors')->delete();
      DB::table('stand_visitors')->insert([
        'id' => '1',
        'stand_id' => '13',
        'visitors' => '2117',
        'date' => '2016-08-30'
      ]);
      DB::table('stand_visitors')->insert([
        'id' => '2',
        'stand_id' => '13',
        'visitors' => '6142',
        'date' => '2016-08-31'
      ]);

      DB::table('companies')->delete();
      DB::table('companies')->insert([
        'id' => '1',
        'name' => 'Samsung',
        'logo' => 'samsung.jpg',
        'admin_name' => 'Sam',
        'admin_email' => 'Song',
        'phone' => '55-555-2055',
        'email' => 'song@samsungx.com',
        'website' => 'fakesamsung.com',
        'facebook' => 'fakesamsung',
        'twitter' => '@fakesamsung'
      ]);
      DB::table('companies')->insert([
        'id' => '2',
        'name' => 'Apple',
        'logo' => 'apple.jpg',
        'admin_name' => 'Adam',
        'admin_email' => 'Firstbourne',
        'phone' => '55-555-0001',
        'email' => 'afirstbourne@notapple.com',
        'website' => 'notapple.com',
        'facebook' => 'notapple',
        'twitter' => '@notapple'
      ]);

      DB::table('documents')->delete();
      DB::table('documents')->insert([
        'id' => '11',
        'company_id' => '1',
        'file' => 'samsung1.pdf',
        'title' => 'Brochure'
      ]);
      DB::table('documents')->insert([
        'id' => '12',
        'company_id' => '1',
        'file' => 'samsung2.pdf',
        'title' => 'Another Brochure'
      ]);
      DB::table('documents')->insert([
        'id' => '21',
        'company_id' => '2',
        'file' => 'apple.pdf',
        'title' => 'Our Products'
      ]);



    }

        //'' => '',
}
