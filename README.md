untz-angular-tutorial-tips-js
================

Library to support creating tutorial tooltip walkthroughs on your page. Define the steps to walk your user through, the location on the page to show the tips and start it!

Demo
----

See a demo here http://jed204.github.io/untz-angular-tutorial-tips-js/demo.html

Install
-----

```
bower install untz-angular-tutorial-tips-js --save
```

Usage
-----

Include the ```untz.tutorialtips``` module in your application:

```
  var app = angular.module('myApp', [
	'ngRoute',
	'untz.tutorialtips',
	'Dashboard.Module'
  ]);
```

Add the tips directive at the top level of your page:

```
  <body ng-app="myApp">

    <div untz-tutorial-tips></div>

    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    ...
    </div>
  </body>
```

Now, in your controller where you want to start the tutorial, provide the tips:

```
  untzTutorialTipsSvc.setTips([ 
	{ header: 'Welcome', text : 'Welcome to the first tip!', left: 215, top: 61 }, 
	{ header: 'Another Tip', text : 'You can have as many as you want.', left: 300, top: 120 },
	{ header: 'Another Tip', text : 'You can have as many as you want.', right: 300, top: 120, side: 'right' } 
  ]);
```
