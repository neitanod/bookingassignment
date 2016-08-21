@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Please select the event of your interest:</div>

                <div class="panel-body">
                    <div id="gmap" class="embed-responsive embed-responsive-16by9">
<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14369.021180143664!2d-80.14096559265138!3d25.795150391337895!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xe6f4e5416a1bf693!2sMiami+Beach+Convention+Center!5e0!3m2!1ses-419!2sar!4v1471739191333" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
                    </div>
                    <div class="row row-spacing">
                        <div class="col-xs-12 text-center disabled">
                            <a class="btn btn-primary btn-large btn-lg" href="{{ URL::to('register') }}/1" ng-href="{{ URL::to('register') }}/{| ev.id |}">Book your place</a>
                        </div>
                    </div>
                    <div class="row row-spacing">
                        <img src="{{ asset('pics/venue/full/200x200/mbcc.png') }}" class="ev-logo col col-sm-3"/>
                        <div class="col col-sm-9">
                            <h1><span class="ev-name">26th Annual Technology Convention</span></h1>
                            <h3>Starting at <span class="ev-start-date">Saturday, August 21, 2016</span>.</h3>
                            <h2><span class="ev-venue-name">Miami Beach Convention Center</span></h2>
                            <p><span class="ev-address">1901 Convention Center Dr, Miami Beach, FL</span></p>
                            <p class="ev-description">The coolest Tech event of the year</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection



{{--
Another example:
<img src="{{ asset('pics/venue/full/200x200/mbcc.png') }}" class="ev-logo col-sm-3"/>




<img src="{{ asset('pics/venue/full/200x200/jlkc.jpg') }}" class="ev-logo col-sm-3"/>
James L. Knight Center
400 SE 2nd Ave, Miami, FL
{{ asset('pics/venue/full/200x200/jlkc.jpg') }}

                        <img src="{{ asset('pics/stand/full/800x600/stand1.jpg') }}" class="ev-logo col-sm-3"/>
                        <img src="{{ asset('pics/stand/full/800x600/stand2.jpg') }}" class="ev-logo col-sm-3"/>
                        <img src="{{ asset('pics/stand/full/800x600/stand3.jpg') }}" class="ev-logo col-sm-3"/>
--}}
