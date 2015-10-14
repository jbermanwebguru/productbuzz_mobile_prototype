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
                <div id="answer-<?php echo $topic_whole ?>"> <!-- this div ID has to be unique for each page for jqtouch to work -->

                    <div class="crumb">
                        <a href="#" class="back goback">Back</a>
                        <a href="#" class="button next disabled" id="submit-button">Submit</a>
                    </div>

                    <div id="wrapper" class="has-crumb">
                        <div class="scroller">
                            <ul class="rounded nbm less-padding">
                                <li>
                                    <div class="time">8 hrs</div>
                                    <a href="profile.html" class="profile-pic small"><img src="images/fpo/profile-pic-05.jpg"/></a>
                                    <span class="profile-name">Julie B. from Cincinnati asks:</span>
                                	<p class="main centered lrp">How much is too much to spend on back-to-school clothes for an 8-yr-old?</p>
                                    <img class="article-pic" src="images/fpo/article-pic-backtoschool.jpg"/>
                                    <form>
                                    	<textarea cols="30" cols="2" placeholder="Tell us what you think..." id="answer-text"></textarea>
                                    </form>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <p class="right nbm">
                                        <i class="star"></i>
                                        <a href="#"><i class="comment-count">12</i></a>
                                    </p>
                                    <p class="light">25 Comments</p>
                                    <div class="clear"></div>
                                    <a href="#"><i class="right share"></i></a>
                                    <div class="filters">
                                        <ul>
                                            <li><a href="#" class="current">Best</a>
                                                <ul>
                                                    <li><a href="#">Best</a></li>
                                                    <li><a href="#">Newest</a></li>
                                                    <li><a href="#">Oldest</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="#">Community</a>
                                                <ul>
                                                    <li><a href="#">Community</a></li>
                                                    <li><a href="#">Friends</a></li>
                                                    <li><a href="#">Cincinnati</a></li>
                                                    <li><a href="#">Ohio</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <div class="time">3 mins</div>
                                    <a href="profile.html" class="profile-pic small"><img src="images/fpo/profile-pic-04.jpg"/></a>
                                    <span class="profile-name">Erin C. says:</span>
                                    <p class="content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo.</p>
                                    <div class="comment-functions">
                                        <div class="right">
                                            <a href="#">Reply</a> |
                                            <a href="#"><i class="share"></i></a> 
                                        </div>
                                        <a href="#" class="up">54</a> |
                                        <a href="#" class="down">12</a>
                                    </div>
                                </li>
                                <li class="bt">
                                    <div class="time">4 mins</div>
                                    <a href="profile.html" class="profile-pic small"><img src="images/fpo/profile-pic-04.jpg"/></a>
                                    <span class="profile-name">Erin C. says:</span>
                                    <p class="content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo.</p>
                                    <div class="comment-functions">
                                        <div class="right">
                                            <a href="#">Reply</a> |
                                            <a href="#"><i class="share"></i></a> 
                                        </div>
                                        <a href="#" class="up">54</a> |
                                        <a href="#" class="down">12</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <script>
					$(function() {
					   console.log("page loaded");
					   pageLoaded("answer-<?php echo $topic_whole ?>");
					});
				</script>