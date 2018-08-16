import React from 'react'; 
import './Team.css'; 

const Team = () => (
	<div className='team-wrapper'>
		<div className='our-team'>
			<h2>Our Team</h2>
			<hr className='our-team-hr'></hr>
		</div>

		<div className="card-deck team-card-deck">
			<div className="col-xs-12 col-s-12 col-sm-6 col-lg-4">
				<div className="card card-custom-styling">
					<div className = 'team-card'>
						<div className="team-circle-gradient-styling">
							<div className="team-circle-thumbnail-styling">
								<img className="card-img-top" src="https://lh3.googleusercontent.com/xnn6V5bxnXvODur-ilkbGyWdMgWPwnMMXFRkNnm_x9uPFoZHu5NQX-1l-n6qN32Em3LyPAqNSuBoTh8RMXTlz3N4LS0C7spO5R-tIKFRcES_5pmQofj3Vv-INcFDlXY9efcsmodL=w2400" alt="Card image cap"></img>
							</div>
						</div>
						<div className="card-body">
							<h5 className="card-title">Robert Queeney</h5>
							<hr/>
							<p className="card-text">Project Manager/Frontend. Quiet Conqueror.  Big Boss Man.  Sad puppy human hybrid.   Up too late. Breeder of disease-ridden offspring.</p>
							<p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
						</div>
					</div>
				</div>
			</div>
			<div className="col-xs-12 col-s-12 col-sm-6 col-lg-4">
				<div className="card card-custom-styling">
					<div className = 'team-card'>
						<div className="team-circle-gradient-styling">
							<div className="team-circle-thumbnail-styling">
								<img className="card-img-top" src="https://lh3.googleusercontent.com/Swcq3UuudJdxRqzrsJ29kL7PvzsZd59ZecxoSRJhaq0PwEFvohgBuRofYsAdxXogRRnKLuRvYN_PTTKJCpGfEcQ8Cu1Zo48Lp_O-_rJ4HU8He0RriUvUiWR25DUjjhkySg3kcWEK=w2400" alt="Card image cap"></img>
							</div>
						</div>
						<div className="card-body">
							<h5 className="card-title">Majid (No last name like Cher, or Chingy)</h5>
							<hr/>
							<p className="card-text">Frontend Development. Prefers to live in chaos.</p>
							<p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
						</div>
					</div>
				</div>
			</div>
			<div className="col-xs-12 col-s-12 col-sm-6 col-lg-4">
				<div className="card card-custom-styling">
					<div className = 'team-card'>
						<div className="team-circle-gradient-styling">
							<div className="team-circle-thumbnail-styling">
								<img className="card-img-top" src="https://lh3.googleusercontent.com/Ylc2hjTolimHfAp6Mi_-T1jINljL00Et8cmyFLagiUSWKjOdbrSw3UEQF_jbgs2qEfShnOWt7kAYZbK2yqbXFcAMaam32WNe8M3ebu85Mh-ar1VV_CRnaA1PisoMsXqDvyIWfLHD=w2400" alt="Card image cap"></img>
							</div>
						</div>
						<div className="card-body">
							<h5 className="card-title">Maddy Fiksdal</h5>
							<hr/>
							<p className="card-text">Front and Backend Development. Stripe implementation.</p>
							<p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
						</div>
					</div>
				</div>
			</div>
			<div className="col-xs-12 col-s-12 col-sm-6 col-lg-4">
				<div className="card card-custom-styling">
					<div className = 'team-card'>
						<div className="team-circle-gradient-styling">
							<div className="team-circle-thumbnail-styling">
								<img className="card-img-top" src="https://lh3.googleusercontent.com/NafV_FgoBnSdafcd0EDlr15RnvjmrtokSnuSfihdYaJgFdwVlSOX4hsfDdD5C_nNRZRHehfBHdVdGMHO52o1Gg0vDke-tE0GH9-bowUG1N8bN4JKUqINC5ZcViRyLq76BTwU8sAJ=w2400" alt="Card image cap"></img>
							</div>
						</div>
						<div className="card-body">
							<h5 className="card-title">Daniel Thweatt</h5>
							<hr/>
							<p className="card-text">Backend Development. Database management and Passport implementation. </p>
							<p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
						</div>
					</div>
				</div>
			</div>
			<div className="col-xs-12 col-s-12 col-sm-6 col-lg-4">
				<div className="card card-custom-styling">
					<div className = 'team-card'>
						<div className="team-circle-gradient-styling">
							<div className="team-circle-thumbnail-styling">
								<img className="card-img-top" src="https://lh3.googleusercontent.com/DzWQ2lICXqBoQHQ7JI7N35_05OZYW0vXzrQW3UpW9Frd_Wh-TSYCMOjmXyI_APIoAWHXP-H9s3sVp16cEjnqYrts3PBcuJWd9yE_02JnryFe5Pa6I_62s--xC-pm2vesrmz4Fgfl=w2400" alt="Card image cap"></img>
							</div>
						</div>
						<div className="card-body">
							<h5 className="card-title">Cavan Wagg</h5>
							<hr/>
							<p className="card-text">Front and Backend Development. Stripe implementation.</p>
							<p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default Team; 