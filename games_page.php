<?php // Need to check if this is on a device before showing rotation image.?>
<style type="text/css">

	#warning-message { display: none; }
	
	@media screen and (max-width: 480px){
		.main_content_page { display:none; }
		.navbar { display: none; }
		#footer { display: none; }
		#warning-message { margin-top: 75px; display:block; }
	}

	@media screen and (min-width: 480px){
		#warning-message { display:none; }
	}

</style>

<div id="warning-message" >
	<center><img src="<?php echo site_url('assets/images/backgrounds/rotate_display.png'); ?>" class="img-responsive" /></center>
</div>

<div class="main_content_page">
	<div class="container">
	<div class="clear"></div>
		<div class="row">
			<div class="col-xs-12">
				<?php echo ($this->session->userdata('user_id'))? $this->load->view('templates/user_stats_bar'):''?>

				<div class="pull-left">
					<h1>Play Video Trivia!</h1>
				</div>
			</div>
		</div>
	</div>

	<div class="clear"></div>
	<div class="clear"></div>

	<div class="container">
		<ul class="nav nav-tabs" role="tablist">	
		  <li class="active"><a href="<?php echo site_url('games'); ?>">Earn Coins!</a></li>
		  <li><a href="<?php echo site_url('games/prize_games'); ?>">Play for Prizes!</a></li>
		</ul>

		<?php
			if ($this->session->flashdata('error')){
				echo '<div class="alert alert-danger">'.$this->session->flashdata('error').'</div>';
			} elseif ($this->session->flashdata('success')) { 
				echo '<div class="alert alert-success">'.$this->session->flashdata('success').'</div>';
			}
		?>
		
        <div class="row">
			<div class="span12 featured-games"><h3>Earn Reward Coins!</h3></div>
		</div>

		<?php $this->load->view('templates/point_games_view'); ?>		

	</div>

</div>
