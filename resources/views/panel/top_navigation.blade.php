        <!-- top navigation -->
        <div class="top_nav">
          <div class="nav_menu">
            <nav class="" role="navigation">
              <div class="nav toggle">
                <a id="menu_toggle"><i class="fa fa-bars"></i></a>
              </div>

              <ul class="nav navbar-nav navbar-right">
                <li class="">
                  <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                    <img src="{{ asset('pics/avatar/full/64x64/no-image-available.jpg') }}" alt="" class="user-name panel-avatar-image-64">
                    <span class=" fa fa-angle-down"></span>
                  </a>
                  <ul class="dropdown-menu dropdown-usermenu pull-right">
                    <li><a href="{{ URL::to('@user_profile') }}" target="_blank"><i class="fa fa-user pull-right"></i> Mi cuenta</a></li>
                    <li><a href="{{ URL::to('@user_logout') }}"><i class="fa fa-sign-out pull-right"></i> Cerrar sesión</a></li>
                  </ul>
                </li>

                <li role="presentation" class="dropdown" ng-controller="StatusController">
                  <a href="javascript:;" class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
                    <i class="fa fa-envelope-o"></i>
                    <span class="badge bg-green label-notifications-all label-notifications-superior panel-notifications-label ng-cloak" ng-show="unread">{| unread |}</span>
                  </a>
                  <ul id="menu1" ng-controller="StatusController" class="hidden dropdown-menu list-unstyled msg_list" role="menu">
                    <li ng-repeat="(i, m) in messages">
                      <a>
                        <span class="image"><img class="ng-cloak" src="{{ asset('pics/avatar/full/64x64/no-image-available.jpg') }}" alt="Profile Image" /></span>
                        <span>
                          <span>John Smith</span>
                          <span class="time">3 mins ago</span>
                        </span>
                        <span class="message">
                          Film festivals used to be do-or-die moments for movie makers. They were where...
                        </span>
                      </a>
                    </li>
                    <li>
                      <div class="text-center">
                        <a>
                          <strong>Ver todas</strong>
                          <i class="fa fa-angle-right"></i>
                        </a>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <!-- /top navigation -->

