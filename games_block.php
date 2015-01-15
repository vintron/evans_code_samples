<div class="row">

	<?php 
	if ($point_games) {
	
		foreach ($point_games as $game)
		{

			$display = true; 
			
			if (isset($game_info))
			{
				if ($this->session->userdata('game_id') == $game->game_id)
				{
					$display = false;
				}
			}
			
			if ($game->is_sponsored == 0) {
				// Is Not Sponsored show points icon
				$icon_img = site_url('assets/images/icons/gtype-icon-points.png');
			} else if ($game->is_sponsored == 1) {
				// Is Sponsored show coin icon
				$icon_img = site_url('assets/images/icons/gtype-icon-coin.png'); 
			}
	?> 
			<?php if($display){?>
			<div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 gameBox">
				<div class="thumbnail"> 
					<div class="row">
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-3" style="padding-right:1px;"><img src="<?php echo $icon_img; ?>" class="gamebox-icon"/></div>
						<div class="col-xs-8 col-sm-8 col-md-8 col-lg-9">
							<span><small style="margin-left:0px;">Sponsored by:</small></span><br />
							<span class="orange mar-bot-0" style="margin-left:0px;font-weight:400;">GoWindfall!</span>
						</div>
					</div>
					<div class="hr"></div>
					
					<div class="row">
						<div class="col-xs-12"> 
							<center>
								<img src="http://img.youtube.com/vi/<?php echo $game->video_source_id; ?>/mqdefault.jpg" alt="DB-DisplayName" class="img-responsive" />
							</center>
						</div>
					</div>
					
					<div class="clear"></div>
					<div class="clear"></div>
					<center>
						<a href="<?php echo site_url('game_play/game/?token='.Modules::run('security/encode', $game->game_id)); ?>">
							<button type="button" data-prizeid=""  class="btn btn-primary btn-warning btn-gamebox">PLAY!</button>
						</a>
					</center>
				</div>
			</div>
				
		<?php
			}
		}
	?>
	<?php 
	} else { 
	?>
		<div class="alert alert-info">No games to display for now. Please check back or contact <a href="<?php echo site_url('support');?>">support</a></div>
	<?php 
	} 
	?>
    
</div>

<div class="clear"></div>
