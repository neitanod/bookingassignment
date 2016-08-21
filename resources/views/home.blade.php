@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Select your desired location</div>

                <div class="panel-body">
                  @include('halls.expo1')
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
