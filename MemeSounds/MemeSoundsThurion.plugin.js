/**
 * @name MemeSoundsThurion
 * @version 0.7.9
 * @description Plays Memetastic sounds depending on what is being sent in chat. This was heavily inspired by the idea of Metalloriff's bruh plugin so go check him out!
 * @author Thurion#8885
 * @authorId 219612697002508288
 * @authorLink https://github.com/Thurion666/
 * @source https://github.com/Thurion666/BetterDiscordPlugins/blob/main/MemeSounds/MemeSoundsThurion.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Thurion666/BetterDiscordPlugins/main/MemeSounds/MemeSoundsThurion.plugin.js
 */

 module.exports = (() => {
	
	/* Configuration */
	const config = {info: {name: "Meme Sounds Thurion", authors: [{name: "Thurion#8885", discord_id: "219612697002508288", github_username: "Thurion666", twitter_username: "Thurión"}], version: "0.7.9", description: "Plays Memetastic sounds depending on what is being sent in chat. This was heavily inspired by the idea of Metalloriff's bruh plugin so go check him out!", github: "https://github.com/Thurion666/BetterDiscordPlugins/blob/main/MemeSounds/MemeSoundsThurion.plugin.js", github_raw: "https://raw.githubusercontent.com/Thurion666/BetterDiscordPlugins/main/MemeSounds/MemeSoundsThurion.plugin.js"}, defaultConfig: [{id: "setting", name: "Sound Settings", type: "category", collapsible: true, shown: true, settings: [{id: "LimitChan", name: "Limit to the current channel only.", note: "When enabled, sound effects will only play within the currently selected channel.", type: "switch", value: true}, {id: "delay", name: "Sound effect delay.", note: "The delay in miliseconds between each sound effect.", type: "slider", value: 200, min: 10, max: 1000, renderValue: v => Math.round(v) + "ms"}, {id: "volume", name: "Sound effect volume.", note: "How loud the sound effects will be.", type: "slider", value: 1, min: 0.01, max: 1, renderValue: v => Math.round(v*100) + "%"}]}], changelog: [{title: "New", items: ["New sounds!"]},{title: "new sounds", items: ["Jesus", "Dicks", "huh", "Boii","Nuclear", "Garbage", "Aim"]}]};

	/* Library Stuff */
	return !global.ZeresPluginLibrary ? class {
		constructor() { this._config = config; }
        getName() {return config.info.name;}
        getAuthor() {return config.info.authors.map(a => a.name).join(", ");}
        getDescription() {return config.info.description;}
        getVersion() {return config.info.version;}
		load() {BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {confirmText: "Download Now", cancelText: "Cancel", onConfirm: () => {require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (err, res, body) => {if (err) return require("electron").shell.openExternal("https://betterdiscord.app/Download?id=9"); await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));});}});}
		start() { }
		stop() { }
	} : (([Plugin, Api]) => {

		const plugin = (Plugin, Api) => { try {
			
			/* Constants */
			const {DiscordModules: {Dispatcher, SelectedChannelStore}} = Api;
			const sounds = [
				{re: /no?ice/gmi, file: "noice.mp3", duration: 600},
				{re: /bazinga/gmi, file: "bazinga.mp3", duration: 550},
				{re: /oof/gmi, file: "oof.mp3", duration: 250},
				{re: /bruh/gmi, file: "bruh.mp3", duration: 470},
				{re: /pain/gmi, file: "pain.mp3", duration: 470},
				{re: /nigga/gmi, file: "itai.mp3", duration: 3000},
				{re: /bpm/gmi, file: "bpm.mp3", duration: 4000},
				{re: /ara ara/gmi, file: "ara ara.mp3", duration: 400},
				{re: /bye/gmi, file: "bye.mp3", duration: 1200},
				{re: /mor?e? power baby/gmi, file: "baby.mp3", duration: 1500},
				{re: /coffee/gmi, file: "coffee.mp3", duration: 600},
				{re: /drink/gmi, file: "drink.mp3", duration: 700},
				{re: /emotional damage/gmi, file: "emotional damage.mp3", duration: 2000},
				{re: /hello there/gmi, file: "hello there.mp3", duration: 700},
				{re: /ho yah/gmi, file: "ho yah.mp3", duration: 2000},
				{re: /knock knock/gmi, file: "knock knock.mp3", duration: 5000},
				{re: /kyle/gmi, file: "kyle.mp3", duration: 1200},
				{re: /let'?s do this/gmi, file: "lets do this.mp3", duration: 1100},
				{re: /let'?s go/gmi, file: "lets go.mp3", duration: 3000},
				{re: /macaroni/gmi, file: "macaroni.mp3", duration: 6500},
				{re: /nashe/gmi, file: "nashe.mp3", duration: 4100},
				{re: /ookay/gmi, file: "ok.mp3", duration: 300},
				{re: /w?a?k?y? ?waky/gmi, file: "waky.mp3", duration: 3100},
				{re: /wtf/gmi, file: "wtf.mp3", duration: 8300},
				{re: /yeet/gmi, file: "yeet.mp3", duration: 1800},
				{re: /hog rider/gmi, file: "hog rider.mp3", duration: 3000},
				{re: /jijijija/gmi, file: "jijijija.mp3", duration: 900},
				{re: /boomer/gmi, file: "ok boomer.mp3", duration: 1100},
				{re: /ah shit/gmi, file: "ah shit.mp3", duration: 3000},
				{re: /disappointment/gmi, file: "disappointment.mp3", duration: 5600},
				{re: /hot hot/gmi, file: "hot hot.mp3", duration: 3400},
				{re: /error/gmi, file: "windows xp error.mp3", duration: 800},
				{re: /nope/gmi, file: "nope.mp3", duration: 400},
				{re: /eat/gmi, file: "minecraft eat.mp3", duration: 1600},
				{re: /nokia/gmi, file: "nokia.mp3", duration: 7600},
				{re: /waiting/gmi, file: "waiting elevator.mp3", duration: 12000},
				{re: /depression/gmi, file: "crippling depression.mp3", duration: 2400},
				{re: /virus/gmi, file: "computer virus.mp3", duration: 2000},
				{re: /oh pog/gmi, file: "oh pog.mp3", duration: 6700},
				{re: /aña/gmi, file: "pekka aña.mp3", duration: 1200}, 
				{re: /w?o?m?p? ?womp!/gmi, file: "womp.mp3", duration: 11000},
				{re: /br?ekfast/gmi, file: "bekfast.mp3", duration: 1000},
				{re: /hello motherfucker/gmi, file: "hello motherfucker.mp3", duration: 1100},
				{re: /stone/gmi, file: "stone.mp3", duration: 800},
				{re: /zombie/gmi, file: "zombie.mp3", duration: 1100},
				{re: /shyyO/gmi, file: "shyyO.mp3", duration: 400},
				{re: /lemme smash/gmi, file: "lemme smash.mp3", duration: 1100},
				{re: /can'?t believe/gmi, file: "cant believe.mp3", duration: 2600},
				{re: /step bro/gmi, file: "step bro.mp3", duration: 3000},
				{re: /here we go/gmi, file: "here we go.mp3", duration: 1500},
				{re: /ahhh/gmi, file: "ahhh.mp3", duration: 1500},
				{re: /sucking? on my tiddies?/gmi, file: "suckin.mp3", duration: 44900},
				{re: /jesus/gmi, file: "jesus.mp3", duration: 2500},
				{re: /dicks/gmi, file: "dicks.mp3", duration: 1000},
				{re: /huh/gmi, file: "huh.mp3", duration: 700},
				{re: /boii/gmi, file: "boii.mp3", duration: 1000},
				{re: /nuclear/gmi, file: "nuclear.mp3", duration: 6000},
				{re: /garbage/gmi, file: "garbage.mp3", duration: 4000},
				{re: /boii/gmi, file: "boii.mp3", duration: 1000}
			];

			/* Double message event fix */
			let lastMessageID = null;

			/* Meme Sounds Class */
			return class MemeSounds extends Plugin {
				constructor() {
					super();
				}

				getSettingsPanel() {
					return this.buildSettingsPanel().getElement();
				}
	
				onStart() {
					Dispatcher.subscribe("MESSAGE_CREATE", this.messageEvent);
				}
				
				messageEvent = async ({ channelId, message, optimistic }) => {
					if (this.settings.setting.LimitChan && channelId != SelectedChannelStore.getChannelId())
						return;

					if (!optimistic && lastMessageID != message.id) {
						lastMessageID = message.id;
						let queue = new Map();
						for (let sound of sounds) {
							for (let match of message.content.matchAll(sound.re))
								queue.set(match.index, sound);
						}
						for (let sound of [...queue.entries()].sort((a, b) => a[0] - b[0])) {
							let audio = new Audio("https://github.com/Thurion666/BetterDiscordPlugins/raw/main/MemeSounds/Sounds/"+sound[1].file);
							audio.volume = this.settings.setting.volume;
							audio.play();
							await new Promise(r => setTimeout(r, sound[1].duration+this.settings.setting.delay));
						}
					}
					
				};
				
				onStop() {
					Dispatcher.unsubscribe("MESSAGE_CREATE", this.messageEvent);
				}
			}
		} catch (e) { console.error(e); }};
		return plugin(Plugin, Api);
	})(global.ZeresPluginLibrary.buildPlugin(config));
})();
