<?php 
$type_topic_whole = "";
$topic_whole = "";
$parent_name = "";
$topic_name = "";

if(isset($_REQUEST['topic']))
    $type_topic_whole = $_REQUEST['topic'];

if(strpos($type_topic_whole,"-") !== FALSE) {
    $topic_whole = substr($type_topic_whole, strpos($type_topic_whole,"-")+1);
}

if(strpos($topic_whole,"-") !== FALSE) {
    $parent = substr($topic_whole, 0, strpos($topic_whole,"-"));
    $topic = substr($topic_whole, strpos($topic_whole,"-")+1);
} else {
    $parent = $topic_whole;
    $topic = "";
}
$parent_name = ucfirst(str_replace("_", " ", $parent));
$topic_name = ucfirst(str_replace("_", " ", $topic));
?>

                <div id="askcomplete-<?php echo $topic_whole ?>"> <!-- this div ID has to be unique for each page for jqtouch to work -->
                    
                    <div class="crumb">
                        <a href="problems-<?php echo $topic_whole ?>.html" class="back">Back</a>

                    </div>
                    
                    <div id="wrapper" class="has-crumb">
                        <div class="scroller">

                            <ul class="rounded less-padding ask-prompt">
                                <li>
                                    <h2 class="small"><strong>Thanks John!</strong> The PB community is working on solving your problem.</h2>
                                    <p>Visit your profile page to see what we come up with.</p>
                                    <p>In the meantime, you might be interested in:</p>

                                    <ul class="articles">
                                        <li>
                                            <img src="images/fpo/article-thumb-winestains.jpg"/>
                                            <div class="content">
                                                <h3>DIY</h3>
                                                <p>&ldquo;How to Get Red Wine Stains off White Clothes.&rdquo;</p>
                                            </div>
                                        </li>
                                        <li>
                                            <img src="images/fpo/article-thumb-grassstains.jpg"/>
                                            <div class="content">
                                                <h3>Home</h3>
                                                <p>&ldquo;Lorem ipsum stains dolor amet grass stain.&rdquo;</p>
                                            </div>
                                        </li>
                                        <li>
                                            <img src="images/fpo/article-thumb-scrubbing.jpg"/>
                                            <div class="content">
                                                <h3>DIY</h3>
                                                <p>&ldquo;Scrubbing stains is a big waste of your time.&rdquo;</p>
                                            </div>
                                        </li>
                                        <li>
                                            <img src="images/fpo/article-thumb-kidstains.jpg"/>
                                            <div class="content">
                                                <h3>Family</h3>
                                                <p>&ldquo;But Mom, stains are are cool. Stop doing the laundry!&rdquo;</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="clear"></div>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
                <script>
                    $(function() {
                       console.log("page loaded");
                       pageLoaded("askcomplete-<?php echo $topic_whole ?>");
                    });
                </script>