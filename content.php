<?php 
// get the passed information (passed from .htaccess rewrite) as "topic" string, formatted as "type-parent-topic"

$type = "";
$topic_whole = "";
$parent_name = "";
$topic_name = "";

if(isset($_REQUEST['topic']))
    $type_topic_whole = basename($_REQUEST['topic'], ".html");

if(strpos($type_topic_whole,"-") !== FALSE) {
    $type = substr($type_topic_whole, 0, strpos($type_topic_whole,"-"));
    $topic_whole = substr($type_topic_whole, strpos($type_topic_whole,"-")+1);
}

if($type == "ask") {
    header( 'Location: ask.php?topic=' . urlencode($type_topic_whole) ) ;
    exit;
}
if($type == "answer") {
    header( 'Location: answer.php?topic=' . urlencode($type_topic_whole) ) ;
    exit;
}
if($type == "askcomplete") {
    header( 'Location: ask-complete.php?topic=' . urlencode($type_topic_whole) ) ;
    exit;
}
if($type == "poll") {
    header( 'Location: poll.php?topic=' . urlencode($type_topic_whole) ) ;
    exit;
}
if($type == "pollcomplete") {
    header( 'Location: poll-complete.php?topic=' . urlencode($type_topic_whole) ) ;
    exit;
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

// get the actual topic name from its passed topic id, defined in the JSON library
$json = str_replace("var topicsArray =","",file_get_contents("./src/topics-json.js"));
$jsonIterator = json_decode($json, TRUE);

//echo "parent=$parent\ntopic=$topic\n";
foreach($jsonIterator as $key => $value) {
    if (gettype($value) == "array") {
        if(strtolower($value["id"])==strtolower($parent)) {
            $parent_name = $value["name"];
            //echo "found parent: " . $parent_name;
        }
        foreach($value["children"] as $key => $value) {
            if (gettype($value) == "array") {
                if(strtolower($value["id"])==strtolower($topic)) {
                    $topic_name = $value["name"];
                    //echo "found topic: " . $topic_name;
                }
            }
        }
    }
}

?>

<div id="<?php echo strtolower($type_topic_whole) ?>"> <!-- this div ID has to be unique for each page for jqtouch to work -->
        
    <div class="crumb">
        <?php
        if($topic == "") {
            ?>
            <a href="<?php echo $parent ?>.html" class="current"><?php echo $parent_name ?></a>
            <?php
        } else {
            $show_parent = false;
            if($topic == "most_popular")
                $show_parent = true;
            if($show_parent) {
                ?>
                <a href="<?php echo $parent ?>.html" class="parent"><?php echo $parent_name ?></a>
                <?php
            }
            ?>
            <a href="<?php echo $topic_whole ?>" class="current"><?php echo $topic_name ?></a>
            <?php
        }
        ?>

        <div class="search">
            <a href="#" class="search-icon"></a>
            <a href="#" class="close-icon"></a>
            <form>
                <input type="text" size="30" id="search-text"/>
            </form>
        </div>
    </div>
    <div id="wrapper" class="has-crumb">
        <div class="scroller">
            
            <?php
            if($type == "problems") {
                ?>
                <h1>Ask us anything.</h1>
                <ul class="narrow centered">
                    <li>
                        <a class="rounded shadow nbm" href="ask-<?php echo $topic_whole?>.html">
                            <p class="main">Describe your<br/>problem in words.</p>
                        </a>
                        <h2>or</h2>
                        <a class="rounded shadow nbm" href="poll-<?php echo $topic_whole?>.html">
                            <p class="main">Create a poll.</p>
                        </a>
                    </li>
                </ul>
                <?php
            } else if($type == "solutions") {
                ?>
                <h2>These ProductBuzz members<br/>need your help!</h2>

                <div id="slider-main" class="royalSlider rsDefault visibleNearby problems">
                    <div class="rsContent rounded">
                        <a href="profile.html" class="profile-pic"><img src="images/fpo/profile-pic-05.jpg"/></a>
                        <span class="profile-name">Julie B. from Cincinnati asks:</span>
                        <p class="main centered lrp"><a href="answer.php">How much is too much to spend on back-to-school cloths for an 8-yr-old?</a></p>
                        <form>
                            <textarea cols="30" cols="2" placeholder="Tell us what you think..." data-href="answer.php"></textarea>
                        </form>
                        <p class="links centered">
                            <a href="answer.php">26 Comments</a>
                        </p>
                            
                    </div>
                    <div class="rsContent rounded">
                        <a href="profile.html" class="profile-pic"><img src="images/fpo/profile-pic-03.jpg"/></a>
                        <span class="profile-name">Jessica S. from New York asks:</span>
                        <p class="main centered lrp"><a href="answer.php">What is the safest car for my teenage son?</a></p>
                        <form>
                            <textarea cols="30" cols="2" placeholder="Tell us what you think..." data-href="answer.php"></textarea>
                        </form>
                        <p class="links centered">
                            <a href="answer.php">48 Comments</a>
                        </p>
                    </div>
                    <div class="rsContent rounded">
                        <a href="profile.html" class="profile-pic"><img src="images/fpo/profile-pic-04.jpg"/></a>
                        <span class="profile-name">Anna D. from Seattle asks:</span>
                        <p class="main centered lrp"><a href="answer.php">Any advice on how to set up a college savings account?</a></p>
                        <form>
                            <textarea cols="30" cols="2" placeholder="Tell us what you think..." data-href="answer.php"></textarea>
                        </form>
                        <p class="links centered">
                            <a href="answer.php">26 Comments</a>
                        </p>
                    </div>

                </div> <!-- /.royalslider -->
                <?php
            } else if($type == "offers") {
                ?>

                <h2></h2> <!-- needed for spacing -->

                <div id="slider-main" class="royalSlider rsDefault visibleNearby offers">
                    <div class="rsContent rounded np">
                        <div class="img-area">
                            <a href="offer.html"><h2>Your car doesn&rsquo;t have to smell like a &ldquo;kid taxi.&rdquo;</h2></a>
                            <img src="images/fpo/offer-febreeze.jpg" class="main-img"/>
                            <img src="images/fpo/logo-febreeze.png" class="brand-logo"/>
                        </div>
                        <p class="bottom">
                            <a href="profile.html" class="profile-pic"><img src="images/fpo/profile-pic-05.jpg"/></a>
                            <span class="profile-name">This exclusive offer is inspired by Julie Bergantino.</span>
                        </p>
                    </div>
                    <div class="rsContent rounded np">
                        <div class="img-area">
                            <a href="offer.html"><h2>Avocados should be &lsquo;grab &amp; go&rsquo; not &lsquo;stand &amp; squeeze.&rsquo;&nbsp;&nbsp;</h2></a>
                            <img src="images/fpo/offer-chiquita.jpg" class="main-img"/>
                            <img src="images/fpo/logo-chiquita.png" class="brand-logo"/>
                        </div>
                        <p class="bottom">
                            <a href="profile.html" class="profile-pic"><img src="images/fpo/profile-pic-05.jpg"/></a>
                            <span class="profile-name">This exclusive offer is inspired by Julie Bergantino.</span>
                        </p>
                    </div>
                    <div class="rsContent rounded np">
                        <div class="img-area">
                            <a href="offer.html"><h2>What&rsquo;s left out of dog food is as important as what&rsquo;s put in.</h2></a>
                            <img src="images/fpo/offer-iams.jpg" class="main-img"/>
                            <img src="images/fpo/logo-iams.png" class="brand-logo"/>
                        </div>
                        <p class="bottom">
                            <a href="profile.html" class="profile-pic"><img src="images/fpo/profile-pic-05.jpg"/></a>
                            <span class="profile-name">This exclusive offer is inspired by Julie Bergantino.</span>
                        </p>
                    </div>

                </div> <!-- /.royalslider -->
                <?php
            }
            ?>


        </div> <!-- /.scroller -->
    </div>
</div>
<?php 
if(isset($_REQUEST['topic'])) {
    ?>
    <script>
		$(function() {
		   console.log("page loaded");
		   pageLoaded("<?php echo strtolower($type_topic_whole) ?>");
		});
	</script>
    <?php
}
?>