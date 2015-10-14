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

                <div id="poll-<?php echo $topic_whole ?>"> <!-- this div ID has to be unique for each page for jqtouch to work -->
                    <div class="crumb main-form">
                        <a href="#" class="back goback">Back</a>

                        <a href="#" class="button next disabled" id="submit-button">Submit</a>
                    </div>
                    <div class="crumb image-editor hidden">
                        <a href="#" class="back" id="edit-image-back">Back</a>

                        <a href="#" class="button next" id="edit-image-next">Done</a>
                    </div>
                    <div id="wrapper" class="has-crumb">
                        <div class="scroller">
                        
                            <form method="post" action="poll-complete.php" enctype="multipart/form-data" class="main-form poll">

                                <ul class="rounded less-padding poll-prompt">
                                    <li>
                                        <div class="time">Now</div>
                                        <a href="#" class="help"><img src="images/icon-help.png"/></a>
                                        <a href="profile.html" class="profile-pic small"><img src="images/fpo/profile-pic-01.jpg"/></a>
                                        <span class="profile-name small">John Berman's poll question is:</span>
                                        <div class="rounded shadow-inset np">
                                            <textarea rows="40" cols="5" placeholder="Your poll question&hellip;"></textarea>
                                            <div class="toolbar">
                                                <div class="file-upload">
                                                    <img src="images/icon-camera.png"/>
                                                    <input type="file" name="uploaded-file" id="uploaded-file"/>
                                                </div>
                                                <div class="show-select-topic">
                                                    <a href="#"><?php echo $topic_name?></a> | 
                                                    <a href="#">Choose a category &#9656;</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="upload-preview-holder">
                                        </div>
                                        <p class="small">Add up to 10 answers.</p>
                                        <ul class="answers-entry sortable">
                                            <li class="answer-entry">
                                                <div class="rounded shadow-inset np">
                                                    <div class="handle"></div>
                                                    <textarea name="answer[]" rows="40" cols="5" placeholder="Write a poll answer&hellip;"></textarea>
                                                    <a href="#" class="ui-icon-delete"></a>
                                                </div>
                                            </li>
                                            <li class="answer-entry">
                                                <div class="rounded shadow-inset np">
                                                    <div class="handle"></div>
                                                    <textarea name="answer[]" rows="40" cols="5" placeholder="Write a poll answer&hellip;"></textarea>
                                                    <a href="#" class="ui-icon-delete"></a>
                                                </div>
                                            </li>
                                            <li class="answer-entry">
                                                <div class="rounded shadow-inset np">
                                                    <div class="handle"></div>
                                                    <textarea name="answer[]" rows="40" cols="5" placeholder="Write a poll answer&hellip;"></textarea>
                                                    <a href="#" class="ui-icon-delete"></a>
                                                </div>
                                            </li>
                                            <li class="answer-entry">
                                                <div class="rounded shadow-inset np">
                                                    <div class="handle"></div>
                                                    <textarea name="answer[]" rows="40" cols="5" placeholder="Write a poll answer&hellip;"></textarea>
                                                    <a href="#" class="ui-icon-delete"></a>
                                                </div>
                                            </li>
                                        </ul>

                                        <div class="clear"></div>

                                        <div class="align-right">
                                            <a href="#" class="right button-gray button-add">Add</a>
                                        </div>
                                        <div class="clear"></div>


                                    </li>
                                </ul>

                                <input type="hidden" name="offset_x" value="0"/>
                                <input type="hidden" name="offset_y" value="0"/>
                                <input type="hidden" name="offset_scale" value="1"/>
                                <input type="hidden" name="topic" value="askcomplete-<?php echo $topic_whole?>"/>
                            </form>

                            <div class="image-editor hidden">

                                <ul class="less-padding">
                                    <li>
                                        <h2 class="left">Crop and scale your photo</h2>
                                        <div class="upload-edit-holder">
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <script>
					$(function() {
					   console.log("page loaded");
					   pageLoaded("poll-<?php echo $topic_whole ?>");
					});
				</script>