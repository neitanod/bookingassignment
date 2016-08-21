<?php

namespace App\Http\Controllers\API;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EventsController extends Controller
{
    /**
     * Show the public events map.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(json_decode('{"events": {
                "1": {
                  "id": "1",
                  "lat": "25.770914",
                  "lng": "-80.1917892",
                  "name": "26th Anual Technology Convention",
                  "description": "The coolest tech event of the year",
                  "start_date": "2016-08-30",
                  "venue":  "James L. Knight Center",
                  "address":  "400 SE 2nd Ave, Miami, FL",
                  "logo":  "jlkc.jpg"
                },
                "2":  {
                  "id": "2",
                  "lat": "25.795614",
                  "lng": "-80.133219",
                  "name": "Electrical-Electronics Meeting",
                  "description": "Meet inspiring speakers and experts",
                  "start_date": "2016-09-11",
                  "venue":  "Miami Beach Convention Center",
                  "address":  "1901 Convention Center Dr, Miami Beach, FL",
                  "logo":  "mbcc.png"
                }
              }
            }'));
    }

    /**
     * Show the selected event with it's stands.
     *
     * @return \Illuminate\Http\Response
     */
    public function event()
    {
        return response()->json(json_decode('{"event": {
                "1": {
                  "id": "1",
                  "lat": "25.770914",
                  "lng": "-80.1917892",
                  "name": "26th Anual Technology Convention",
                  "description": "The coolest tech event of the year",
                  "start_date": "2016-08-30",
                  "venue":  "James L. Knight Center",
                  "address":  "400 SE 2nd Ave, Miami, FL",
                  "logo":  "jlkc.jpg"
                }
              }
            }'));
    }
}
