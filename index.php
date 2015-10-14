<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>ProductBuzz</title>
        <link rel="stylesheet" href="themes/css/style.css" title="jQTouch">
        <link href='https://fonts.googleapis.com/css?family=Lato:900,700,400,300' rel='stylesheet' type='text/css' />

        <link rel="stylesheet" href="themes/css/royalslider.css"/>
        <link rel="stylesheet" href="themes/css/vp.css"/>
        <link rel="stylesheet" href="themes/css/itabbar.css"/><!--CSS order are important -->
        <link rel="stylesheet" href="themes/css/topics.css"/>
        <link rel="stylesheet" href="themes/css/add2home.css">

    </head>
    <body>
        <div id="page">
            <div class="toolbar">
                <a href="#" class="btn-menu"></a>
                <a href="#" class="btn-home goback"></a>
                <img class="logo" src="images/logo.svg"/>
                <a href="profile.html" class="profile-pic">
                    <span class="badge">4</span>
                    <img src="images/fpo/profile-pic-01.jpg"/>
                </a>
                <a href="#" class="btn-controls"></a>
            </div>

            <div id="search-panel">
            </div>

            <div id="jqt">
                <?php
                $type_topic_whole = "problems-family-kids";
                include "content.php";
                ?>
            </div>
            
            <div id="loading"><p><img src="images/loading.gif" /></p></div>

            <nav id="tabbar" class="show">
                <ul>
                    <li><a href="problems-Family-Kids.html" class="problems current" data-content-type="problems"><strong>Ask for <br/>Help</strong><div class="icon"></div></a></li>    
                    <li><a href="solutions-Family-Kids.html" class="solutions" data-content-type="solutions"><strong>Offer<br/>Help</strong><div class="icon"></div></a></li>
                    <li><a href="offers-Family-Kids.html" class="offers" data-content-type="offers"><strong>Browse<br/>Solutions</strong><div class="icon"></div></a></li>
                </ul>
            </nav>
        </div>

        <nav id="topics"></nav>

        <script type="text/javascript" src="src/lib/iscroll.js"></script>
        <script type='text/javascript' src='src/lib/jquery-1.7.js'></script> 
        <script type='text/javascript' src='src/lib/jquery-ui-1.10.3.custom.js'></script> 
        <script type="text/javascript" src="src/imagesloaded.pkgd.min.js"></script>
        <script type='text/javascript' src='src/addTouch.js'></script>
        <!--<script type='text/javascript' src='src/iosDraggable.js'></script>-->
        <script type='text/javascript' src='src/jqtouch.js'></script>  
        <script type='text/javascript' src='src/jqtouch-jquery.js'></script>  

        <script type='text/javascript' src='src/jqt.autotitles.min.js'></script>  
        <script type='text/javascript' src='src/yql.js'></script>  

        <!--<script type="text/javascript" src="src/add2home.js" charset="utf-8"></script>-->

        <script type='text/javascript' src='src/topics-json.js'></script> 
        <script type="text/javascript" src="src/application.js" charset="utf-8"></script>
        
        <script type='text/javascript' src='src/itabbar.js'></script> 
        <script type='text/javascript' src='src/fullscreen.js'></script> 

        <script type='text/javascript' src="src/jquery.cookie.js"></script>

        <script type='text/javascript' src="src/jquery.royalslider.js"></script>
        <script type='text/javascript' src="src/jquery.rs.visible-nearby.js"></script>
        <script type='text/javascript' src="src/jquery.rs.deeplinking.js"></script>
        <script type='text/javascript' src="src/jquery.rs.animated-blocks.js"></script>
        <script type='text/javascript' src="src/jquery.rs.auto-height.js"></script>
        <script type='text/javascript' src="src/jquery.rs.active-class.js"></script>
    </body>
</html>