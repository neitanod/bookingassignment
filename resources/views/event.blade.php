@extends('layouts.app')

@section('content')
<script>
  top.EVENT_ID = {{ $event_id }};
</script>
<div class="container" ng-app="ngEventDetails" ng-controller="EventDetailsController">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">{| event.venue |}</div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-xs-12">
                            <h3>{| event.map |}</h3>
                            <h4>Select your desired location</h4>
                            <div id="svgdata">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('content-js')
<script src="{{ asset('lib/app/ngEventDetails.js') }}"></script>
@endsection



{{--
Stands pictures:
                        <img src="{{ URL::to('pics/stand/full/800x600') }}/{| stand.picture |}" class="stand-pic col-sm-3"/>
--}}
