var main_app = function(config) {
	this.port 			  = window.location.port;
	this.index            = '';
	this.base_url 		  = '';
	this.base_url2 		  = '';
	this.app_site         = '';
	this.local 			  = '';
	this.image_path       = '';
	this.socket_url		  = '';

	this.timeout          = null;
	this.default_map      = null;

	this.cookie 	 	  = ''
	this.index_url 		  = '';
	this.module 		  = '';
};

main_app.prototype = {
	initConfig : function() {
		var self = this;

		if(__config) {
			self.base_url 	= __config.base_url2;
			self.base_url 	= __config.base_url;
			/*self.socket_url = __config.socket_url + (__config.socket_port ? ":" + __config.socket_port : '');*/
			self.socket_url = __config.socket_url;
			self.image_path = __config.image_path;
			// self.live_url 	= __config.live_url;
			self.index_url  = __config.index_url + __config.port + __config.suffix;
			// self.module  	= __config.module;
			self.cookie 	= __config.cookie;
			self.timeout  	= __config.timeout;
			self.default_currency = __config.currency;
			// self.km_radius  = __config.radius;
			self.main_path  = __config.main_path;
		}	
 
	},


	getStorage: function(cname) {
		var self = this;
		if (this.is_ls) {
			return window.localStorage.getItem(cname);
		} else {
			return self.getCookie(cname);
		}
	},
	getCookie: function(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		var value = '';
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1);
			if (c.indexOf(name) != -1) {
				value = c.substring(name.length, c.length);
			}
		}
		return value;
	},
	createStorage: function(name, value) {
		var self = this;
		if (this.is_ls) {
			window.localStorage.setItem(name, value);
		} else {
			self.createCookie(name, value);
		}
	},
	createCookie: function(name, value, days) {
		var self = this,
			loc = (self.hostname === "localhost" ? self.local : self.dev);
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			var expires = "; expires=" + date.toUTCString();
		} else {
			var expires = "";
		}
		// document.cookie = name + "=" + value + expires + "; path=" + self.cookie;
		document.cookie = name + "=" + value + expires + "; path=/";
	},
	eraseStorage: function(name) {
		var self = this;
		if (this.is_ls) {
			window.localStorage.removeItem(name);
		} else {
			self.createCookie(name, "", -1);
		}
	},
	eraseCookie: function(name) {
		this.createCookie(name, "", -1);
	},
	readCookie: function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	},
	error_message : function(msg) {
		swal({
		  title: "Error",
		  text: String(msg).initCap(),
		  icon: "error",
		  button:"OK"
		});
	},
	warning_message : function(msg) {
		swal({
		  title: "Warning",
		  text: String(msg).initCap(),
		  icon: "warning",
		  button:"OK"
		});
	},
	info_message : function(msg, fn) {
		swal({
		  title: "General Information",
		  text: String(msg).initCap(),
		  icon: "info",
		  button:"OK"
		},function() {
			if($.isFunction(fn)){
				fn.call();
			}
		});
	},
	success_message : function(msg) {
		swal({
		  title: "Success",
		  text: String(msg).initCap(),
		  icon: "success",
		  button:"OK"
		});
	},
	confirm_message : function(msg, option, fn_yes, fn_no) {
		if(typeof option !== "undefined") {
			swal({
				  title: typeof option.title !== "undefined" ? option.title : "Confirm",
				  text: String(msg).initCap(),
				  icon: typeof option.type !== "undefined" ? option.type : "warning" ,
				  showCancelButton: true,
				  cancelButtonText : typeof  option.canceltext !== "undefined" ? option.canceltext : "Cancel",
				  button: typeof  option.confirmtext !== "undefined" ? option.confirmtext : "Confirm"
				}, 
				function(isConfirm) {
					if(isConfirm) {
						if($.isFunction(fn_yes)) {
							fn_yes.call();
						}
					}
					else {
						if($.isFunction(fn_no)) {
							fn_no.call();
						}
					}
				});
		}
	},
	is_disposable_email: function(email) {
		var domain = email.substr(email.indexOf('@'), email.length).replace("@", "");
		var disposable_email = ["0-mail.com", "0815.ru", "0815.su", "0clickemail.com", "0wnd.net", "0wnd.org", "10minutemail.co.za", "10minutemail.com", "10minutemail.de", "123-m.com", "1chuan.com", "1fsdfdsfsdf.tk", "1pad.de", "1zhuan.com", "20mail.it", "20minutemail.com", "21cn.com", "2fdgdfgdfgdf.tk", "2prong.com", "30minutemail.com", "33mail.com", "3d-painting.com", "3trtretgfrfe.tk", "4gfdsgfdgfd.tk", "4warding.com", "4warding.net", "4warding.org", "5ghgfhfghfgh.tk", "60minutemail.com", "675hosting.com", "675hosting.net", "675hosting.org", "6hjgjhgkilkj.tk", "6ip.us", "6paq.com", "6url.com", "75hosting.com", "75hosting.net", "75hosting.org", "7days-printing.com", "7tags.com", "99experts.com", "9ox.net", "a-bc.net", "a45.in", "abcmail.email", "acentri.com", "advantimo.com", "afrobacon.com", "ag.us.to", "agedmail.com", "ahk.jp", "ajaxapp.net", "alivance.com", "ama-trade.de", "amail.com", "amilegit.com", "amiri.net", "amiriindustries.com", "anappthat.com", "ano-mail.net", "anonbox.net", "anonmails.de", "anonymail.dk", "anonymbox.com", "antichef.com", "antichef.net", "antireg.ru", "antispam.de", "antispammail.de", "appixie.com", "armyspy.com", "artman-conception.com", "aver.com", "azmeil.tk", "baxomale.ht.cx", "beddly.com", "beefmilk.com", "bigprofessor.so", "bigstring.com", "binkmail.com", "bio-muesli.net", "blogmyway.org", "bobmail.info", "bodhi.lawlita.com", "bofthew.com", "bootybay.de", "boun.cr", "bouncr.com", "boxformail.in", "breakthru.com", "brefmail.com", "brennendesreich.de", "broadbandninja.com", "bsnow.net", "bspamfree.org", "bu.mintemail.com", "buffemail.com", "bugmenot.com", "bumpymail.com", "bund.us", "bundes-li.ga", "burnthespam.info", "burstmail.info", "buymoreplays.com", "buyusedlibrarybooks.org", "byom.de", "c2.hu", "cachedot.net", "card.zp.ua", "casualdx.com", "cbair.com", "cek.pm", "cellurl.com", "centermail.com", "centermail.net", "chammy.info", "cheatmail.de", "childsavetrust.org", "chogmail.com", "choicemail1.com", "chong-mail.com", "chong-mail.net", "chong-mail.org", "clixser.com", "cmail.com", "cmail.net", "cmail.org", "coldemail.info", "consumerriot.com", "cool.fr.nf", "correo.blogos.net", "cosmorph.com", "courriel.fr.nf", "courrieltemporaire.com", "crapmail.org", "crazymailing.com", "cubiclink.com", "curryworld.de", "cust.in", "cuvox.de", "d3p.dk", "dacoolest.com", "daintly.com", "dandikmail.com", "dayrep.com", "dbunker.com", "dcemail.com", "deadaddress.com", "deadspam.com", "deagot.com", "dealja.com", "delikkt.de", "despam.it", "despammed.com", "devnullmail.com", "dfgh.net", "digitalsanctuary.com", "dingbone.com", "discard.email", "discardmail.com", "discardmail.de", "disposableaddress.com", "disposableemailaddresses.com", "disposableemailaddresses.emailmiser.com", "disposableinbox.com", "dispose.it", "disposeamail.com", "disposemail.com", "dispostable.com", "dm.w3internet.co.uk", "dm.w3internet.co.ukexample.com", "dodgeit.com", "dodgit.com", "dodgit.org", "doiea.com", "domozmail.com", "donemail.ru", "dontreg.com", "dontsendmespam.de", "dotmsg.com", "drdrb.com", "drdrb.net", "droplar.com", "duam.net", "dudmail.com", "dump-email.info", "dumpandjunk.com", "dumpmail.de", "dumpyemail.com", "duskmail.com", "e-mail.com", "e-mail.org", "e4ward.com", "easytrashmail.com", "einmalmail.de", "einrot.com", "einrot.de", "eintagsmail.de", "email60.com", "emaildienst.de", "emailgo.de", "emailias.com", "emailigo.de", "emailinfive.com", "emaillime.com", "emailmiser.com", "emailproxsy.com", "emailsensei.com", "emailtemporanea.com", "emailtemporanea.net", "emailtemporar.ro", "emailtemporario.com.br", "emailthe.net", "emailtmp.com", "emailto.de", "emailwarden.com", "emailx.at.hm", "emailxfer.com", "emeil.in", "emeil.ir", "emil.com", "emz.net", "enterto.com", "ephemail.net", "ero-tube.org", "etranquil.com", "etranquil.net", "etranquil.org", "evopo.com", "explodemail.com", "express.net.ua", "eyepaste.com", "fakeinbox.com", "fakeinformation.com", "fakemail.fr", "fakemailz.com", "fammix.com", "fansworldwide.de", "fantasymail.de", "fastacura.com", "fastchevy.com", "fastchrysler.com", "fastkawasaki.com", "fastmazda.com", "fastmitsubishi.com", "fastnissan.com", "fastsubaru.com", "fastsuzuki.com", "fasttoyota.com", "fastyamaha.com", "fatflap.com", "fdfdsfds.com", "fightallspam.com", "fiifke.de", "filzmail.com", "fivemail.de", "fixmail.tk", "fizmail.com", "fleckens.hu", "flyspam.com", "footard.com", "forgetmail.com", "fr33mail.info", "frapmail.com", "freundin.ru", "friendlymail.co.uk", "front14.org", "fuckingduh.com", "fudgerub.com", "fux0ringduh.com", "fyii.de", "garliclife.com", "gehensiemirnichtaufdensack.de", "gelitik.in", "get1mail.com", "get2mail.fr", "getairmail.com", "getmails.eu", "getonemail.com", "getonemail.net", "ghosttexter.de", "giantmail.de", "girlsundertheinfluence.com", "gishpuppy.com", "gmial.com", "goemailgo.com", "gorillaswithdirtyarmpits.com", "gotmail.com", "gotmail.net", "gotmail.org", "gotti.otherinbox.com", "gowikibooks.com", "gowikicampus.com", "gowikicars.com", "gowikifilms.com", "gowikigames.com", "gowikimusic.com", "gowikinetwork.com", "gowikitravel.com", "gowikitv.com", "grandmamail.com", "grandmasmail.com", "great-host.in", "greensloth.com", "grr.la", "gsrv.co.uk", "guerillamail.biz", "guerillamail.com", "guerillamail.net", "guerillamail.org", "guerrillamail.biz", "guerrillamail.com", "guerrillamail.de", "guerrillamail.info", "guerrillamail.net", "guerrillamail.org", "guerrillamailblock.com", "gustr.com", "h.mintemail.com", "h8s.org", "hacccc.com", "haltospam.com", "harakirimail.com", "hartbot.de", "hat-geld.de", "hatespam.org", "hellodream.mobi", "herp.in", "hidemail.de", "hidzz.com", "hmamail.com", "hochsitze.com", "hopemail.biz", "hotpop.com", "hulapla.de", "ieatspam.eu", "ieatspam.info", "ieh-mail.de", "ihateyoualot.info", "iheartspam.org", "ikbenspamvrij.nl", "imails.info", "imgof.com", "imstations.com", "inbax.tk", "inbox.si", "inboxalias.com", "inboxclean.com", "inboxclean.org", "inboxproxy.com", "incognitomail.com", "incognitomail.net", "incognitomail.org", "infocom.zp.ua", "inoutmail.de", "inoutmail.eu", "inoutmail.info", "inoutmail.net", "insorg-mail.info", "instant-mail.de", "ip6.li", "ipoo.org", "irish2me.com", "iwi.net", "jetable.com", "jetable.fr.nf", "jetable.net", "jetable.org", "jnxjn.com", "jourrapide.com", "jsrsolutions.com", "junk1e.com", "kasmail.com", "kaspop.com", "keepmymail.com", "killmail.com", "killmail.net", "kimsdisk.com", "kingsq.ga", "kir.ch.tc", "klassmaster.com", "klassmaster.net", "klzlk.com", "kook.ml", "koszmail.pl", "kulturbetrieb.info", "kurzepost.de", "l33r.eu", "lackmail.net", "lags.us", "lawlita.com", "lazyinbox.com", "letthemeatspam.com", "lhsdv.com", "lifebyfood.com", "link2mail.net", "litedrop.com", "loadby.us", "login-email.ml", "lol.ovpn.to", "lolfreak.net", "lookugly.com", "lopl.co.cc", "lortemail.dk", "lovemeleaveme.com", "lr78.com", "lroid.com", "lukop.dk", "m21.cc", "m4ilweb.info", "maboard.com", "mail-filter.com", "mail-temporaire.fr", "mail.by", "mail.mezimages.net", "mail.zp.ua", "mail114.net", "mail1a.de", "mail21.cc", "mail2rss.org", "mail333.com", "mail4trash.com", "mailbidon.com", "mailbiz.biz", "mailblocks.com", "mailbucket.org", "mailcat.biz", "mailcatch.com", "mailde.de", "mailde.info", "maildrop.cc", "maildx.com", "maileater.com", "maileimer.de", "mailexpire.com", "mailfa.tk", "mailforspam.com", "mailfreeonline.com", "mailfs.com", "mailguard.me", "mailimate.com", "mailin8r.com", "mailinater.com", "mailinator.com", "mailinator.net", "mailinator.org", "mailinator.us", "mailinator2.com", "mailincubator.com", "mailismagic.com", "mailmate.com", "mailme.ir", "mailme.lv", "mailme24.com", "mailmetrash.com", "mailmoat.com", "mailms.com", "mailnator.com", "mailnesia.com", "mailnull.com", "mailorg.org", "mailpick.biz", "mailproxsy.com", "mailquack.com", "mailrock.biz", "mailscrap.com", "mailshell.com", "mailsiphon.com", "mailslapping.com", "mailslite.com", "mailtemp.info", "mailtome.de", "mailtothis.com", "mailtrash.net", "mailtv.net", "mailtv.tv", "mailzilla.com", "mailzilla.org", "mailzilla.orgmbx.cc", "makemetheking.com", "manifestgenerator.com", "manybrain.com", "mbx.cc", "mega.zik.dj", "meinspamschutz.de", "meltmail.com", "messagebeamer.de", "mezimages.net", "mierdamail.com", "migumail.com", "ministry-of-silly-walks.de", "mintemail.com", "misterpinball.de", "mjukglass.nu", "moakt.com", "mobi.web.id", "mobileninja.co.uk", "moburl.com", "moncourrier.fr.nf", "monemail.fr.nf", "monmail.fr.nf", "monumentmail.com", "msa.minsmail.com", "mt2009.com", "mt2014.com", "mx0.wwwnew.eu", "my10minutemail.com", "mycard.net.ua", "mycleaninbox.net", "myemailboxy.com", "mymail-in.net", "mymailoasis.com", "mynetstore.de", "mypacks.net", "mypartyclip.de", "myphantomemail.com", "mysamp.de", "myspaceinc.com", "myspaceinc.net", "myspaceinc.org", "myspacepimpedup.com", "myspamless.com", "mytemp.email", "mytempemail.com", "mytempmail.com", "mytrashmail.com", "nabuma.com", "neomailbox.com", "nepwk.com", "nervmich.net", "nervtmich.net", "netmails.com", "netmails.net", "netzidiot.de", "neverbox.com", "nice-4u.com", "nincsmail.hu", "nnh.com", "no-spam.ws", "noblepioneer.com", "nobulk.com", "noclickemail.com", "nogmailspam.info", "nomail.pw", "nomail.xl.cx", "nomail2me.com", "nomorespamemails.com", "nonspam.eu", "nonspammer.de", "noref.in", "nospam.ze.tc", "nospam4.us", "nospamfor.us", "nospammail.net", "nospamthanks.info", "notmailinator.com", "notsharingmy.info", "nowhere.org", "nowmymail.com", "nurfuerspam.de", "nus.edu.sg", "nwldx.com", "objectmail.com", "obobbo.com", "odaymail.com", "odnorazovoe.ru", "one-time.email", "oneoffemail.com", "oneoffmail.com", "onewaymail.com", "onlatedotcom.info", "online.ms", "oopi.org", "opayq.com", "ordinaryamerican.net", "otherinbox.com", "ourklips.com", "outlawspam.com", "ovpn.to", "owlpic.com", "pancakemail.com", "paplease.com", "pcusers.otherinbox.com", "pepbot.com", "pfui.ru", "pimpedupmyspace.com", "pjjkp.com", "plexolan.de", "poczta.onet.pl", "politikerclub.de", "poofy.org", "pookmail.com", "privacy.net", "privatdemail.net", "privy-mail.com", "privymail.de", "proxymail.eu", "prtnx.com", "prtz.eu", "punkass.com", "putthisinyourspamdatabase.com", "pwrby.com", "quickinbox.com", "quickmail.nl", "rcpt.at", "reallymymail.com", "realtyalerts.ca", "recode.me", "recursor.net", "recyclemail.dk", "regbypass.com", "regbypass.comsafe-mail.net", "rejectmail.com", "reliable-mail.com", "rhyta.com", "rklips.com", "rmqkr.net", "royal.net", "rppkn.com", "rtrtr.com", "s0ny.net", "safe-mail.net", "safersignup.de", "safetymail.info", "safetypost.de", "sandelf.de", "saynotospams.com", "schafmail.de", "schrott-email.de", "secretemail.de", "secure-mail.biz", "selfdestructingmail.com", "selfdestructingmail.org", "sendspamhere.com", "senseless-entertainment.com", "services391.com", "sharedmailbox.org", "sharklasers.com", "shieldedmail.com", "shieldemail.com", "shiftmail.com", "shitmail.me", "shitmail.org", "shitware.nl", "shmeriously.com", "shortmail.net", "showslow.de", "sibmail.com", "sinnlos-mail.de", "siteposter.net", "skeefmail.com", "slapsfromlastnight.com", "slaskpost.se", "slopsbox.com", "slushmail.com", "smashmail.de", "smellfear.com", "smellrear.com", "snakemail.com", "sneakemail.com", "sneakmail.de", "snkmail.com", "sofimail.com", "sofort-mail.de", "softpls.asia", "sogetthis.com", "sohu.com", "solvemail.info", "soodonims.com", "spam.la", "spam.su", "spam4.me", "spamail.de", "spamarrest.com", "spamavert.com", "spambob.com", "spambob.net", "spambob.org", "spambog.com", "spambog.de", "spambog.net", "spambog.ru", "spambox.info", "spambox.irishspringrealty.com", "spambox.us", "spamcannon.com", "spamcannon.net", "spamcero.com", "spamcon.org", "spamcorptastic.com", "spamcowboy.com", "spamcowboy.net", "spamcowboy.org", "spamday.com", "spamex.com", "spamfree.eu", "spamfree24.com", "spamfree24.de", "spamfree24.eu", "spamfree24.info", "spamfree24.net", "spamfree24.org", "spamgoes.in", "spamgourmet.com", "spamgourmet.net", "spamgourmet.org", "spamherelots.com", "spamhereplease.com", "spamhole.com", "spamify.com", "spaminator.de", "spamkill.info", "spaml.com", "spaml.de", "spammotel.com", "spamobox.com", "spamoff.de", "spamsalad.in", "spamslicer.com", "spamspot.com", "spamstack.net", "spamthis.co.uk", "spamthisplease.com", "spamtrail.com", "spamtroll.net", "speed.1s.fr", "spikio.com", "spoofmail.de", "squizzy.de", "ssoia.com", "startkeys.com", "stinkefinger.net", "stop-my-spam.com", "stuffmail.de", "super-auswahl.de", "supergreatmail.com", "supermailer.jp", "superrito.com", "superstachel.de", "suremail.info", "svk.jp", "sweetxxx.de", "tagyourself.com", "talkinator.com", "tapchicuoihoi.com", "teewars.org", "teleworm.com", "teleworm.us", "temp-mail.org", "temp-mail.ru", "temp.emeraldwebmail.com", "temp.headstrong.de", "tempalias.com", "tempe-mail.com", "tempemail.biz", "tempemail.co.za", "tempemail.com", "tempemail.net", "tempinbox.co.uk", "tempinbox.com", "tempmail.eu", "tempmail.it", "tempmail2.com", "tempmaildemo.com", "tempmailer.com", "tempmailer.de", "tempomail.fr", "temporarily.de", "temporarioemail.com.br", "temporaryemail.net", "temporaryemail.us", "temporaryforwarding.com", "temporaryinbox.com", "temporarymailaddress.com", "tempsky.com", "tempthe.net", "tempymail.com", "thanksnospam.info", "thankyou2010.com", "thc.st", "thecloudindex.com", "thelimestones.com", "thisisnotmyrealemail.com", "thismail.net", "throwawayemailaddress.com", "tilien.com", "tittbit.in", "tizi.com", "tmail.ws", "tmailinator.com", "toiea.com", "toomail.biz", "topranklist.de", "tradermail.info", "trash-amil.com", "trash-mail.at", "trash-mail.com", "trash-mail.de", "trash2009.com", "trash2010.com", "trash2011.com", "trashdevil.com", "trashdevil.de", "trashemail.de", "trashmail.at", "trashmail.com", "trashmail.de", "trashmail.me", "trashmail.net", "trashmail.org", "trashmail.ws", "trashmailer.com", "trashymail.com", "trashymail.net", "trbvm.com", "trialmail.de", "trillianpro.com", "tryalert.com", "turual.com", "twinmail.de", "twoweirdtricks.com", "tyldd.com", "uggsrock.com", "umail.net", "upliftnow.com", "uplipht.com", "uroid.com", "us.af", "username.e4ward.com", "venompen.com", "veryrealemail.com", "vidchart.com", "viditag.com", "viewcastmedia.com", "viewcastmedia.net", "viewcastmedia.org", "viralplays.com", "vomoto.com", "vpn.st", "vsimcard.com", "vubby.com", "walala.org", "walkmail.net", "wasteland.rfc822.org", "webemail.me", "webm4il.info", "webuser.in", "wee.my", "weg-werf-email.de", "wegwerf-email-addressen.de", "wegwerf-emails.de", "wegwerfadresse.de", "wegwerfemail.com", "wegwerfemail.de", "wegwerfmail.de", "wegwerfmail.info", "wegwerfmail.net", "wegwerfmail.org", "wetrainbayarea.com", "wetrainbayarea.org", "wh4f.org", "whatiaas.com", "whatpaas.com", "whatsaas.com", "whopy.com", "whtjddn.33mail.com", "whyspam.me", "wilemail.com", "willhackforfood.biz", "willselfdestruct.com", "winemaven.info", "wronghead.com", "wuzup.net", "wuzupmail.net", "www.e4ward.com", "www.gishpuppy.com", "www.mailinator.com", "wwwnew.eu", "x.ip6.li", "xagloo.com", "xemaps.com", "xents.com", "xmaily.com", "xoxy.net", "xyzfree.net", "yapped.net", "yeah.net", "yep.it", "yogamaven.com", "yopmail.com", "yopmail.fr", "yopmail.net", "yourdomain.com", "ypmail.webarnak.fr.eu.org", "yuurok.com", "z1p.biz", "za.com", "zehnminuten.de", "zehnminutenmail.de", "zetmail.com", "zippymail.info", "zoaxe.com", "zoemail.com", "zoemail.net", "zoemail.org", "zomg.info", "zxcv.com", "zxcvbnm.com", "zzz.com"];
		if ($.inArray(domain, disposable_email) == -1) {
			return false;
		} else {
			return true;
		}
	},
	is_email: function(email) {
		var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
		if (pattern.test(email)) {
			return true;
		} else {
			return false;
		}
	},
	is_url: function(url) {
		var pattern = new RegExp(/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i);
		if (pattern.test(url)) {
			return true;
		} else {
			return false;
		}
	},

	is_mobile_no: function($el, code) {
		var phone_number = $el.val(),
			countrycode  = code,
			full_num     = countrycode.replace('+', '') + $.trim(phone_number),
			array_number = phone_number.split(''),
			is_valid     = true;

		if (array_number[0] === '0') {
			array_number.shift();
			var string_number = array_number.toString().replace(/,/g, "");
			$el.val(string_number);
			full_num = $.trim(countrycode.replace('+', '') + string_number);
		}

		if (countrycode == '+966') {
			number_val = full_num.length == 12;
		} else {
			number_val = $.trim(phone_number).length >= 5 && $.trim(phone_number).length <= 30;
		}

		if (number_val && $.isNumeric(full_num)) {
			is_valid = true;
		} else {
			is_valid = false;
		}

		return is_valid;
	},
	phone_number : function(phone) {
		/*var pattern = new RegExp(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/);*/
		var pattern = new RegExp (/^(\d{5,20})$/);

		if (pattern.test(phone)) {
			return true;
		} else {
			return false;
		}
	},

	number_decimal : function(number) {
	/*	var pattern = new RegExp(/^[\d]+(\.?[\d]+)?$/);
		(/^(\.)?[\d]+(\.?[\d]+)?$/);

		if (pattern.test(number)) {
			return true;
		} else {
			return false;
		}*/

		var regular = new RegExp(/^[\d]+(\.?[\d]+)?$/);
		var another = new RegExp (/^\.[\d]+$/);
		/*(/^(\.)?[\d]+(\.?[\d]+)?$/);*/

		if (regular.test(number) || another.test(number)) {
			return true;
		} else {
			return false;
		}
	},

	multiple_list : function($el, mymethod, url, requestType) {
		var self = this;
		
		/*$el.select2({
			ajax: {
				method  : mymethod,
			    url 	: main.base_url + url,
			    data 	: function (params) {
			    	var query = {
				        supplier: params.term,
				    }

				    return query;
				},

			    beforeSend: function(xhr) {
					xhr.setRequestHeader('Authorize', self.getCookie('token'));
				},

			    processResults: function (data) {
			      return {
			        results: data.items
			      };
			    }
			  }
		});*/
		$el.select2({
			 ajax: {
			    url: self.base_url + url,
			    type: 'POST',
			    dataType: 'json',
			    delay: 250,
			    data: function (params) {
		        	if (requestType == 'supplier') {
		        		return {supplier: params.term} // search term
		        	} else {
		        		return {city: params.term}
		        	}
			      	
			    },
			    beforeSend: function(xhr) {
					xhr.setRequestHeader('Authorize', self.getCookie('token'));
				},		
			    processResults : function(data, params) {
			    	return {
			    		results: $.map(data, function(item) {
			    			return item;
			    		})
			    	};
			    },
			    cache: true
			  },
			  placeholder: 'Search for ' + requestType,
			  escapeMarkup: function (supplier) { return supplier; }, // let our custom formatter work
			  minimumInputLength: 1,
			  templateResult: formatSupplier,
  			  templateSelection: formatSupplierSelection,
  			  multiple: true,
  			  allowClear: true
			});

		function formatSupplier (data) {
			if (data.loading) {
				// console.log($el.find()); 
				return data.text;
			}

			var markup = "" + data.text.initCap();

			return markup;
		}

		function formatSupplierSelection (data) {
			return "<span class='data-item margin-left-1-em' id='" + data.id + "'>" + data.text.initCap(); + "</span>";
		}
	},

	_logout : function() {
		var self = this;
		self.pre_loader(null, true);

		$.ajax ({
            type    : "POST",
            url     :  self.base_url + 'logout',           
            dataType: "JSON",
   
            beforeSend : function(xhr) {
            	xhr.setRequestHeader('Authorize', self.getCookie('token'));
            },

            success : function(data_set) {  
            	self.pre_loader(null, false);            
                main.eraseCookie('token');

                var regex = new RegExp('/[^/]*$');
                var href = window.location.href.replace(regex, '/');
                location.href = (window.location.hostname==='localhost') ? (href): self.index_url;
            },

            error: function(data_set){
                main._error_handler(data_set.responseJSON[0]);
                // console.log("error");
            } 
    	});
	},

	_error_handler : function(e) { 
 
	    var self = this; 
	    var message = ''; 
	    if (e.responseJSON.length > 1 || e.responseJSON.length != undefined) { 
	      for (var key in e.responseJSON) { 
	        message += e.responseJSON[key].message + ', '; 
	      } 
	 
	      self.error_message(message); 
	    } else { 
	      if (e.code == 1012) { 
	          var regex = new RegExp('/[^/]*$'); 
	              var href = window.location.href.replace(regex, '/'); 
	              location.href = (window.location.hostname==='localhost') ? (href): self.base_url; 
	          } else { 
	          // main.error_message((e.message != undefined) ? e.message : e); 
	          self.error_message((e.message != undefined) ? e.message : e.responseJSON.message); 
	        } 
	    } 
	}, 

	is_int: function(value) { 
    	var er = /^-?[0-9]+$/; 
    	return er.test(value); 
  	}, 

	isLocalStorageNameSupported: function() {
		var testKey = 'test',
			storage = window.sessionStorage;
		try {
			storage.setItem(testKey, '1');
			storage.removeItem(testKey);
			return true;
		} catch (error) {
			return false;
		}
	},
	icheck_render: function() {
		$('.i-check, .i-radio').iCheck({
			checkboxClass: 'i-check',
			radioClass: 'i-radio',
			increaseArea: '20%'
		});
	},
	
	number_commas : function(x) {
		//author: nahid; if response is null; date: 10-21-16;
		if(x != null && x != ''){
			var components = x.toString().split('.');
		    components [0] = components [0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		    return components.join('.');
		}else{
			return 'null response';
		}
		//end of code
	},

	//date: 10-14-16; 
	_fix_amount_value: function(num){
		return parseFloat(num).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},

	capitalize : function(str) {
	 	return str.replace(/\w\S*/g, function(txt) {
	        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	    });
	},
	pre_loader : function(loc, type, sub_module) {
		var $el = $body.find('.pre-loader'),
			$pr = $el.find('.cssload-bokeh');
		
		if (type) {
			$el.removeClass('hide').slideDown(10);
			$pr.removeClass('hide');
		} else {
			if ($el.is(':visible')) {
				$pr.attr('style', 'display:none;');
				$el.slideUp(10);
			}
		}
	},

	mini_loader : function(loc, type, sub_module) {
		var $el = $body.find('.holder'),
			$pr = $el.find('.loader'),
			$ja = $el.find('.just-a-div');
		
		if (type) {
			$body.find('.recommended-suggested-hotels').css('opacity', '0.5').show();
    		$body.find('.suggested-hotel-item').click(false);

			$el.removeClass('hide').slideDown(10).show();
			$pr.removeClass('hide').show();
		} else {
			if ($el.is(':visible')) {
				$pr.slideUp(10).hide();
				$ja.slideUp(10).hide();
			}
		}
	},

	pagination_hider : function(table_id, total_record, total_display) {
		var id = $.trim(table_id);
		if (total_record <= total_display) {
			$body.find('#' + id).parents('#' + id + '_wrapper').find('.dataTables_paginate').hide();
		} else {
			$body.find('#' + id).parents('#' + id + '_wrapper').find('.dataTables_paginate').show();
		}
	},
	datatable_refresher : function(tbl) {
		var oTable    = tbl.dataTable(),
			oSettings = oTable.fnSettings();
		oSettings._iDisplayLength = 10;
		oSettings._iDisplayStart = 0;
		oSettings._iDisplayStartength = 0;
		tbl.dataTable()._fnAjaxUpdate();
	},

	_active_menu : function (menu) { 
		$('li').find('a').removeClass('active-class');
    	$('.' + menu).addClass('active-class'); 
  	}, 

	change_language : function(new_lang) {
		var self     = this,
			lang     = self.getCookie('lang');
			// new_lang = lang == 'en' ? 'ar' : 'en';

	    $.when(self.createCookie('lang', new_lang)).done(function() {
	        window.location.reload();
	    });
	},

	// with controls
	_is_valid_text : function($el) {
		if($el.val()=='' || $el.val==null) {
			$el.addClass('red-border');
			$el.next().show();
			return false;
		}
		else {
			$el.removeClass('red-border');
			$el.next().hide();
			return true;
		}
	},
	_is_email: function($el) {
		var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
		if (pattern.test($el.val())) {
			$el.removeClass("red-border");
			$el.next().hide();
			return true;
		} else {
			$el.addClass("red-border");
			$el.next().show();
			return false;
		}
	},

	_auto_complete : function($el, type, url, additional_data, el_appendTo) { 
	    var self = this; 
	    $el.autocomplete({ 
	     	minLength: 1, 
	     	appendTo : 'body',  
	     	source: debounce(function(request, response) { 
	        $.ajax({ 
	          type: type, 
	          url: url, 
	          dataType: 'JSON', 
	          data: { 
	            'hotel': $el.val(), 
	            'city_ids': additional_data 
	          }, 
	          timeout: self.timeout, 
	          beforeSend: function(xhr) { 
	            xhr.setRequestHeader('Authorize', main.getCookie('token')); 
	          }, 
	          success: function(data_set) { 
	            var key = null; 
	            for(key in data_set) { 
	              $.extend(data_set[key],{label:String(data_set[key].name).initCap()}) 
	            } 
	             
	            response(data_set); 
	          }, 
	          error: function(e, t, m) { 
	            main._error_handler(e.responseJSON[0]); 
	          } 
	        }); 
	      }, 250, false), 
	      response: function(event, ui) { 
	        /*if (ui.content.length == 0) { 
	          //$el.next('small').show().text($.i18n.t('markup.no_result')).i18n(); 
	          //$el.addClass('red-border'); 
	        } else { 
	          //$el.removeClass('red-border'); 
	          //$el.next('small').hide().text(''); 
	        }*/ 
	      }, 
	      change: function(event, ui) { 
	        if (ui.item != null) { 
	          //$el.attr('data-id', ui.item.id); 
	          //$el.removeClass('red-border'); 
	          //$el.next('small').hide().text(''); 
	        } else { 
	          // $el.val('').removeAttr('data-id'); 
	        } 
	      }, 
	      select: function(event, ui) { 
	        $el.attr('data-id', ui.item.id); 
	        var data = { 
	          'id'      	: ui.item.id,
	          'hotel_id'   	: ui.item.hotel_id,  
	          'name'       	: ui.item.name, 
	          'address'    	: ui.item.address, 
	          'rating'      : ui.item.rating, 
	          'description' : ui.item.description, 
	          'phone'       : (ui.item.phone != null) ? ui.item.phone : "N/A", 
	          'website'     : (ui.item.website != null) ? ui.item.website : "N/A", 
	          'status'    	: ui.item.status, 
	          'rating'    	: ui.item.rating, 
	          'lat'      	: ui.item.lat, 
	          'lon'      	: ui.item.lon, 
	          'city_id'     : ui.item.city_id 
	        } 
	       
	        if (el_appendTo == 'unmatched') {
	        	unmatched_hotels._render_hotel_details(data); 
	        	$body.find('.recommended-search-delete').show(); 
	        } else {
	        	hotel_matching._render_hotel_details(data, 0);
	        	$body.find('.hotel-matching-recommended-search-delete').show(); 
	        }	       
	        //$body.find('.recommended-suggested-hotels').hide(); 
	      } 
	    }); 
  	}, 
 
  	// main._render_auto_complete_list($city_filter_approved, 'POST', main.base_url + 'getCity', 'report', null, 'city-mapping');
 	_render_auto_complete_list : function($el, type, url, section, data, mod) { 
	    var self = this; 

	    $el.autocomplete({ 
	     	minLength: 1, 
	     	appendTo : (section == "modal-report" ? $('.matching-queue-modal-content') : 'body'),  
	     	source: debounce(function(request, response) { 
	        $.ajax({ 
	          type: type, 
	          url: url, 
	          dataType: 'JSON', 
			//   data: (data != undefined) ? ({'city' : $el.val(), 'supplier_id' : data.supplier_id}) : ({'city' : $el.val()}), 
			  data: (function() {
				  switch(mod) {
					  case 'city-mapping' : 
						  if (data) {
							  return {
								  city 			: $el.val(),
								  supplier_id 	: data.supplier_id
							  }
						  } else {
							  return {
								  city 	: $el.val()
							  }
						  }
						  break;
					  case 'country-mapping' : 
						  return {
							  country 		: $el.val(),
							  supplier_id 	: data
						  }
						  break;
				  }
			  })(),
	          timeout: self.timeout, 
	          beforeSend: function(xhr) { 
	            xhr.setRequestHeader('Authorize', main.getCookie('token')); 
	          }, 
	          success: function(data_set) { 
	            var key = null; 
	            for(key in data_set.data) { 
	              $.extend(data_set.data[key],{label:String(data_set.data[key].text).initCap()}) 
	            } 
	             
	            response(data_set.data); 
	          }, 
	          error: function(e, t, m) { 
	            main._error_handler(e.responseJSON[0]); 
	          } 
	        }); 
	      }, 250, false), 
	      response: function(event, ui) { 
	        /*if (ui.content.length == 0) { 
	          //$el.next('small').show().text($.i18n.t('markup.no_result')).i18n(); 
	          //$el.addClass('red-border'); 
	        } else { 
	          //$el.removeClass('red-border'); 
	          //$el.next('small').hide().text(''); 
	        }*/ 
	      }, 
	      change: function(event, ui) { 
	        if (ui.item != null) { 
	          //$el.attr('data-id', ui.item.id); 
	          //$el.removeClass('red-border'); 
	          //$el.next('small').hide().text(''); 
	        } else { 
	          // $el.val('').removeAttr('data-id'); 
	        } 
	      }, 
	      select: function(event, ui) { 
	        $el.attr('data-id', ui.item.id); 

	        if (section == 'suppliers') {
	        	city_mapping.city_id = ui.item.id;
	        	city_mapping._get_suppliers();
	        } else if (section === 'country') {
				country_mapping.country_id = ui.item.id;
				country_mapping._get_suppliers();
			}
	      } 
	    }); 
  	},

  	_page_refresh : function() {
  		var self = this;
  		$.ajax ({
            type    	: "POST",
            url     	:  main.base_url + 'pageIsRefreshed',           
            dataType	: "JSON",
            cache 		: false,
   
            beforeSend : function(xhr) {
            	xhr.setRequestHeader('Authorize', self.getCookie('token'));
            },

            success : function(data) {


            }           
    	});	

    	return false;
  	}, 

  	render_stars: function(stars) { 
	    var self = this, 
	      accepted_num = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5], 
	      html = ''; 
	    if ($.inArray(stars, accepted_num) || stars === 1) { // added because of not reading 1 star 
	      if (self.is_int(stars)) { 
	        for (var i = 1; i <= 5; i++) { 
	          if (i <= stars) { 
	            html = html + '<i class="fa fa-star"></i>'; 
	          } else { 
	            html = html + '<i class="fa fa-star-o"></i>'; 
	          } 
	        } 
	      } else { 
	        if (stars == 1.5) { 
	          html = '<i class="fa fa-star"></i><i class="fa fa-star-half-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>'; 
	        } else if (stars == 2.5) { 
	          html = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-half-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>'; 
	        } else if (stars == 3.5) { 
	          html = '<i class="fa fa-star"><i class="fa fa-star"></i><i class="fa fa-star"></i></i><i class="fa fa-star-half-o"></i><i class="fa fa-star-o"></i>'; 
	        } else if (stars == 4.5) { 
	          html = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-half-o"></i>'; 
	        } 
	      } 
	    } else { 
	      if (stars === 0 || stars === -1) { // Nahids code: added arguement for -1 return from backend 
	        html = '<i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>'; 
	      } 
	    } 
	    return html; 
	  } 
		//end of code
};
var main = new main_app(window.location.protocol);
main.initConfig();

String.prototype.initCap = function() {
	return this.toLowerCase().replace(/(?:^|\s)[a-z]/g, function(m) {
		return m.toUpperCase();
	});
};

$.imgError = function(image) {
    image.onerror = "";
    image.src = "view/assets/images/no_image1.jpg";
    return true;
}

$.imgError1 = function(image) {
	image.onerror = "";
	image.src = "view/assets/images/no_image.jpg";
	return true;
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this,
			args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
