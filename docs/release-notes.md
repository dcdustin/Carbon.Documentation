# Release Notes
## Latest Update
Latest production release build changelog based on the [production branch](https://github.com/CarbonCommunity/Carbon.Core/tree/production).

<Badge type="info" text="Current Version: 2.0.181" style="text-align:center; width:195px" /> <br>
<CarbonButton href="https://github.com/CarbonCommunity/Carbon.Core/releases/tag/production_build" text="Download Latest" icon="clouddownload" external/> <br>
<Badge type="info" text="21.03.2025 1:58PM GMT+1" style="text-align:center; width:195px" />
## Current Changes

<CarbonChange variant="add" text="Added `-harmonydir` which allows you to modify the directory path of HarmonyMods." style="font-size:15px" />
<CarbonChange variant="add" text="Added `harmony.mods` admin command which prints a list of all currently loaded HarmonyMods (mods processed by Rust)." style="font-size:15px" />
<CarbonChange variant="add" text="Added HookUpdates in the carbon/config.json file (replaces +carbon.skiphookupdates logic)." style="font-size:15px" />
<CarbonChange variant="add" text="Added patch priority/order to [AutoPatch]. [More info here](https://docs.carbonmod.gg/docs/collaborate/adding-hooks/plugin-patches-hooks#automatic-way)." style="font-size:15px" />
<CarbonChange variant="fix" text="[Admin Module] Fixed occasional Entities tab NRE (ending the spectate of a player that became forsaken)." style="font-size:15px" />
<CarbonChange variant="fix" text="[Admin Module] Fixed spectating UI not updating accordingly when spectating players that go to sleep/disconnect." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed `Checksum validation failure` warnings prohibiting hooks becoming patched." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed float value precision (Pitereq's fix for LUI builder) - fixes Carbon panel range options malfunctioning." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed rare NRE in Carbon.Bootstrap occasionally created by specific plugins." style="font-size:15px" />
<CarbonChange variant="update" text="Moved `[AutoPatch]` processing logic to BaseHookable (from RustPlugin) so modules also get processed." style="font-size:15px" />
<CarbonChange variant="update" text="Updated CarbonAuto chat options to be taken into account when printing `Unknown command` messages to game chat (eg. avatar)." style="font-size:15px" />
<CarbonChange variant="misc" text="Don't attempt to unpatch methods if we didn't patch any." style="font-size:15px" />
<CarbonChange variant="misc" text="No longer assign ownership on F1 console spawned items if `c.nogivenotices` is enabled." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed CorePlugin autopatch override." style="font-size:15px" />

## Older Changes
The following are archived changes of older releases of Carbon. Publicly, we only ship the very latest version of Carbon as older ones are out of support.

:::details 2.0.178 <CarbonBadge type="date" text="Released on 12.03.2025 3:40AM GMT+1" />

<CarbonChange variant="add" text="Added `-harmonydir` which allows you to modify the directory path of HarmonyMods." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.createplugin` which creates a new blank plugin with the `OnServerInitialized` hook." style="font-size:15px" />
<CarbonChange variant="add" text="Added brand new LUI system, an ultra-fast CUI building system (thanks ThePitereq!)." style="font-size:15px" />
<CarbonChange variant="add" text="Added Carbon.Generator.Shared reference." style="font-size:15px" />
<CarbonChange variant="add" text="Added Carbon.Profiler (and included it into Roslyn)." style="font-size:15px" />
<CarbonChange variant="add" text="Added failsafe deprecated extension to redirect plugins using Effect.Clear with a boolean parameter, to compile and properly execute on staging/next update." style="font-size:15px" />
<CarbonChange variant="fix" text="[Vanish Module] Fixed vanish icon and text remaining on-screen after waking up from dying." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed an issue where `timer.Reset` wouldn't properly reset the timer's delay." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed missing Carbon.Native build from Release builds." style="font-size:15px" />
<CarbonChange variant="update" text="[Admin Module] Pinned config editor options." style="font-size:15px" />
<CarbonChange variant="update" text="[Admin Module] Pinned Configuration tab options at the top." style="font-size:15px" />
<CarbonChange variant="update" text="[Admin Module] Pinned Plugins tab search bar." style="font-size:15px" />
<CarbonChange variant="update" text="Significantly optimized CUI building speed." style="font-size:15px" />
<CarbonChange variant="misc" text="[Admin Module] Optimized local methods in a few places by changing them from local to static." style="font-size:15px" />
<CarbonChange variant="misc" text="[Vanish Module] Moved the vanish UI in the `Under` UI layer." style="font-size:15px" />
<CarbonChange variant="misc" text="Enforce publicisation for Rust.FileSystem.dll." style="font-size:15px" />
<CarbonChange variant="misc" text="Inject UnityEngine.AssetBundleModule into the Roslyn compiler." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed default values for ScrollView." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed hook generator code from HookCaller and moved it to Carbon.Generator.Shared." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed LogSpamCleanup patch (Facepunch removed the log)." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed unused mask softness property from CUI." style="font-size:15px" />

:::
:::details 2.0.171 <CarbonBadge type="date" text="Released on 21.02.2025 6:02PM GMT+1" />

<CarbonChange variant="add" text="[Admin Module] **Completely revamped the Plugins tab**." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added informational message under Configurations->ConVars tab (regarding values not being saved deliberately)." style="font-size:15px" />
<CarbonChange variant="add" text="[AutoWipe Module] Added `WipeChatCommand` which defaults to nothing, can be set with `autowipe.wipechat` so anyone can run `/wipe` to see when the next wipe happens." style="font-size:15px" />
<CarbonChange variant="add" text="[AutoWipe Module] Added string replacements for [WIPE_DAY], [WIPE_MONTH] etc of the server name." style="font-size:15px" />
<CarbonChange variant="add" text="[Vanish Module] Added offset values for vanishing icon and reset previous anchor values." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.changeversion` (It changes the current Carbon version you're running. Next reboot will swap to the overriden version. Run `c.changeversion` for syntax.)." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.delete` and `c.deleteext` admin commands." style="font-size:15px" />
<CarbonChange variant="fix" text="[Admin Module] Fixed instances where vendor plugins would not properly pair up with loaded plugins." style="font-size:15px" />
<CarbonChange variant="fix" text="[Admin Module] Fixed issue where favorited plugins would not save upon reboot." style="font-size:15px" />
<CarbonChange variant="fix" text="[Admin Module] Fixed plugin uninstalling process." style="font-size:15px" />
<CarbonChange variant="fix" text="[GatherManager Module] Fixed inaccurate values when gathering resource dispensers." style="font-size:15px" />
<CarbonChange variant="fix" text="[Vanish Module] Fixed situations where players loading into the server vanished, don't have vanished perks." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed casting a plugin to bool returning false even if the instance is alive without considering if the plugin has initialized." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed situations where `[Permission]` attribute response would not be replied to in the same context." style="font-size:15px" />
<CarbonChange variant="update" text="[Admin Module] Improved config editing error handling." style="font-size:15px" />
<CarbonChange variant="update" text="Updated various places where documenting syntax and help descriptions with updated information." style="font-size:15px" />
<CarbonChange variant="misc" text="[Admin Module] Reduced unecessary data processing and unused code in the Plugins tab." style="font-size:15px" />
<CarbonChange variant="misc" text="[Vanish Module] Implemented various optimizations and reusable effect instances." style="font-size:15px" />
<CarbonChange variant="misc" text="Fixed moderator group being granted to auth level 2 users." style="font-size:15px" />
<CarbonChange variant="misc" text="Made no permission, no group and no auth level client chat/console command returns phrased and translatable." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed Library from Timer." style="font-size:15px" />

:::
:::details 2.0.170 <CarbonBadge type="date" text="Released on 07.02.2025 8:41PM GMT+1" />

<CarbonChange variant="add" text="Added ReloadAllPlugins (compat)." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed returning types of OxideMod.LoadPlugin/ReloadPlugin." style="font-size:15px" />
<CarbonChange variant="update" text="Updated [AutoWipe module](https://docs.carbonmod.gg/docs/core/modules/autowipe-module)." style="font-size:15px" />
<CarbonChange variant="update" text="Updated Harmony to v2.3.5." style="font-size:15px" />
<CarbonChange variant="misc" text="Enforce publicized default assemblies in the config." style="font-size:15px" />
<CarbonChange variant="misc" text="Execute self updating process relative to Carbon root path (`-carbon.rootdir`)." style="font-size:15px" />
<CarbonChange variant="misc" text="Handle reloaded plugins on server shutdown." style="font-size:15px" />
<CarbonChange variant="misc" text="Include `Carbon.Hooks.Oxide.dll` and `Carbon.Hooks.Community.dll` in the patch (applies to all Carbon builds)." style="font-size:15px" />
<CarbonChange variant="remove" text="Stripped irrelevant configuration from Preloader." style="font-size:15px" />

:::
:::details 2.0.167 <CarbonBadge type="date" text="Released on 30.01.2025 10:00PM GMT+1" />

<CarbonChange variant="add" text="[Admin Module] Added Codefling login analytic." style="font-size:15px" />
<CarbonChange variant="add" text="Added [AutoWipe module](https://docs.carbonmod.gg/docs/core/modules/autowipe-module)." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.editconfig` which when called by an admin client, will open up a json config at a relative path (eg. carbon/config.json) and allow you edit it in Carbon's panel." style="font-size:15px" />
<CarbonChange variant="add" text="Added `GetMessageByLanguage`." style="font-size:15px" />
<CarbonChange variant="add" text="Added `OnCarbonVanished(BasePlayer)` and `OnCarbonUnvanished(BasePlayer)` hook calls whenever players use Vanish." style="font-size:15px" />
<CarbonChange variant="add" text="Added alias warning whenever trying to assign an alias on an already existent Rust command." style="font-size:15px" />
<CarbonChange variant="add" text="Added Carbon.Startup, which handles Oxide migration and publicization/patching whereas Carbon.Preloader solely only handles self-updating." style="font-size:15px" />
<CarbonChange variant="add" text="Added default conditional compilation symbol `OXIDE_PUBLICIZED`." style="font-size:15px" />
<CarbonChange variant="add" text="Added developer mode." style="font-size:15px" />
<CarbonChange variant="add" text="Added GC events flag in Shift+REC profiles in the Profiler tab (enabled by default)." style="font-size:15px" />
<CarbonChange variant="add" text="Added hook exception tracking (plugin total and per-hook instance)." style="font-size:15px" />
<CarbonChange variant="add" text="Added missing RustExtensionMethods (compatibility with Oxide)." style="font-size:15px" />
<CarbonChange variant="add" text="Added missing RustExtensionMethods (compatibility with Oxide)." style="font-size:15px" />
<CarbonChange variant="add" text="Added publicized assemblies config." style="font-size:15px" />
<CarbonChange variant="add" text="Added publicizer blacklist config options." style="font-size:15px" />
<CarbonChange variant="add" text="Added silly goose proof handling for people assigning a command with the same assigning key as value (creating stackoverflows)." style="font-size:15px" />
<CarbonChange variant="fix" text="[Admin Module] Fixed file path when downloading files through the Plugins tab." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed Rust console occasional NRE (when disabling Rust console, aka `-noconsole`)." style="font-size:15px" />
<CarbonChange variant="update" text="Load all in-memory patched assemblies before Unity does (so ours have priority)." style="font-size:15px" />
<CarbonChange variant="update" text="No longer write patched/publicized assemblies to disk (keeping Rust entirely vanilla)." style="font-size:15px" />
<CarbonChange variant="update" text="Optimized hook calling slightly by reducing allocs when checking hook conflicts." style="font-size:15px" />
<CarbonChange variant="update" text="Updated Carbon-called commands to use a cached argument buffer." style="font-size:15px" />
<CarbonChange variant="misc" text="Automatically remove predefined aliases for `harmony.load` -> `c.harmonyload` and unload." style="font-size:15px" />
<CarbonChange variant="misc" text="Export all in-memory patched assemblies to `carbon/developer/patched_assemblies` directory." style="font-size:15px" />
<CarbonChange variant="misc" text="Inject `Cronos` into Roslyn compiler." style="font-size:15px" />
<CarbonChange variant="misc" text="Made `IOnServerInitialized` a callable hook." style="font-size:15px" />
<CarbonChange variant="misc" text="Show internal/hidden hooks in `c.hooks`." style="font-size:15px" />
<CarbonChange variant="misc" text="Stripped away all self-updating code and moved to Carbon.Startup." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed Carbon Harmony processors (switched to using Rust vanilla)." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed HarmonyWatchers config + command." style="font-size:15px" />

:::
:::details 2.0.164 <CarbonBadge type="date" text="Released on 02.01.2025 7:30PM GMT+2" />

<CarbonChange variant="add" text="Added `c.devdump` - Creates a zip package in the temporary directory of the Carbon folder with useful information (output log & profile snapshot)." style="font-size:15px" />
<CarbonChange variant="add" text="Added Facepunch Steam references into Roslyn compiler." style="font-size:15px" />
<CarbonChange variant="add" text="Added StackWalk allocations option to the Shift+REC modal, as well as timeline recording." style="font-size:15px" />
<CarbonChange variant="misc" text="Fire 'LoadDefaultConfig' as a hook on the plugin if plugins don't override the method." style="font-size:15px" />
<CarbonChange variant="misc" text="Reload harmony mods when running `harmony.load` and the mod is already loaded." style="font-size:15px" />
<CarbonChange variant="misc" text="Stripped away Harmony v1 support." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed HAB bump debug log spam fix." style="font-size:15px" />

:::
:::details 2.0.155 <CarbonBadge type="date" text="Released on 14.11.2024 0:45AM GMT+2" />

<CarbonChange variant="add" text="Added `ConfigVersionChecks` override to BaseModule, enabled by default." style="font-size:15px" />
<CarbonChange variant="add" text="Added CuiRawImageComponent.SteamId property which is used for placing the steam avatar on the image." style="font-size:15px" />
<CarbonChange variant="add" text="Added default `moderator` group which gets auto-granted/revoked when players are in/out the auth-level 1 group." style="font-size:15px" />
<CarbonChange variant="add" text="Added early injection of a new player in the permissions database on `CanUserLogin`." style="font-size:15px" />
<CarbonChange variant="add" text="Added pooling across all instances where CarbonEventArgs is passed through our processors." style="font-size:15px" />
<CarbonChange variant="add" text="Added SelectiveEAC module - disabled by default, permission and group based system selectively allowing admin users to enter a `server.secure 1` server bypassing EAC authentication." style="font-size:15px" />
<CarbonChange variant="fix" text="[Vanish Module] Always perform Enter/Leave triggers properly when vanished." style="font-size:15px" />
<CarbonChange variant="fix" text="[Vanish Module] Fixed players vanishing on Cargo Ship or other parent triggers being detached." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed `c.reload` not attempting to load up unloaded plugins." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed certain same-named hooks getting fired when they shouldn't in plugins/modules." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed Lang NRE (thanks Kulltero!)." style="font-size:15px" />
<CarbonChange variant="misc" text="[Vanish Module] Made vanishing and unvanishing effects configurable." style="font-size:15px" />
<CarbonChange variant="misc" text="Fullscreen tabs for config editing when doing setup wizard." style="font-size:15px" />
<CarbonChange variant="misc" text="Improved analytics performance." style="font-size:15px" />
<CarbonChange variant="misc" text="Notify user when a compilation started upon running `c.load` or `c.reload` on an unloaded file." style="font-size:15px" />
<CarbonChange variant="misc" text="Pooled various instances of CarbonEventArgs and ModuleEventArgs." style="font-size:15px" />
<CarbonChange variant="misc" text="Record constructor failure as a compilation failure once thrown (Thank's BugMan!)." style="font-size:15px" />
<CarbonChange variant="misc" text="Shifted preinit callback to fire before the constructor." style="font-size:15px" />
<CarbonChange variant="remove" text="[ModeratorTools Module] Removed obsolete patch." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed obsolete `PoolEx` methods." style="font-size:15px" />

:::
:::details 2.0.143 <CarbonBadge type="date" text="Released on 03.10.2024 6:59PM GMT+2" />

<CarbonChange variant="add" text="Added `c.grant group xx *` and `c.revoke user xx *` (wildcard) options." style="font-size:15px" />
<CarbonChange variant="add" text="Added obsolete attribute on custom dictionary/stringbuilder Carbon pool methods (will be removed on Nov. 7th 2024)." style="font-size:15px" />
<CarbonChange variant="add" text="Added Plugins.GetAllNonAlloc." style="font-size:15px" />
<CarbonChange variant="add" text="Added SelectiveEAC module - disabled by default, permission and group based system selectively allowing admin users to enter a `server.secure 1` server bypassing EAC authentication." style="font-size:15px" />
<CarbonChange variant="fix" text="[Admin Module] Fixed setup wizard with latest changes." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed situations when hooks accessing the permissions system in the CanUserLogin user access and refreshing is too late." style="font-size:15px" />
<CarbonChange variant="update" text="Improved Carbon.Entities." style="font-size:15px" />
<CarbonChange variant="update" text="Improved ImageDatabase performance and reliability." style="font-size:15px" />
<CarbonChange variant="update" text="Renamed Optimisations to Circular Networking since that's what it is." style="font-size:15px" />

:::
:::details 2.0.132 <CarbonBadge type="date" text="Released on 05.09.2024 7:22PM GMT+2" />

<CarbonChange variant="add" text="[Admin Module] Added player wetness properties to the Entities and Players tab." style="font-size:15px" />
<CarbonChange variant="add" text="[Gather Manager Module] Include caught fish and scale collected amount based on module settings." style="font-size:15px" />
<CarbonChange variant="add" text="Added `PoolEx.FreeRaycastHitList` used by the codegen system (possibly a bandaid fix)." style="font-size:15px" />
<CarbonChange variant="add" text="Added ImageDatabase.Queue for singular images (key/url or just url)." style="font-size:15px" />
<CarbonChange variant="add" text="Added more timer formats to Countdown (according to https://github.com/Facepunch/Rust.Community/pull/63)." style="font-size:15px" />
<CarbonChange variant="add" text="Added multiple plugin name support for `c.reload`, `c.unload` and `c.load` commands (eg. `c.reload PluginA PluginB PluginC`)." style="font-size:15px" />
<CarbonChange variant="add" text="Added NotoSansArabicBold to Carbon's CUI." style="font-size:15px" />
<CarbonChange variant="add" text="Added pooling to ImageDatabase and sped processing up from 500ms to frame time." style="font-size:15px" />
<CarbonChange variant="fix" text="[Admin Module] Fixed Codefling thumbnails and larger scale thumbnail (as well as first frame of gifs are being now used)." style="font-size:15px" />
<CarbonChange variant="fix" text="Corrected multithreaded notice/informative logging color (grey)." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed CUI server induced client NRE (this also fixes CUI updating): Forcefully serialize all properties instead of skipping defaults." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed plugin class and namespace identification: fixes cases where plugins would have nested namespaces or other types above the main plugin type." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed situations where default plugin messages/lang phrases would be loaded multiple times." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed whenever having `skipassetwarmup_crashes` enabled, Carbon would be executing OnServerInitialized too early." style="font-size:15px" />
<CarbonChange variant="update" text="[Admin Module] Updated the 'Local' subtab to 'Installed' under the Plugins tab." style="font-size:15px" />
<CarbonChange variant="update" text="Updated `c.reload`: No longer recompile manually reloaded plugins if there are no changes, and reuse runtime assemblies of said plugins to create the plugin type instance." style="font-size:15px" />
<CarbonChange variant="update" text="Updated `c.reload`: Recompile if script watchers is disabled." style="font-size:15px" />
<CarbonChange variant="update" text="Updated `c.reload`: Recompile the plugin if profiler tracking status changed for the scripts." style="font-size:15px" />
<CarbonChange variant="update" text="Updated Carbon's logging system to print logs executed in different threads to Rust's native output log." style="font-size:15px" />
<CarbonChange variant="update" text="Updated DepotDownloader to use the latest commit." style="font-size:15px" />
<CarbonChange variant="update" text="Updated various repositories with respect to the new `Facepunch.Pool` updates." style="font-size:15px" />
<CarbonChange variant="update" text="Updates to Carbon's `Assemblies` and dynamic library monitoring." style="font-size:15px" />
<CarbonChange variant="misc" text="No longer print suggestion log in console if the command string is null or empty." style="font-size:15px" />
<CarbonChange variant="remove" text="[Admin Module] Removed server event toast config." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed Carbon.Assemblies `Unload` calls." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed extra clears for Carbon's PoolEx extensions (since Rust's Facepunch.Pool handles it all now)." style="font-size:15px" />

:::
:::details 2.0.126 <CarbonBadge type="date" text="Released on 15.08.2024 4:56AM GMT+2" />

<CarbonChange variant="add" text="Added `Carbon.Defines.GetHooksFolder`." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed `lang` NRE." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed Carbon NuGet to use the latest API key (yearly renewed) and removed old versions." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed issue in CallHook with the object array of arguments, using index 13 instead of 12." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed issue where admin module not storing quick actions to file when changed." style="font-size:15px" />
<CarbonChange variant="update" text="Changed loading of plugins to finalize before Asset Warmup and only load Asset Warmup when all Carbon systems are online." style="font-size:15px" />
<CarbonChange variant="update" text="Close the file panel before executing the OnConfirm/OnClose callbacks (so users don't click on buttons multiple times if the action takes a while)." style="font-size:15px" />
<CarbonChange variant="update" text="Optimized `Carbon.Community.Protect` to cache its values using the input as key." style="font-size:15px" />
<CarbonChange variant="update" text="Renamed TimerFormats -> TimerFormat." style="font-size:15px" />
<CarbonChange variant="update" text="Upgraded Microsoft.CodeAnalysis.CSharp from 4.9.0-3.final [prerelease] -> 4.10.0." style="font-size:15px" />
<CarbonChange variant="update" text="Upgraded Roslyn from 4.9.0 -> 4.12.4." style="font-size:15px" />
<CarbonChange variant="misc" text="Initial iteration at adding summary comments across the entire project." style="font-size:15px" />
<CarbonChange variant="misc" text="No longer add post batch failed requirees multiple times." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed Carbon.Common.Client." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed unnecessary copyright notice from the top of each file since it falls back to the project license." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed various unused references from unrelated repository projects." style="font-size:15px" />

:::
:::details 2.0.122 <CarbonBadge type="date" text="Released on 23.07.2024 12:23PM GMT+2" />

<CarbonChange variant="add" text="Added `UnsubscribeAll` and `GetHookSubscribers(string identifier)` to patch manager." style="font-size:15px" />
<CarbonChange variant="add" text="Added File browser module." style="font-size:15px" />
<CarbonChange variant="add" text="Added Profiler serialization and comparison mode (protocolized)." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixes, improvements and optimizations to `Community.Protect`." style="font-size:15px" />
<CarbonChange variant="update" text="Updated `c.harmonymods` to use Carbon's `Assemblies`." style="font-size:15px" />
<CarbonChange variant="misc" text="Filtered out command execution for `no_input` (default value of key binds without a command defined)." style="font-size:15px" />
<CarbonChange variant="misc" text="No longer post process converted by default harmony mods as all the logic happens in the converter." style="font-size:15px" />
<CarbonChange variant="misc" text="Profiles store non-incremented values of incrementative assemblies which get used for comparison purpose." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed Carbon.Common.Client from compiler whitelist." style="font-size:15px" />

:::
:::details 2.0.114 <CarbonBadge type="date" text="Released on 04.07.2024 06:52PM GMT+2" />

<CarbonChange variant="add" text="Added Carbon.Assemblies which tracks ALL Carbon processed assemblies." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed `del` command patch not properly error handling." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed certain errors occurring in LoadPlugin when plugin was invalid/non-existent." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed multi-word Carbon Auto convar values not properly applying upon restart." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed Profiler incrementals." style="font-size:15px" />
<CarbonChange variant="fix" text="Various fixes in the ImageDatabase module." style="font-size:15px" />
<CarbonChange variant="update" text="Improvements to the newly implemented Carbon Integration Test system." style="font-size:15px" />
<CarbonChange variant="misc" text="No longer attempt to convert Harmony mods if they're processable." style="font-size:15px" />
<CarbonChange variant="misc" text="No longer default to ClientPanels.OverlayNonScaled, which affects existent CUI panels." style="font-size:15px" />
<CarbonChange variant="misc" text="No longer run OnDisabled / OnEnabled on modules when using `c.loadmodule`." style="font-size:15px" />
<CarbonChange variant="misc" text="No longer save data + groups when SetLanguage happens." style="font-size:15px" />
<CarbonChange variant="misc" text="Optimized C4C model networking to use Rust's snapshot system." style="font-size:15px" />
<CarbonChange variant="misc" text="Show more accurate warning in the Carbon profiler tab when things went wrong upon boot." style="font-size:15px" />
<CarbonChange variant="misc" text="Show more accurate warning in the Carbon profiler tab when things went wrong with its loading." style="font-size:15px" />
<CarbonChange variant="misc" text="Updated cleanup process upon data + group saving and cleared leftover memory whenever it happens." style="font-size:15px" />
<CarbonChange variant="misc" text="Various ImageDatabase improvements & callback fixes." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed scaling in ImageDatabase (fixing GDI+ issues)." style="font-size:15px" />

:::
:::details 2.0.105 <CarbonBadge type="date" text="Released on 06.06.2024 08:21AM GMT+2" />

<CarbonChange variant="add" text="[Admin Module] Added confirmation dialog whenever changing hostname (Carbon tab)." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added max players option with confirmation (Carbon tab)." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added Plugins tab vendor reliant and informative error handling for endpoints in case they go down." style="font-size:15px" />
<CarbonChange variant="add" text="**Added Carbon self-updating** and according configuration." style="font-size:15px" />
<CarbonChange variant="add" text="Added `BaseHookable.ManualSubscriptions`." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.custommapname` which changes the map displayed in the server browser (CarbonAuto)." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.lang` which sets the server language." style="font-size:15px" />
<CarbonChange variant="add" text="Added `Plugin.ManualCommands` and `BaseModule.ManualCommands`." style="font-size:15px" />
<CarbonChange variant="add" text="Added admin and player default group error handling for if it becomes null upon config loading." style="font-size:15px" />
<CarbonChange variant="add" text="Added Carbon analytics config option (enabled by default - it's entirely anonymous and helps us improve)." style="font-size:15px" />
<CarbonChange variant="add" text="Added Carbon module and extension hotloading (and respective file watching configurations)." style="font-size:15px" />
<CarbonChange variant="add" text="Added Overall, OverlayNonScaled and UnderNonScaled client panels to Carbon's CUI." style="font-size:15px" />
<CarbonChange variant="add" text="Added Unity Component cache Carbon component." style="font-size:15px" />
<CarbonChange variant="add" text="Allow custom parent string in CreateContainer (CUI) (thanks SegFault!)." style="font-size:15px" />
<CarbonChange variant="fix" text="[Admin Module] Fixed CanAccessAdminModule hook." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed `OnPlayerCommand` not firing at the right time." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed hook argument resizing causing inconsistency and data loss to argument values." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed logging issue where exception logs are being printed only on RustPlayer hookables when there are commands or timer failures." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed malformed material in the Carbon Profiler CUI." style="font-size:15px" />
<CarbonChange variant="update" text="Renamed ICarbonModule to `IModulePackage`." style="font-size:15px" />
<CarbonChange variant="update" text="Renamed ModLoader.LoadedPackages -> ModLoader.Packages." style="font-size:15px" />
<CarbonChange variant="misc" text="[Admin Module] Remember session information upon closing and reopening the Admin module instead removing temporary information." style="font-size:15px" />
<CarbonChange variant="misc" text="Changed all CarbonAuto float/integer variables to be multipliers relative to vanilla value." style="font-size:15px" />
<CarbonChange variant="misc" text="Flipped source viewer horizontal scrolling." style="font-size:15px" />
<CarbonChange variant="misc" text="Made suggestive chat command messages lang configurable." style="font-size:15px" />
<CarbonChange variant="misc" text="Preload covalence on sleeping players when the server initializes." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed `c.fetchhooks` until more thorough testing is done whenever using it." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed `c.unitystacktrace` config and enabled it by default." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed `Column` from Failed plugins section under `c.plugins` and merged it with Line (`line:column` format)." style="font-size:15px" />

:::
:::details 1.2024.2137.2420 <CarbonBadge type="date" text="Released on 17.05.2024 12:30AM GMT+2" />

<CarbonChange variant="add" text="[Admin Module] Added background blur and opacity settings to Admin module." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added display name to Carbon Auto variables (present in Admin module configurations tab)." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added Teleport2OwnedItem button on players (Entities and Players tab)." style="font-size:15px" />
<CarbonChange variant="add" text="**Added command aliases** - `c.assignalias myalias realcommand`, `c.unassignalias myalias`, `c.aliases`." style="font-size:15px" />
<CarbonChange variant="add" text="Added 'Unknown command' message when executing invalid commands with valid prefixes." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.harmonymods` printing a full list of mods and patches created by the mods." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.harmonywatchers` (enabled by default)." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.whymodded` and `c.gocommunity`." style="font-size:15px" />
<CarbonChange variant="add" text="Added craft duration multipler - Carbon Auto (`c.craftingspeedmultiplier_nowb`, `c.craftingspeedmultiplier_wb1`, `c.craftingspeedmultiplier_wb2`, `c.craftingspeedmultiplier_wb3`)." style="font-size:15px" />
<CarbonChange variant="add" text="Added default aliases: harmony.load -> `c.harmonyload`, harmony.unload -> `c.harmonyunload`." style="font-size:15px" />
<CarbonChange variant="add" text="Added Harmony patching and unpatching support for assemblies." style="font-size:15px" />
<CarbonChange variant="add" text="Added Suggestions algorithm (Levenshtein) component - grants 3 suggestions for chat and console inaccurate commands." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed Carbon not initializing properly when `server.autouploadmap` is disabled." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed conflicting issue with `BaseHookable.Type` by renaming it to `BaseHookable.HookableType`." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed edge case issue with case insensitive hook and method names." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed Harmony mods not properly patching when hotloaded." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed NREs in IPlayer's RustPlayer." style="font-size:15px" />
<CarbonChange variant="update" text="Renamed `BaseModule.GetEnabled()` to `BaseModule.IsEnabled()`." style="font-size:15px" />
<CarbonChange variant="misc" text="Automated hook building process for Community and Oxide remotely updated hooks." style="font-size:15px" />
<CarbonChange variant="misc" text="Create debug internal files if plugins are marked partial regardless of the debugger attached status." style="font-size:15px" />
<CarbonChange variant="misc" text="Include aliases in console command suggestions." style="font-size:15px" />
<CarbonChange variant="misc" text="No longer refresh the whole panel when toggling chart layers (only individual elements)." style="font-size:15px" />
<CarbonChange variant="misc" text="No longer reload the entire module when saving an Admin module edited config." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed `o.` and `oxide.` filtering and config." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed `o.` command analytics." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed unused Carbon updater." style="font-size:15px" />

:::
:::details 1.2024.2126.5629 <CarbonBadge type="date" text="Released on 05.05.2024 00:02AM GMT+2" />

<CarbonChange variant="add" text="[Admin Module] **Added Profiler tab with exporting support**." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added Carbon Auto variables in the Admin module configuration tab." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added DisableConsole option to Carbon's config." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added fade gradient effect across the entire Admin module CUI." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added maximize button for Admin module." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added notifications." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added source viewer." style="font-size:15px" />
<CarbonChange variant="add" text="**Added native Mono Profiler**." style="font-size:15px" />
<CarbonChange variant="add" text="Added `adminmodule.profiler.use`, `adminmodule.profiler.startstop` and `adminmodule.profiler.sourceviewer` permissions." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.safezonerecycletick` CarbonAuto ConVar." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.show perm (value)` which lists all players and groups that have that permission granted." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.usergroup addall|removeall [group]` which adds/removes all players from/to a group." style="font-size:15px" />
<CarbonChange variant="add" text="Added `carbon/logs/profiler` for profiler exports." style="font-size:15px" />
<CarbonChange variant="add" text="Added `Init`, `LoadDefaultMessages`, `Loaded`, `OnLoaded` and `Unload` hook metadata." style="font-size:15px" />
<CarbonChange variant="add" text="Added `OnServerCommand` metadata." style="font-size:15px" />
<CarbonChange variant="add" text="Added `OnUserGroupAdded` and `OnUserGroupRemoved` metadata." style="font-size:15px" />
<CarbonChange variant="add" text="Added CarbonModule.AutoPatch." style="font-size:15px" />
<CarbonChange variant="add" text="Added CarbonNative." style="font-size:15px" />
<CarbonChange variant="add" text="Added Chart graphic component." style="font-size:15px" />
<CarbonChange variant="add" text="Added conversion for return types." style="font-size:15px" />
<CarbonChange variant="add" text="Added instantiated sampling for basic and timeline profiling (separated)." style="font-size:15px" />
<CarbonChange variant="add" text="Added Oxide AutoPatch attribute and implementation (compatibility)." style="font-size:15px" />
<CarbonChange variant="add" text="Added platform info on the startup log regarding Rust and Carbon build information." style="font-size:15px" />
<CarbonChange variant="add" text="Added Profiler analytics." style="font-size:15px" />
<CarbonChange variant="add" text="Added ScrollView support for Carbon's CUI." style="font-size:15px" />
<CarbonChange variant="add" text="Added ScrollView/Scrollbar support for Rust's UI." style="font-size:15px" />
<CarbonChange variant="add" text="Added Source Viewer component." style="font-size:15px" />
<CarbonChange variant="add" text="Added SourceCode bank (cached and fast c# source code decompilation component)." style="font-size:15px" />
<CarbonChange variant="add" text="Added stopwatch pooling to our PoolEx extensions." style="font-size:15px" />
<CarbonChange variant="add" text="Added support for method type (getter/setter..) for our HookAttribute." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed CarbonAuto initializing too late." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed CarbonAuto not saving properly." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed compatibility with ScrollViews (Oxide)." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed GenericPosition NRE in IPlayer." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed inaccurate data in the Timeline graph (the side values for call times)." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed OnCompilationmFail and OnConstructorFail description." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed WebRequests throwing invalid callback errors." style="font-size:15px" />
<CarbonChange variant="update" text="[Admin Module] Revamped range UI options in Admin module." style="font-size:15px" />
<CarbonChange variant="update" text="Renamed `Community.Runtime.CorePlugin` to `Community.Runtime.Core`." style="font-size:15px" />
<CarbonChange variant="update" text="Updated CarbonAuto to no longer force the server with the modded tag." style="font-size:15px" />
<CarbonChange variant="update" text="Updated hook updater to use `carbonmod.gg` hosting for protocol-based hook downloading on server boot." style="font-size:15px" />
<CarbonChange variant="misc" text="[Admin Module] Clamp Admin module minimum auth level (0 - 3)." style="font-size:15px" />
<CarbonChange variant="misc" text="[Admin Module] Lock cursor only when spectating asleep players." style="font-size:15px" />
<CarbonChange variant="misc" text="Compressed `carbon` and `modded` Steam tags." style="font-size:15px" />
<CarbonChange variant="misc" text="Disabled chart shadows by default (shadows 0)." style="font-size:15px" />
<CarbonChange variant="misc" text="Improved and fixed various issues with the Profiler (timeline)." style="font-size:15px" />
<CarbonChange variant="misc" text="Made tweaking `c.defaultserverchatname`, `c.defaultserverchatcolor` and `c.defaultserverchatid` to no longer mark the server modded." style="font-size:15px" />
<CarbonChange variant="misc" text="Observe Task exceptions (prints exceptions on GC collections)." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed `c.plugintrackingtime` (obsolete)." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed HarmonyInstance-related replacers from all parsers." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed TimeAverageGeneric (obsolete)." style="font-size:15px" />

:::
:::details 1.2024.2098.3237 <CarbonBadge type="date" text="Released on 04.05.2024 12:47PM GMT+2" />

<CarbonChange variant="add" text="[Admin Module] **Added language editor (plugin phrases)**." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] **Added Quick Actions to the main Carbon tab**." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added 'Empower Stats' button in the Players tab (sets all stats to highest)." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added Configuration tab permission (adminmodule.config.use)." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added player and entity position map coordinates to Admin module." style="font-size:15px" />
<CarbonChange variant="add" text="**Added built-in Oxide migration process**." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.unloadonfailure` Compiler configuration." style="font-size:15px" />
<CarbonChange variant="add" text="Added partial searching to `c.plugininfo`, `c.moduleinfo` & other instance specific commands." style="font-size:15px" />
<CarbonChange variant="fix" text="[Admin Module] Fixed Codefling verification and spam." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed CallHook NRE when using `CallHook<T>` with the return of a null value." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed Compat `GetMessage` (thanks Patrette!)." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed IPlayer.Object not being properly assigned (Covalence)." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed permission registration when reloading Admin Module (and its config)." style="font-size:15px" />
<CarbonChange variant="update" text="[Admin Module] Include item ID and shortname in the Items tab, and make them copyable." style="font-size:15px" />
<CarbonChange variant="update" text="**Updated to Harmony 2.3.3.0**." style="font-size:15px" />
<CarbonChange variant="update" text="Updated `c.hooks` to include various more information regarding its hooks and overall performance." style="font-size:15px" />
<CarbonChange variant="update" text="Updated `c.savemodulecfg` and `c.loadmodulecfg` (previously 'config')." style="font-size:15px" />
<CarbonChange variant="update" text="Updated `c.version` (include Rust build date), `c.build`, `c.commit` and `c.protocol` (and exposed them for auth level 0)." style="font-size:15px" />
<CarbonChange variant="update" text="Updated `OnCompilationFail(ModLoader.FailedCompilation` parameters." style="font-size:15px" />
<CarbonChange variant="update" text="Updated and cleaned up `c.plugins` and `c.modules`." style="font-size:15px" />
<CarbonChange variant="update" text="Updated various instances where we're using ClientRPC to use RpcTarget (Rust update)." style="font-size:15px" />
<CarbonChange variant="misc" text="Don't unload plugins when re-compilation fails (by default, configurable)." style="font-size:15px" />
<CarbonChange variant="misc" text="Slightly revamped WebRequest async method functionality." style="font-size:15px" />
<CarbonChange variant="misc" text="Various Covalence compatibility improvements." style="font-size:15px" />
<CarbonChange variant="remove" text="Disabled `c.reloadextensions` and `c.reloadmodules`." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed `c.filenamecheck` and implementation." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed base module shutdown debug message." style="font-size:15px" />

:::
:::details 1.2024.1087.0520 <CarbonBadge type="date" text="Released on 03.28.2024 12:09AM GMT+2" />

<CarbonChange variant="add" text="[Admin Module] Added Items tab to Carbon's configuration page (can create custom items)." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added Reload button on installed Plugins." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added Rust backpack looting hooks and logic (follow on-screen instructions)." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.commit` (prints information about the Git commit of the runtime Carbon build)." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.debughook (hookid|name) [duration]` (helps identifying what plugins fire a specific hook and logs each time it fires) [debug build only]." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.openplugin PluginName` which opens the `.cs` file of the plugin." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.resethooks` which clears all progerss on all of the current hooks (hook time, fires, memory usage and lag spikes)." style="font-size:15px" />
<CarbonChange variant="add" text="Added `OnCompilationFail[150731668]`(string filePath, Trace[] errors, Trace[] warnings) [Engine hook]." style="font-size:15px" />
<CarbonChange variant="add" text="Added `OnConstructorFail[937285752]`(RustPlugin plugin, Exception exception) [Engine hook]." style="font-size:15px" />
<CarbonChange variant="add" text="Added `Permissions` instance in CarbonModule." style="font-size:15px" />
<CarbonChange variant="add" text="Added appropriate response when executing `c.grant` or `c.revoke` and the parameter is inexistent." style="font-size:15px" />
<CarbonChange variant="add" text="Added bool `CanAcceptBackpackItem[2803314817]`(Item backpack, Item item) (Item hook)." style="font-size:15px" />
<CarbonChange variant="add" text="Added cached hook lag spike processing." style="font-size:15px" />
<CarbonChange variant="add" text="Added Carbon patch which fixes `c.defaultserverchatid` to override the user id Rust uses when sending server chat messages." style="font-size:15px" />
<CarbonChange variant="add" text="Added Carbon patch which patches out the Rust 'Bump' log in HotAirBalloon." style="font-size:15px" />
<CarbonChange variant="add" text="Added LineType support to InputField Carbon CUI component." style="font-size:15px" />
<CarbonChange variant="add" text="Added OS commands for opening various Carbon folders (eg. c.openconfigs, c.opendata, c.openroot..)." style="font-size:15px" />
<CarbonChange variant="add" text="Added unloaded and compilation failure plugins at the bottom of the `c.plugins` command." style="font-size:15px" />
<CarbonChange variant="fix" text="[Admin Module] Fixed 'Hide plugin icons' config option." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed `Build.IsDebug` not being accessible due to it being static." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed CarbonPlugin built in harmony patch errors not showing the exception stacktrace." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed covalence FindPlayerById only looking for player bodies active on the server (now uses user data file)." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed IDelFix failing by adding error handling (thanks Tryhard!)." style="font-size:15px" />
<CarbonChange variant="fix" text="Updated Permission's UserHasPermission to use a runtime dictionary which fills up the cache as plugins need the users." style="font-size:15px" />
<CarbonChange variant="update" text="[Admin Module] Run `module.Reload` instead of `module.Load` when saving module config in config editor (properly restarts the module)." style="font-size:15px" />
<CarbonChange variant="update" text="Cleaned up Plugins tab to use IEnumerables instead of arrays." style="font-size:15px" />
<CarbonChange variant="update" text="Don't print compile time for precompiled hookables." style="font-size:15px" />
<CarbonChange variant="update" text="Include plugin and hook lag spike information in `c.plugins`, `c.plugininfo`, `c.modules` and `c.moduleinfo`." style="font-size:15px" />
<CarbonChange variant="update" text="Revamped overall code quality in `ModLoader` (expected to reduce heap allocations even further)." style="font-size:15px" />
<CarbonChange variant="misc" text="[Admin Module] Cache Configuration tab, than regenerate it each time it's showing initially." style="font-size:15px" />
<CarbonChange variant="misc" text="Hook lag spike threshold command + config." style="font-size:15px" />
<CarbonChange variant="remove" text="Automatically cleanup the `carbon/reports` folder on preload." style="font-size:15px" />
<CarbonChange variant="remove" text="No longer include version in the name of the DLL binaries (breaks referencing)." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed `c.report`, `carbon/reports` folder and overall implementation (obsolete)." style="font-size:15px" />

:::
:::details 1.2024.1074.1303 <CarbonBadge type="date" text="Released on 03.14.2024 06:17PM GMT+2" />

<CarbonChange variant="add" text="[Admin Module] Added configurations tab to Admin module (gear button next to X)." style="font-size:15px" />
<CarbonChange variant="add" text="Added `ConVarSnapshots` (takes a snapshot of all default Rust ConVar values)." style="font-size:15px" />
<CarbonChange variant="add" text="Added `imagedb.loaddefaults` command." style="font-size:15px" />
<CarbonChange variant="add" text="Added gear and new close icon." style="font-size:15px" />
<CarbonChange variant="fix" text="[Admin Module] Fixed dead players appearing twice in the Players tab." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed `CuiHelper.AddUi` occasionally breaking things when plugins provide null players to it." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed various timing issues within modules." style="font-size:15px" />
<CarbonChange variant="update" text="Updated shutdown process to run `Shutdown()` on modules on server shutdown." style="font-size:15px" />
<CarbonChange variant="misc" text="[Admin Module] Refreshed Admin module buttons and CUI." style="font-size:15px" />
<CarbonChange variant="misc" text="Fire blank InternalCallHook initially." style="font-size:15px" />
<CarbonChange variant="misc" text="No longer use reflection for precompiled module hooks (code-generated internal hook calls)." style="font-size:15px" />
<CarbonChange variant="misc" text="Reduced overall CuiHelper creation overhead by removing some legacy code." style="font-size:15px" />
<CarbonChange variant="misc" text="Revoke Codefling auth token on non-200 error codes." style="font-size:15px" />
<CarbonChange variant="misc" text="Swapped all instances of internal hook call returnables to use already boxed values (reducing heap allocations)." style="font-size:15px" />
<CarbonChange variant="remove" text="[Admin Module] Removed obsolete DynamicTab." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed `OnServerInitialized` hook from modules." style="font-size:15px" />

:::
:::details 1.2024.1067.4507 <CarbonBadge type="date" text="Released on 03.07.2024 06:49PM GMT+2" />

<CarbonChange variant="add" text="[Admin Module] Added `adminmodule.players.see_ips` which when granted, they can see player IP address when inspecting." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added Admin module wizard analytic for walkthrough or skipping." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added Grant/Revoke All permissions button on the Permissions tab (plugins, modules, groups)." style="font-size:15px" />
<CarbonChange variant="add" text="Added `ImageDatabase.HasImage`." style="font-size:15px" />
<CarbonChange variant="add" text="Added `IModule.HasOSI`." style="font-size:15px" />
<CarbonChange variant="add" text="Added `Rcon` config option, disabling it will turn off server RCon." style="font-size:15px" />
<CarbonChange variant="add" text="Added MonoMod required dependencies by Harmony." style="font-size:15px" />
<CarbonChange variant="fix" text="[Admin Module] Fixed owned plugins glow effect in Admin module." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed `BaseHookable.ToString` formatting." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed `global.skipassetwarmup_crashes` OSI; this literally just showed up out of nowhere when adding the optimizations." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed modules firing OnServerInitialized more than they should (once) & call OSI on module reload." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed ZipScript and ZipDevScript processors not using the correct config for watching." style="font-size:15px" />
<CarbonChange variant="update" text="**Optimized internal hooks to being called directly by the hook code generator**." style="font-size:15px" />
<CarbonChange variant="update" text="Implemented `IOnRconInitialize` and `IOnRunCommandLine`." style="font-size:15px" />
<CarbonChange variant="update" text="Renamed `carbonauto.cfg` to `config.auto.cfg` (it gets auto-renamed)." style="font-size:15px" />
<CarbonChange variant="update" text="Renamed `config_client.json` to `config.client.json` (it gets auto-renamed)." style="font-size:15px" />
<CarbonChange variant="update" text="Upgraded to Harmony 2.3.1.1 (Thicc)." style="font-size:15px" />
<CarbonChange variant="misc" text="[Admin Module] Invalidate ImageDatabase if core images aren't in the FileStorage database of Rust (ensures images show up in Admin Module)." style="font-size:15px" />
<CarbonChange variant="misc" text="Display internally fired hooks in `c.plugininfo` and other various places." style="font-size:15px" />
<CarbonChange variant="misc" text="Filter out the three checksum validation failures on boot as that's a hook gen timing 'issue' and absolutely inoffensive." style="font-size:15px" />
<CarbonChange variant="misc" text="Prettified Analytics code." style="font-size:15px" />
<CarbonChange variant="misc" text="Replace CUI null images with white panels so there's no leaking when using Carbon's CUI system." style="font-size:15px" />
<CarbonChange variant="misc" text="Replaced `powershell` to `pwsh` in the Windows deployment process." style="font-size:15px" />
<CarbonChange variant="misc" text="Revamped entire Carbon config." style="font-size:15px" />

:::
:::details 1.2024.1055.5525 <CarbonBadge type="date" text="Released on 02.24.2024 12:41AM GMT+2" />

<CarbonChange variant="add" text="[Admin Module] Added Admin module Plugins tab HidePluginIcons config." style="font-size:15px" />
<CarbonChange variant="add" text="Added `GetConfigPath()` and `GetDataPath()` to BaseModule." style="font-size:15px" />
<CarbonChange variant="add" text="Added CurrentHookFires to BaseHookable." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed certain instances where webrequests wouldn't trigger the primary callback when errors were delivered." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed code generator not properly handling stuff like `[HookMethod(nameof(Namespace.Type.Member))]`." style="font-size:15px" />
<CarbonChange variant="fix" text="Print correct information if an user/group couldn't be found when using `c.grant` and `c.revoke`." style="font-size:15px" />
<CarbonChange variant="update" text="Expanded on `c.plugins` to accept sorting switches (eg. `c.plugins [-j|--j|-json|-abc|--json|-t|-m|-f] [-asc])`." style="font-size:15px" />
<CarbonChange variant="update" text="Updated, improved and optimized the hook calling process - you should see further significant performance boosts." style="font-size:15px" />
<CarbonChange variant="misc" text="[Admin Module] Refresh the panel when adding, editing or duplicating groups." style="font-size:15px" />
<CarbonChange variant="misc" text="Cleaned up and updated all analytic metrics." style="font-size:15px" />
<CarbonChange variant="misc" text="Redirect and execute callbacks if there are internal WebRequest exception throws." style="font-size:15px" />
<CarbonChange variant="misc" text="Replaced all `param string[]`s for each Queue[Batch] override (thancc Kulltero!)." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed `keepArgs` from HookCaller." style="font-size:15px" />

:::
:::details 1.2024.1046.4234 <CarbonBadge type="date" text="Released on 02.15.2024 1:46AM GMT+2" />

<CarbonChange variant="add" text="[Admin Module] Added module permissions in the Permissions tab." style="font-size:15px" />
<CarbonChange variant="add" text="Added `GroupExists` to BaseModule." style="font-size:15px" />
<CarbonChange variant="fix" text="[Admin Module] Fixed Admin module checkmarks disappearing from time to time by removing potentially unnecessary validation Rust file storage checks." style="font-size:15px" />
<CarbonChange variant="fix" text="[Admin Module] Fixed Admin module showing the wizard each server restart." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed `c.grant` and `c.revoke` logic when detecting if a group has a permission." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed return metadata value for `CanClientLogin` and `CanUserLogin`." style="font-size:15px" />
<CarbonChange variant="update" text="[Admin Module] Added Skip button on the wizard." style="font-size:15px" />
<CarbonChange variant="update" text="Update module permissions to register onto the module instance, not Core plugin." style="font-size:15px" />
<CarbonChange variant="update" text="Updated the wizard when Admin module config structure has changed." style="font-size:15px" />
<CarbonChange variant="misc" text="[Admin Module] Centered initial button on the Admin wizard." style="font-size:15px" />
<CarbonChange variant="misc" text="Bypass file name checking in ZipScript processors." style="font-size:15px" />
<CarbonChange variant="misc" text="Call `OnServerShutdown` when server shuts down." style="font-size:15px" />
<CarbonChange variant="misc" text="Call OnServerInit and OnPostServerInit when using `c.setmodule` (thanks Kulltero!)." style="font-size:15px" />
<CarbonChange variant="misc" text="Expanded on `c.plugininfo` and `c.moduleinfo` - `c.plugininfo PluginName [-t|m|f] [-asc]`, sorts hooks based on time (-t), memory use (-m) and fired times (-f)." style="font-size:15px" />
<CarbonChange variant="remove" text="No longer inject `System.Memory` into plugins as it uses mscorlib redirected types." style="font-size:15px" />

:::
:::details 1.2024.1033.4309 <CarbonBadge type="date" text="Released on 02.01.2024 7:46PM GMT+2" />

<CarbonChange variant="add" text="Added `c.fetchhooks` which will update hooks at runtime." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.harmonyload` and `c.harmonyunload`." style="font-size:15px" />
<CarbonChange variant="add" text="Added command aliases (support for multiple Command attributes)." style="font-size:15px" />
<CarbonChange variant="add" text="Added tick tracking for each cached hook (shows the exact amount of times hooks got fired)." style="font-size:15px" />
<CarbonChange variant="fix" text="[Vanish Module] Fixed vanishing on Cargo Ship or parent triggers, not detaching players (force trigger update)." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed `BaseHookable.ToString()` overrides." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed Oxide compatibility with Covalence - adding IServer.SaveInfo." style="font-size:15px" />
<CarbonChange variant="fix" text="Removed `CommandVar` being able to be assigned multiple times." style="font-size:15px" />
<CarbonChange variant="fix" text="Show if a group or user already has a permission, instead of saying there was a problem." style="font-size:15px" />
<CarbonChange variant="fix" text="Use virtual calls instead of direct for Harmony plugin entrypoint initialization (Thanks, Patrette!)." style="font-size:15px" />
<CarbonChange variant="update" text="[Admin Module] Revamped Admin module accessibility - removed access levels and added permissions instead." style="font-size:15px" />
<CarbonChange variant="update" text="Added hook ticks to `c.moduleinfo` and `c.plugininfo`." style="font-size:15px" />
<CarbonChange variant="update" text="Improved and optimized hook calling internal times." style="font-size:15px" />
<CarbonChange variant="update" text="Updated C4C protocol to 103." style="font-size:15px" />
<CarbonChange variant="update" text="Updated copyright year across all Carbon components." style="font-size:15px" />
<CarbonChange variant="update" text="Upgraded Roslyn compiler to C# 12." style="font-size:15px" />
<CarbonChange variant="misc" text="Execute IHarmonyHooks.OnLoaded and OnUnloaded methods." style="font-size:15px" />
<CarbonChange variant="misc" text="Refactored the way hook total time and memory usages is being stored." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed file watching from extensions and Harmony plugins." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed GroupHasPermission Debug log." style="font-size:15px" />

:::
:::details 1.2024.1014.3039 <CarbonBadge type="date" text="Released on 14.01.2024 4:34PM GMT+2" />

<CarbonChange variant="add" text="[Admin Module] Added Environment tab." style="font-size:15px" />
<CarbonChange variant="fix" text="Corrected C4C log information showing C4C enabled when it wasn't." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed `c.mixingspeedmultiplier` not working properly." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed module internal call hook overriden." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed other occasional CUI related client-side NREs." style="font-size:15px" />
<CarbonChange variant="fix" text="Made `global.skipassetwarmup_crashes 1` possible, now works in C4C and normal modes." style="font-size:15px" />
<CarbonChange variant="update" text="[Admin Module] Order groups based on rank (Permissions tab)." style="font-size:15px" />
<CarbonChange variant="misc" text="Disable `server.secure` convar if Carbon client mode is enabled." style="font-size:15px" />

:::
:::details 1.2024.1004.1024 <CarbonBadge type="date" text="Released on 04.01.2024 7:14PM GMT+2" />

<CarbonChange variant="add" text="[Admin Module] Added `SpectatingInfoOverlay` disabling center-screen text when spectating." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added ability to change the owner id of an entity through the Entities tab (and select the owner's entity when available)." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added ability to send players to sleep through entities/players tab." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added conditionals to Carbon tab, show console info, and permission config options." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added Language option to 'Add User' modal." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added sleep option in the Players tab." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added user editing to Permissions tab." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.plugincmds` displaying all chat and console commands of a plugin (auth 2)." style="font-size:15px" />
<CarbonChange variant="add" text="Added Client (C4C) config (includes env settings, gameplay and addon entries)." style="font-size:15px" />
<CarbonChange variant="add" text="Added client gravity and old recoil properties to C4C." style="font-size:15px" />
<CarbonChange variant="add" text="Added support for hidden processed commands (hid `carbon.` commands from `c.find` due to duplicates)." style="font-size:15px" />
<CarbonChange variant="fix" text="[Admin Module] Fixed changing tab to Permissions not selecting the correct active option." style="font-size:15px" />
<CarbonChange variant="fix" text="[Admin Module] Fixed Entities tab displaying rotations as quaternion instead of euler angles." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed case where server wouldn't boot if there'd be multiple instances of the same server running due to log locking (appending `_temporary` to the busy server log)." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed certain CUI-related issues when plugins would set offsets as null." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed edge case where CUI material is assigned null when it shouldn't." style="font-size:15px" />
<CarbonChange variant="update" text="Made `c.plugininfo` be case insensitive as well as `c.reloadconfig`." style="font-size:15px" />
<CarbonChange variant="misc" text="Ensure not caching hook method duplicates." style="font-size:15px" />
<CarbonChange variant="misc" text="Return bool in `OxideMod.UnloadPlugin(string)`." style="font-size:15px" />
<CarbonChange variant="remove" text="[Admin Module] Removed rotation from players tab as it was redundant." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed `+carbon.client` and `+carbon.nomap` since it got moved to the config." style="font-size:15px" />

:::
:::details 1.2023.4341.1112 <CarbonBadge type="date" text="Released on 12.07.2023 10:14PM GMT+2" />

<CarbonChange variant="add" text="[Admin Module] Added ability to change entity skin to the Entities tab." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.reloadmodule`." style="font-size:15px" />
<CarbonChange variant="add" text="Added module Reload and Unload overridable methods." style="font-size:15px" />
<CarbonChange variant="add" text="Added permissions in `c.plugininfo`." style="font-size:15px" />
<CarbonChange variant="add" text="Added uMod plugin endpoint user friendly error handling for when it goes down." style="font-size:15px" />
<CarbonChange variant="add" text="Added Webrequest automatic decompression (GZIP)." style="font-size:15px" />
<CarbonChange variant="add" text="C4C: Added `+carbon.client` which will apply Client-specific patches and modify event-related convars." style="font-size:15px" />
<CarbonChange variant="add" text="C4C: Added `c.oldrecoil` admin command." style="font-size:15px" />
<CarbonChange variant="add" text="C4C: Added C4C protocol, changing it will invalidate older CCA exports and render them broken & invalid." style="font-size:15px" />
<CarbonChange variant="add" text="Implemented version conditional symbol processing (RUST/CARBON checking against ABV/BLW and IS current protocol)." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed `c.moduleinfo` to include async and override method counts." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed `global.skipassetwarmup_crashes 1` behavior." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed `HookMethod` not being processed by the codegen." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed modules not executing `OnServerInitialized`." style="font-size:15px" />
<CarbonChange variant="update" text="[Admin Module] Don't display update options in the Local tab, under Plugins." style="font-size:15px" />
<CarbonChange variant="update" text="Call `OnUserPermissionGranted` for every permission granted (when using wildcards)." style="font-size:15px" />
<CarbonChange variant="update" text="Call `OnUserPermissionRevoked` for every permission granted (when using wildcards)." style="font-size:15px" />
<CarbonChange variant="update" text="Rewrote the entire Timer system to be more lightweight." style="font-size:15px" />
<CarbonChange variant="misc" text="Made `c.grant` to be case insensitive when looking for players (as well as other perm commands)." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed `+nomap` and replaced it with `+carbon.nomap` which will modify event-related convars and spawn density (disable essentially)." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed slight fullscreen fade when spectating." style="font-size:15px" />

:::
:::details 1.2023.4313.5300 <CarbonBadge type="date" text="Released on 11.10.2023 12:56AM GMT+2" />

<CarbonChange variant="add" text="[Image Database Module] Added multithread error handling." style="font-size:15px" />
<CarbonChange variant="add" text="Added `LastAccess` flag in windows builds in our base processor's watcher." style="font-size:15px" />
<CarbonChange variant="add" text="Added `TemporaryArray`." style="font-size:15px" />
<CarbonChange variant="add" text="Added in-use script checking and waiting for writing availability." style="font-size:15px" />
<CarbonChange variant="fix" text="[Admin Module] Fixed spectate CUI not showing up." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed `c.load` not doing its job properly." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed NRE in Modal module." style="font-size:15px" />
<CarbonChange variant="fix" text="User permissions processing fix." style="font-size:15px" />
<CarbonChange variant="fix" text="Various fixes to plugin processing and disposal." style="font-size:15px" />
<CarbonChange variant="update" text="Made `c.load`, `c.reload` and `c.unload` be case insensitive." style="font-size:15px" />
<CarbonChange variant="update" text="Only display IP address without port in `IPlayer.Address`." style="font-size:15px" />
<CarbonChange variant="update" text="Unload dependant plugins before the required parent plugin that initially was requested for unloading." style="font-size:15px" />
<CarbonChange variant="update" text="Use last result value of conflicted hooks." style="font-size:15px" />
<CarbonChange variant="misc" text="[Admin Module] Fixed plugins not refreshing correctly when loaded/unloaded (in Plugins tab)." style="font-size:15px" />
<CarbonChange variant="misc" text="Allow `unsafe` keyword in plugins." style="font-size:15px" />
<CarbonChange variant="misc" text="Conflict and result priority fixes." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed `HigherPriorityHookWarns` config." style="font-size:15px" />

:::
:::details 1.2023.4306.0506 <CarbonBadge type="date" text="Released on 11.02.2023 5:08PM GMT+2" />

<CarbonChange variant="add" text="Added 'carbon/harmony' shipped with our build patches." style="font-size:15px" />
<CarbonChange variant="add" text="Added `Carbon.Cache` - contains boxed values and defaults, meant to be used to reduce GC by plugins." style="font-size:15px" />
<CarbonChange variant="add" text="Added `CovalencePlugin.game` - compatibility." style="font-size:15px" />
<CarbonChange variant="add" text="Added `LibraryFunction` attribute - compatibility." style="font-size:15px" />
<CarbonChange variant="add" text="Added `STAGING`, `AUX01` and `AUX02` conditional symbols to the Roslyn compiler based on the Carbon build type." style="font-size:15px" />
<CarbonChange variant="add" text="Added full integration for 'Carbon Compatibility Loader' by Patrette into Carbon natively." style="font-size:15px" />
<CarbonChange variant="add" text="Added optional CUI rect update and fixed button text update (ThePitereq PR)." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed issue where hooks with null parameters would not be picked up by the codegen." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed OxideMod log formatting errors." style="font-size:15px" />
<CarbonChange variant="update" text="Carbon CUI implementation revamp all across the project." style="font-size:15px" />
<CarbonChange variant="update" text="Warn if plugins attempt to register same-named permissions under different plugin names." style="font-size:15px" />
<CarbonChange variant="misc" text="[Admin Module] Made Admin module option elements more opaque/visible." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed Carbon.Ext.Discord extension." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed unnecessary duplicate permission check on the same plugin." style="font-size:15px" />

:::
:::details 1.2023.4296.2150 <CarbonBadge type="date" text="Released on 10.23.2023 11:25PM GMT+2" />

<CarbonChange variant="add" text="[Admin Module] Added ability to toggle the UI with the same chat command (or bind), locking keyboard movement/hotkeys when typing in input fields." style="font-size:15px" />
<CarbonChange variant="add" text="Added `async ValueTask OnAsyncServerShutdown` in CarbonPlugin which gets called before the server shuts down (or restart), making the server wait for all plugins to complete said task without stalling the server." style="font-size:15px" />
<CarbonChange variant="add" text="Added `Build.Git.Tag`." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.plugininfo` and `c.moduleinfo` displaying extensive information about runtime plugins." style="font-size:15px" />
<CarbonChange variant="add" text="Added `StringBuilder` pooling in `PoolEx`." style="font-size:15px" />
<CarbonChange variant="add" text="Added wildcard support for plugin exclusion in `c.load`, `c.unload` and `c.reload` (eg. `c.reload * Plugin1 Plugin2..` to unload everything except named plugins)." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed `AutoPatch` CarbonPlugin feature error handling - if patches fail, bail." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed cases where no stacktraces were shown by certain errors in specific situations." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed InternalCallHook code generator not properly calling hooks in specific situations." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed NRE thrown by `c.wipeui` admin command." style="font-size:15px" />
<CarbonChange variant="fix" text="Properly manage Carbon patches w/out identifiers." style="font-size:15px" />
<CarbonChange variant="update" text="Include memory usage in hook warn analytics." style="font-size:15px" />
<CarbonChange variant="update" text="Removed all uses of `Environment.TickCount` and instead using pooled Stopwatches." style="font-size:15px" />
<CarbonChange variant="update" text="Updated `c.version` to include build tag." style="font-size:15px" />
<CarbonChange variant="misc" text="Fixed Carbon processor OnFrame queue pretty error handling." style="font-size:15px" />
<CarbonChange variant="misc" text="Include class index in the namespace scope when doing plugin info lookup (fixes edge-case plugin errors)." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed `EntityMapBufferSize` option (config, admin module)." style="font-size:15px" />

:::
:::details 1.2023.4285.4633 <CarbonBadge type="date" text="Released on 10.13.2023 12:49AM GMT+2" />

<CarbonChange variant="add" text="[Admin Module] Added ability to view players within groups in Permissions tab." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added WebRequest IP validation check." style="font-size:15px" />
<CarbonChange variant="add" text="[Debug-Only] Added `c.scriptdebugorigin` which overrides the script directory Roslyn uses for the compilation debuggers so remote debugging is possible." style="font-size:15px" />
<CarbonChange variant="add" text="[Debug-Only] Added `ZipDevScriptProcessor` - acts like `cszip` but make it folders (`plugins/cszip_dev`)." style="font-size:15px" />
<CarbonChange variant="add" text="[Debug-Only] Added script [debugging](https://docs.carbonmod.gg/docs/development/debugging-plugins) - only works when debugger is attached on server boot." style="font-size:15px" />
<CarbonChange variant="add" text="[Vanish Module] Added Vanish permissions: `vanish.allow` to vanish and `vanish.unlock` to open locked entities while vanished." style="font-size:15px" />
<CarbonChange variant="add" text="Added `+carbon.skiphookupdates` switch." style="font-size:15px" />
<CarbonChange variant="add" text="Added `Build.IsDebug`." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.plugins -abc` which prints plugins alphabetically, otherwise list them chronologically." style="font-size:15px" />
<CarbonChange variant="add" text="Added `HookFlags.MetadataOnly` skipping processing said hooks and only used for display & documentation (Carbon.Hooks.Community)." style="font-size:15px" />
<CarbonChange variant="add" text="Added `OnInterferenceUpdate` and `OnInterferenceOtherUpdate`." style="font-size:15px" />
<CarbonChange variant="add" text="Added `OnPluginOutdated` hook." style="font-size:15px" />
<CarbonChange variant="add" text="Added `Plugin.QueueWorkerThread`." style="font-size:15px" />
<CarbonChange variant="add" text="Added `PluginReference` minimum version & requirement toggle." style="font-size:15px" />
<CarbonChange variant="add" text="Added `QueueWorkerThread`." style="font-size:15px" />
<CarbonChange variant="add" text="Added `ZipScriptProcessor` and ZipPlugins mod package - `cszip` zips with bundled plugin partial file loading." style="font-size:15px" />
<CarbonChange variant="add" text="Added modules loaded/total and extension count to console info (Windows-only)." style="font-size:15px" />
<CarbonChange variant="fix" text="Don't mark Harmony patches (for dynamic hooks) `failed` if they failed unpatching - which means they're still patched." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed `Build.Git.Url` containing `.git` making the url invalid." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed `c.show user <nick>` not working correctly due to `ToLower()` and trimming." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed `c.wipeui` throwing errors when called on the server." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed certain types of commands throwing errors in specific situations." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed Covalence non-player IPlayer assigned in server commands not having the right ID." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed hooks unpatching order; prioritize dependant reference hooks first, then the latter." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed permissions not showing parent recursive group permissions." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed unmanaged temporary lists in `Permissions`." style="font-size:15px" />
<CarbonChange variant="fix" text="Non-parameter hooks now use a cached empty array for processed arguments - occasional internal hook NRE fix." style="font-size:15px" />
<CarbonChange variant="update" text="[Debug-Only] Export internal call hook generated by Carbon to file (so it can be debugged with an IDE - only when class is partial)." style="font-size:15px" />
<CarbonChange variant="update" text="Made `ThreadEx.MainThread` public." style="font-size:15px" />
<CarbonChange variant="update" text="Updated script processor to use multiple source files per batch." style="font-size:15px" />
<CarbonChange variant="misc" text="Pretty-format internal call hook Carbon generated methods." style="font-size:15px" />
<CarbonChange variant="misc" text="Refactored `HookEx`." style="font-size:15px" />
<CarbonChange variant="misc" text="Renamed main thread name to `Main`." style="font-size:15px" />
<CarbonChange variant="misc" text="Revamped the whole project and got rid of `ToList`." style="font-size:15px" />
<CarbonChange variant="misc" text="Various NRE fixes across `ScriptLoader`." style="font-size:15px" />
<CarbonChange variant="remove" text="[Vanish Module] Removed auth-level based checking." style="font-size:15px" />
<CarbonChange variant="remove" text="Fixed occasional hooks failing to unpatch when `c.unload *` or `c.reload *` is called." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed 'Auto-Update Ext Hooks' option from the config." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed `c.autoupdate` command." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed `c.reboot` command." style="font-size:15px" />

:::
:::details 1.2023.4278.1603 <CarbonBadge type="date" text="Released on 10.05.2023 7:19PM GMT+2" />

<CarbonChange variant="add" text="[Admin Module] Added Carbon-only plugins from Codefling (including Carbon extensions)." style="font-size:15px" />
<CarbonChange variant="add" text="Added `+nomap` server mode which disables the Rust map from being present (used by Carbon4Client) as well as server convars (like events, etc)." style="font-size:15px" />
<CarbonChange variant="add" text="Added `Carbon.Common.Client` which implements Carbon4Client systems." style="font-size:15px" />
<CarbonChange variant="add" text="Added `UnityEngine.GameObject.FindObjectsOfType` discretion warning." style="font-size:15px" />
<CarbonChange variant="add" text="Display accurate line number of errors caused by plugin commands &/or hooks." style="font-size:15px" />
<CarbonChange variant="add" text="Implemented JetBrains Rider `.idea`." style="font-size:15px" />
<CarbonChange variant="fix" text="[Admin Module] Fixed plugins not ordering corrently when sorted by price." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed `ImageDatabase` not processing data file properly." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed `ScriptLoader` throwing random rare errors." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed certain hooks not getting called properly (precompiled hookables)." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed empty fields not remaining empty in Admin module." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed plugin metadata processing; carbon compat, file name." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed plugins still loading when plugin constructor errors out." style="font-size:15px" />
<CarbonChange variant="update" text="[Admin Module] Implemented latest improved Codefling API changes (https://codefling.com/db)." style="font-size:15px" />
<CarbonChange variant="update" text="Stripped `CarbonAuto` from minimal builds." style="font-size:15px" />
<CarbonChange variant="update" text="Updated Roslyn to latest (v4.5.0)." style="font-size:15px" />
<CarbonChange variant="misc" text="Always return null on asynchronously-marked hook calls." style="font-size:15px" />
<CarbonChange variant="misc" text="Rewrote server logs to make it more clear what plugin downloading actually means/what's happening." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed the use of delegates (for precompiled hookables)." style="font-size:15px" />

:::
:::details 0.2023.3249.0039 <CarbonBadge type="date" text="Released on 09.06.2023 4:04AM GMT+2" />

<CarbonChange variant="add" text="[Admin Module] Added player inventory locking." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added player renaming." style="font-size:15px" />
<CarbonChange variant="add" text="Added `-carbon.langdir` switch." style="font-size:15px" />
<CarbonChange variant="add" text="Added `#if DEBUG` commands conditional attributes (to internal hook code generator)." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.bypassadmincooldowns` (disabled by default) - when true, admins can spam chat|console commands." style="font-size:15px" />
<CarbonChange variant="add" text="Added `Carbon.Hooks.Community` hooks, curated by the community through PRs." style="font-size:15px" />
<CarbonChange variant="add" text="Added `del` patch (stops stalling the server + be able to destroy entities based on entity type)." style="font-size:15px" />
<CarbonChange variant="add" text="Added `Entities.GetAll<>`." style="font-size:15px" />
<CarbonChange variant="add" text="Added `Facepunch.Nexus` in references." style="font-size:15px" />
<CarbonChange variant="add" text="Added `fixcars` patch that fixes terrible performance and server lag (has 2 FindObjectsOfType calls)." style="font-size:15px" />
<CarbonChange variant="add" text="Added `OxideMod.LoadPlugin`." style="font-size:15px" />
<CarbonChange variant="add" text="Added hook time and memory usage to `c.modules`." style="font-size:15px" />
<CarbonChange variant="add" text="Added material support and simple image (UnityEngine.UI.Image) [ThePitereq  PR]." style="font-size:15px" />
<CarbonChange variant="add" text="Added plugin uptime to the `c.plugins` command." style="font-size:15px" />
<CarbonChange variant="add" text="Embedded git commit info in build assembly metadata." style="font-size:15px" />
<CarbonChange variant="fix" text="[Admin Module] Fixed 'View Permissions' button in the Players tab not showing the permissions of the correct player." style="font-size:15px" />
<CarbonChange variant="fix" text="Feed the correct boolean value for OnServerInitialized(value) on inital boot, and hotloading." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed `HookValidatorRefreshed` Carbon event not triggering at the right time." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed `OnPlayerUnbanned` / `OnUserUnbanned`." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed `ScriptLoader.Clear()` occasionally malfunctioning." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed internal hook call gen not considering optional types." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed module langs." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed No Give Notices giving notices." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed player disconnect log duplicate in console." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed up command line (+carbon.onboot)." style="font-size:15px" />
<CarbonChange variant="update" text="[Admin Module] Use Druid font for console." style="font-size:15px" />
<CarbonChange variant="update" text="Complete revamp of the development infrastructure of Carbon." style="font-size:15px" />
<CarbonChange variant="update" text="Revamped core Permissions library methods and optimized a bunch." style="font-size:15px" />
<CarbonChange variant="misc" text="Documented all internal hooks (with the readable hook name)." style="font-size:15px" />
<CarbonChange variant="misc" text="Exposed `IHook.HookFlags`, `IHook.TargetType`, `IHook.TargetMethod`, `IHook.TargetMethods`." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed CorePlugin internal call hook." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed Oxide `Rust.opj` file requests and processing." style="font-size:15px" />

:::
:::details 0.2023.3222.2550 <CarbonBadge type="date" text="Released on 08.10.2023 5:30PM GMT+2" />

<CarbonChange variant="add" text="Added `application/x-www-form-urlencoded` by default in `POST|PUT|PATCH|DELETE` requests." style="font-size:15px" />
<CarbonChange variant="add" text="Added `AsyncEx` extensions." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.defaultserverchatname`, `c.defaultserverchatcolor`, `c.defaultserverchatid` to CarbonAuto." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.extensions`, `c.modulesmanaged`." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.installplugin` and `c.uninstallplugin`." style="font-size:15px" />
<CarbonChange variant="add" text="Added conditional compilation symbols for build scripts." style="font-size:15px" />
<CarbonChange variant="update" text="Fixed Discord extension (and overall extensions)." style="font-size:15px" />
<CarbonChange variant="misc" text="Ignore checksum validation on Rust staging, aux01 and aux02 branches." style="font-size:15px" />
<CarbonChange variant="misc" text="Use plugin type name instead of info name for config/data files." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed config/data path validation for inconsistency reasons with custom switch directories." style="font-size:15px" />

:::
:::details 0.2023.3219.0627 <CarbonBadge type="date" text="Released on 08.07.2023 07:09PM GMT+2" />

<CarbonChange variant="add" text="Added extension and module hotloading." style="font-size:15px" />
<CarbonChange variant="add" text="Added more Covalence compatibility." style="font-size:15px" />
<CarbonChange variant="update" text="Don't consider static methods hookable by the code gen." style="font-size:15px" />
<CarbonChange variant="update" text="Publicized `ConsoleSystem.Arg` constructor." style="font-size:15px" />
<CarbonChange variant="misc" text="Inject `#if WIN`, `#if UNIX` or `#if MINIMAL` (in respective builds) - in the roslyn compiler." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed hook/plugin priorities." style="font-size:15px" />

:::
:::details 0.2023.3215.4402 <CarbonBadge type="date" text="Released on 08.03.2023 7:47PM GMT+2" />

<CarbonChange variant="add" text="[Admin Module] Added Plugins tab badges on previewed plugins." style="font-size:15px" />
<CarbonChange variant="add" text="Added [Codefling auth](https://docs.carbonmod.gg/docs/core/modules/admin-module/codefling-auth)." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.shutdown` which terminates Carbon carefully, then renders the server completely vanilla." style="font-size:15px" />
<CarbonChange variant="add" text="Added `carbonauto.cfg` options (extends Rust ConVar properties)." style="font-size:15px" />
<CarbonChange variant="add" text="Added `Command.Args.IsServer`." style="font-size:15px" />
<CarbonChange variant="add" text="Added `PoolEx.FreeDictionary<TKey, TValue>(ref Dictionary<TKey, TValue> val)`." style="font-size:15px" />
<CarbonChange variant="add" text="Added `PoolEx.GetDictionary<TKey, TValue>`." style="font-size:15px" />
<CarbonChange variant="add" text="Added `Rust.Clans` and `Rust.Clans.Local` to Carbon's global references (including Roslyn compiler)." style="font-size:15px" />
<CarbonChange variant="add" text="Added Carbon minimal builds (excludes significant, usually visual-oriented features)." style="font-size:15px" />
<CarbonChange variant="add" text="Added JetBrains.Annotations.MeansImplicitUse across public attributes." style="font-size:15px" />
<CarbonChange variant="add" text="Added MemoryMeasure struct." style="font-size:15px" />
<CarbonChange variant="add" text="Added turner's 'Console Command History' built into windows builds (https://codefling.com/harmony/console-command-history)." style="font-size:15px" />
<CarbonChange variant="update" text="Upgraded protobuf to 3.2.26." style="font-size:15px" />
<CarbonChange variant="update" text="Upgraded Roslyn to 4.3.0." style="font-size:15px" />
<CarbonChange variant="misc" text="Analytics improvements." style="font-size:15px" />
<CarbonChange variant="misc" text="Directly assign Steamworks server tags instead of using reflection." style="font-size:15px" />
<CarbonChange variant="misc" text="Overall module and Carbon extensions improvements." style="font-size:15px" />
<CarbonChange variant="misc" text="Publicize `Rust.Clans.Local` pre/post production." style="font-size:15px" />
<CarbonChange variant="misc" text="Publicized `Facepunch.Nexus.dll`." style="font-size:15px" />
<CarbonChange variant="misc" text="Significant cleanup and optimisations across Carbon's extensions." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed `HarmonyReference` property, config and command & enabled it by default." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed `RustEdit.Ext` module." style="font-size:15px" />

:::
:::details 0.2023.3193.1938 <CarbonBadge type="date" text="Released on 07.12.2023 10:22PM GMT+2" />

<CarbonChange variant="add" text="Added plugin hook call memory allocation tracking." style="font-size:15px" />
<CarbonChange variant="update" text="Display plugin memory usage in `c.plugins`." style="font-size:15px" />
<CarbonChange variant="update" text="Exposed IModuleProcessor.Build and IModuleProcessor.Uninstall." style="font-size:15px" />
<CarbonChange variant="misc" text="Internal hook call fixup." style="font-size:15px" />
<CarbonChange variant="misc" text="Print and store stack and inner information of unhandled exceptions (Unity, Rust, plugin monos)." style="font-size:15px" />

:::
:::details 0.2023.3190.0119 <CarbonBadge type="date" text="Released on 07.09.2023 05:03PM GMT+2" />

<CarbonChange variant="add" text="Added Command disposal." style="font-size:15px" />
<CarbonChange variant="add" text="Added Global Usings and enabled Implicit Usings for Carbon.Common." style="font-size:15px" />
<CarbonChange variant="add" text="Added OnErrorCallback, OnWarningCallback, OnNoticeCallback and OnDebugCallback callbacks." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed Admin module console hooking into logging twice if disabling-enabling the module." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed certain plugins with the OnCollectiblePickup hook failing." style="font-size:15px" />
<CarbonChange variant="update" text="Oxide compatibility updates & overall cleanup." style="font-size:15px" />
<CarbonChange variant="update" text="Reimplemented Ben.Demystifier (log cleaner and beautifier)." style="font-size:15px" />
<CarbonChange variant="misc" text="Inject `arg.cmd` property with the command installed Rust command (`ConsoleSystem.Command`)." style="font-size:15px" />
<CarbonChange variant="misc" text="Publicized `ConsoleSystem.Index.All`." style="font-size:15px" />

:::
:::details 0.2023.3188.0903 <CarbonBadge type="date" text="Released on 07.07.2023 03:11AM GMT+2" />

<CarbonChange variant="add" text="[Admin Module] Added back flipping direction when selecting the same filter in Plugins tab." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added error message when users with auth 0 try to use Carbon Admin Panel commands." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.grant` invalidation replies." style="font-size:15px" />
<CarbonChange variant="add" text="Added `c.revoke` invalidation replies." style="font-size:15px" />
<CarbonChange variant="add" text="Added `OnNativeCommandHasPermission(ConsoleSystem.Arg)` hook." style="font-size:15px" />
<CarbonChange variant="fix" text="[Admin Module] Don't allow lower-than-3 access level users to execute things on the plugins tab (favourite, auto-update, etc)." style="font-size:15px" />
<CarbonChange variant="fix" text="[Admin Module] Fixed 'Add User' modal in Permissions tab disallowing from adding new users." style="font-size:15px" />
<CarbonChange variant="fix" text="IPlayer fix returning false-positives for the IsServer property." style="font-size:15px" />
<CarbonChange variant="update" text="[Admin Module] Only show approved files in the Plugins tab." style="font-size:15px" />
<CarbonChange variant="update" text="[Admin Module] Use player connection auth level for Admin module access validation." style="font-size:15px" />
<CarbonChange variant="update" text="`c.load *` will load all plugins on disk than just the ones that have been unloaded (&/or ignored)." style="font-size:15px" />
<CarbonChange variant="update" text="Cache OxideMod libraries for multi-purpose reusability." style="font-size:15px" />
<CarbonChange variant="update" text="Insert generated internal hook at the end of the plugin class." style="font-size:15px" />
<CarbonChange variant="update" text="Pick inner exception for OnFrame failures." style="font-size:15px" />
<CarbonChange variant="update" text="Regenerated Core plugin internal hooks (with our latest generator changes)." style="font-size:15px" />
<CarbonChange variant="update" text="Remastered hook generator to use uint identifiers for hooks instead of mapping." style="font-size:15px" />
<CarbonChange variant="update" text="Set `c.unitystacktrace` to true by default for production builds." style="font-size:15px" />
<CarbonChange variant="update" text="Updated all loggers to always expose stacktraces." style="font-size:15px" />
<CarbonChange variant="update" text="Use `lock` and lists instead of `Queue` for NextFrame/NextTick processing." style="font-size:15px" />
<CarbonChange variant="misc" text="[Admin Module] Added Deleted flag property to Plugin.Status." style="font-size:15px" />
<CarbonChange variant="misc" text="[ModerationTools Module] Warn server if `cadmin` is being executed through RCon/server since it's a client-only command." style="font-size:15px" />
<CarbonChange variant="misc" text="Fixes random crashes on Linux (LGSM primarely)." style="font-size:15px" />
<CarbonChange variant="misc" text="Initial implementation for experimental threads." style="font-size:15px" />
<CarbonChange variant="misc" text="Multiply command cooldown every time a player tries to call it (to avoid spam) (defaults to *0.5)." style="font-size:15px" />

:::
:::details 0.2023.2178.5536 <CarbonBadge type="date" text="Released on 06.27.2023 06:59AM GMT+2" />

<CarbonChange variant="add" text="Added `c.frametickbuffersize` (defaults to 1000)." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed asynchronous hooks not being picked up by the code generator." style="font-size:15px" />
<CarbonChange variant="update" text="Reimplemented frame queue buffer changes." style="font-size:15px" />
<CarbonChange variant="update" text="Reimplemented hook time warns (core plugins are excluded)." style="font-size:15px" />
<CarbonChange variant="update" text="Reimplemented NextTick/NextFrame processing (fixes frequently called hooks creating timers/nextticks slowing down the spawning of entities on boot)." style="font-size:15px" />

:::
:::details 0.2023.2177.3145 <CarbonBadge type="date" text="Released on 06.26.2023 2:34AM GMT+2" />

<CarbonChange variant="add" text="[Admin Module] Added alpha property in color picker (CUI and implementation)." style="font-size:15px" />
<CarbonChange variant="add" text="Added safe-error handling for `Plugin.Subscribe/Unsubscribe`." style="font-size:15px" />
<CarbonChange variant="update" text="Consider CarbonPlugin for PluginReference processing." style="font-size:15px" />
<CarbonChange variant="update" text="Print exception stacktrace for Logger.Error in production builds." style="font-size:15px" />
<CarbonChange variant="misc" text="[Admin Module] Various fixes to the color picker Rust/hex color processing." style="font-size:15px" />
<CarbonChange variant="misc" text="Code generator improvements for calling hooks with nullified arguments." style="font-size:15px" />

:::
:::details 0.2023.2171.0519 <CarbonBadge type="date" text="Released on 06.20.2023 8:07AM GMT+2" />

<CarbonChange variant="add" text="Added `Pair<string, CuiElement, CuiElement>` support (Carbon CUI)." style="font-size:15px" />
<CarbonChange variant="add" text="Added `Plugin.IsPrecompiled` indicating if a plugin's managed programmatically." style="font-size:15px" />
<CarbonChange variant="add" text="Added `precompiled` property to ModLoader.InitializePlugin which will process hooks, HookMethod attributes and plugin references found within the plugin type." style="font-size:15px" />
<CarbonChange variant="add" text="Added `update` property & implementation (Oxide CUI)." style="font-size:15px" />
<CarbonChange variant="add" text="Added container error handling (Carbon CUI)." style="font-size:15px" />
<CarbonChange variant="add" text="Added CUI.Handler.UpdatePool (list of updated CUI elements that need updating) (Carbon CUI)." style="font-size:15px" />
<CarbonChange variant="add" text="Added skinID attribute (Carbon CUI)." style="font-size:15px" />
<CarbonChange variant="add" text="Added Storeless mode to Permission system - works the same as usual, just doesn't store or load anything to/from file." style="font-size:15px" />
<CarbonChange variant="add" text="Added support for CUI sub-elementa (eg. buttons have a text component attached to it, which you can now directly edit) (Carbon CUI)." style="font-size:15px" />
<CarbonChange variant="add" text="Added widespread Carbon CUI implementation and individual property update support (Carbon CUI)." style="font-size:15px" />
<CarbonChange variant="fix" text="Code generator for internal hooks improvements." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed Carbon running with AutoUpdate disabled." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed Plugin.Title always returning the default value 'Rust' (which was happening due to the constructor call shift)." style="font-size:15px" />
<CarbonChange variant="update" text="[Admin Module] Various UI fixes, scaling issues." style="font-size:15px" />
<CarbonChange variant="update" text="[RustEdit.Ext Module] Enable-on-custom-map fix." style="font-size:15px" />
<CarbonChange variant="update" text="Call In/Once timers if server's not yet fully initialized." style="font-size:15px" />
<CarbonChange variant="update" text="Disallow and warn servers trying to run Carbon builds that are for a different operating system." style="font-size:15px" />
<CarbonChange variant="update" text="Execute plugin constructors after(!) initial plugin setup (which includes timers, persistence, etc)." style="font-size:15px" />
<CarbonChange variant="update" text="Process ConsoleSystem.Args for chat commands as well." style="font-size:15px" />
<CarbonChange variant="update" text="Renamed AutoUpdate config option to AutoUpdateExtHooks." style="font-size:15px" />
<CarbonChange variant="update" text="Updated Discord invite link." style="font-size:15px" />
<CarbonChange variant="misc" text="Disallow precompiled plugins from being unloaded/reloaded through commands." style="font-size:15px" />
<CarbonChange variant="misc" text="Don't allow unloading/reloading precompiled plugins with `c.` commands." style="font-size:15px" />
<CarbonChange variant="misc" text="Don't insert elements into pooled containers if they're updateable (Carbon CUI)." style="font-size:15px" />

:::
:::details 0.2023.2159.1312 <CarbonBadge type="date" text="Released on 06.08.2023 8:15PM GMT" />

<CarbonChange variant="add" text="[Admin Module] Added Date picker (accessible by plugins as well)." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added player Ban button in Players/Entities - with date picker for duration [defaults to 100y] [BasePlayer type] (access level 2)." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added player Kick button in Players/Entities [BasePlayer type] (access level 2)." style="font-size:15px" />
<CarbonChange variant="add" text="[StackManager Module] Added `ProhibitItemConsumableContainerStacking` (eg. wo'a jugs)." style="font-size:15px" />
<CarbonChange variant="add" text="[StackManager Module] Added `ProhibitItemContainerStacking` (eg. weapons)." style="font-size:15px" />
<CarbonChange variant="add" text="[StackManager Module] Added `ProhibitItemFishableStacking` (eg. bottles)." style="font-size:15px" />
<CarbonChange variant="add" text="[Vanish Module] Added `BroadcastVanishSounds` config to Vanish (disabled by default)." style="font-size:15px" />
<CarbonChange variant="add" text="Added `(bool)newConfig` and `(bool)newData` to `BaseModule.PreLoadShouldSave()`." style="font-size:15px" />
<CarbonChange variant="add" text="Added more Oxide compatibility (Event, PluginManagerEvent)." style="font-size:15px" />
<CarbonChange variant="add" text="Allow modules to override `InternalCallHook`, otherwise use delegate system for hook calls (legacy)." style="font-size:15px" />
<CarbonChange variant="fix" text="[Admin Module] Fixed unnecessary refreshing." style="font-size:15px" />
<CarbonChange variant="fix" text="[StackManager Module] Fixed overriding dictionaries enforcing values in the config." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed occasional misbehavior with plugins replying messages using IPlayer when commands are sent from the server." style="font-size:15px" />
<CarbonChange variant="update" text="[Vanish Module] Play vanish sounds just for the vanished person by default." style="font-size:15px" />
<CarbonChange variant="misc" text="[Admin Module] Display placeholder (translated) text in empty column panels." style="font-size:15px" />
<CarbonChange variant="misc" text="[Admin Module] Don't reset admin player context storage on panel close." style="font-size:15px" />
<CarbonChange variant="misc" text="[Admin Module] Optimized RPC calls for cursor locker." style="font-size:15px" />
<CarbonChange variant="misc" text="Call protected LoadDefaultConfig directly instead of calling it as a hook." style="font-size:15px" />
<CarbonChange variant="misc" text="Disable Harmony debugging on the production builds." style="font-size:15px" />
<CarbonChange variant="misc" text="Enforce hook calls if parameter types are nullable." style="font-size:15px" />
<CarbonChange variant="misc" text="Get methods of partial subclasses that are considered for hook calling." style="font-size:15px" />
<CarbonChange variant="misc" text="Implemented code gen for plugins that are structured with partial classes." style="font-size:15px" />
<CarbonChange variant="misc" text="Made Timer.Destroy to return bool." style="font-size:15px" />
<CarbonChange variant="misc" text="Properly clear `harmony.log` from `carbon/logs` (from both debug & release builds)." style="font-size:15px" />
<CarbonChange variant="misc" text="Render IPlayer as 'connected' when IsServer is true." style="font-size:15px" />
<CarbonChange variant="misc" text="Swapped `BaseHookable.Name` from a field to a property." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed legacy `HookValidation` convar (from Admin module as well) as it's now entirely obsolete." style="font-size:15px" />

:::
:::details 0.2023.2153.2845 <CarbonBadge type="date" text="Released on 2023-06-02 09:31PM GMT" />

<CarbonChange variant="add" text="Fixed issue where some players do not get added to the user database." style="font-size:15px" />
<CarbonChange variant="add" text="Fixed script loader and watcher occasional issue." style="font-size:15px" />

:::
:::details 0.2023.2152.0418 <CarbonBadge type="date" text="Released on 2023-06-01 4:06PM GMT" />

<CarbonChange variant="add" text="[Admin Module] Added ability to add a temporary nickname on the added Steam IDs to ease identification." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added modal for adding Steam IDs in the data file - for assigning permissions/groups on Steam ID before they connect." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added option to switch script watchers option mode." style="font-size:15px" />
<CarbonChange variant="add" text="[Admin Module] Added toggle to switch between seeing players stored in the data file or bodies on the server." style="font-size:15px" />
<CarbonChange variant="add" text="Added 'Autofocus' and 'HudMenuInput' properties in InputField CUI component." style="font-size:15px" />
<CarbonChange variant="add" text="Added a lot more caching when processing hooks." style="font-size:15px" />
<CarbonChange variant="add" text="Added abstract type checking for processed modules - allowing custom base modules to exist." style="font-size:15px" />
<CarbonChange variant="add" text="Added code generator for directly executed hooks." style="font-size:15px" />
<CarbonChange variant="add" text="Added Countdown support to Carbon's CUI." style="font-size:15px" />
<CarbonChange variant="add" text="Added GetLibFolder and GetManagedModulesFolder." style="font-size:15px" />
<CarbonChange variant="add" text="Added OnUserDisconnected internal hook call." style="font-size:15px" />
<CarbonChange variant="add" text="Added option (disabled by default) to load plugins from subdirectories ('backups' is ignored) - 'c.scriptwatchersoption 1' to enable." style="font-size:15px" />
<CarbonChange variant="add" text="Added outline support to Carbon's CUI (panel, text, image/sprite, button)." style="font-size:15px" />
<CarbonChange variant="add" text="Added support for 'ref' and 'out' keyword support in plugin hooks." style="font-size:15px" />
<CarbonChange variant="add" text="Added VerticalOverflow in Text CUI component." style="font-size:15px" />
<CarbonChange variant="update" text="[Admin Module] Revamped spectating; teleports you 3 meters under the spectated object (and enables noclipping)." style="font-size:15px" />
<CarbonChange variant="update" text="[Admin Module] Revamped spectating; toggle views (F3), can type in chat, orbit spectated objects." style="font-size:15px" />
<CarbonChange variant="update" text="Added `DataFileSystem.DeleteDataFile` and `DynamicConfigFile.Delete`." style="font-size:15px" />
<CarbonChange variant="update" text="Fixed CUI `destroyUi` taking every panel subproperty into consideration." style="font-size:15px" />
<CarbonChange variant="update" text="Fixed plugin blacklisting when analyzing subdirectories." style="font-size:15px" />
<CarbonChange variant="update" text="Fixed RustPlayer.HasPermission returning a false positive value." style="font-size:15px" />
<CarbonChange variant="update" text="Improved hook call speed by appx. 40%." style="font-size:15px" />
<CarbonChange variant="misc" text="[Admin Module] Display online/offline player count on the Players tab." style="font-size:15px" />
<CarbonChange variant="misc" text="[Vanish Module] Play 'whoosh' sound when vanishing (enabled by default)." style="font-size:15px" />
<CarbonChange variant="misc" text="[Vanish Module] Toggle god mode on vanish/unvanish (disabled by default)." style="font-size:15px" />
<CarbonChange variant="misc" text="Automatically add game developers to the admin group." style="font-size:15px" />
<CarbonChange variant="misc" text="Cleanse hook argument buffers properly." style="font-size:15px" />
<CarbonChange variant="misc" text="Implemented InputField + Text changes into Carbon's CUI." style="font-size:15px" />
<CarbonChange variant="misc" text="Implemented string+uint StringPool for hook identification." style="font-size:15px" />
<CarbonChange variant="misc" text="Improved error handling for internally called and failed to execute hooks." style="font-size:15px" />
<CarbonChange variant="misc" text="Improved plugin hotloading (even more seamless)." style="font-size:15px" />
<CarbonChange variant="misc" text="Optimisation and legacy code cleanup in the hook calling systems." style="font-size:15px" />
<CarbonChange variant="misc" text="Place admin players that are noclipping high on the ground to avoid fall damage." style="font-size:15px" />

:::
:::details 0.2023.2143.0715 <CarbonBadge type="date" text="Released on 2023-05-23 13:07:15" />

<CarbonChange variant="misc" text="Rust optional update patch for pooling changes." style="font-size:15px" />

:::
:::details 0.2023.2138.1804 <CarbonBadge type="date" text="Released on " />

<CarbonChange variant="add" text="Added back `c.version`, `c.protocol` and `c.build`." style="font-size:15px" />
<CarbonChange variant="add" text="Added new Carbon events: `FileSystemWarmup`, `FileSystemWarmupComplete` & `PluginPreload`." style="font-size:15px" />
<CarbonChange variant="update" text="[Admin Module] Fixed memory leak in the Entities tab under." style="font-size:15px" />
<CarbonChange variant="update" text="[Admin Module] Updated UI to scale properly relative to UI scale/aspect ratio." style="font-size:15px" />
<CarbonChange variant="update" text="Fixed error formatting under `c.pluginsfailed`." style="font-size:15px" />
<CarbonChange variant="update" text="Fixed OnLoseCondition hook." style="font-size:15px" />
<CarbonChange variant="update" text="Optimized hook calling performance by 35%." style="font-size:15px" />
<CarbonChange variant="misc" text="Hooks now can contain ref parameters." style="font-size:15px" />
<CarbonChange variant="misc" text="ICarbonModule can now patch static hooks." style="font-size:15px" />
<CarbonChange variant="misc" text="Whitelisted `Ionic.Zip.Reduced`." style="font-size:15px" />

:::
:::details 0.2023.2131.5323 <CarbonBadge type="date" text="Released on " />

<CarbonChange variant="add" text="[Gather Manager Module] Added OvenSpeedOverride - changes the smelting speed in all ovens." style="font-size:15px" />
<CarbonChange variant="add" text="[Gather Manager Module] Added smelt speed override blacklisting (based on prefab shortname and entity type)." style="font-size:15px" />
<CarbonChange variant="add" text="Added module pooling for correct pre-initialization." style="font-size:15px" />
<CarbonChange variant="add" text="Added NuGet deployment -> https://www.nuget.org/packages/Carbon.Community." style="font-size:15px" />
<CarbonChange variant="add" text="Added OnUserCommand (Covalence hook)." style="font-size:15px" />
<CarbonChange variant="update" text="[RustEdit.Ext Module] Don't enforce the server to be modded when enabled." style="font-size:15px" />
<CarbonChange variant="update" text="Renamed Loader to ModLoader." style="font-size:15px" />
<CarbonChange variant="update" text="Renamed Loader.CarbonMod to ModLoader.ModPackage." style="font-size:15px" />
<CarbonChange variant="misc" text="Enforce Harmony logs to be redirected." style="font-size:15px" />
<CarbonChange variant="misc" text="Implemented 'DELETE' in WebRequest." style="font-size:15px" />

:::
:::details 0.1013.1018.3044 <CarbonBadge type="date" text="Released on " />

<CarbonChange variant="add" text="[Admin Module] Added multi-selection support in the Entities tab." style="font-size:15px" />
<CarbonChange variant="update" text="[Vanish Module] Made Bradley ignore vanished players." style="font-size:15px" />
<CarbonChange variant="update" text="Legacy code cleanup." style="font-size:15px" />

:::
:::details 0.1013.1107 <CarbonBadge type="date" text="Released on " />

<CarbonChange variant="add" text="Add new functionality to FileWatcherManager." style="font-size:15px" />
<CarbonChange variant="add" text="Added +carbon.onboot (called after modules initialize) and +carbon.onserverinit (called after server is marked as completely initialized)." style="font-size:15px" />
<CarbonChange variant="add" text="Added Arial and Permanent Marker to the CUI." style="font-size:15px" />
<CarbonChange variant="add" text="Added ArrayPool implementation and c.pluginsunloaded." style="font-size:15px" />
<CarbonChange variant="add" text="Added Button field to Modal panel." style="font-size:15px" />
<CarbonChange variant="add" text="Added c.defaultplayergroup (defaults to 'default') and c.defaultadmingroup (defaults to 'admin')." style="font-size:15px" />
<CarbonChange variant="add" text="Added c.protocol, c.help, and help commands for startup information." style="font-size:15px" />
<CarbonChange variant="add" text="Added c.wipeharmonylogonboot (defaults to true)." style="font-size:15px" />
<CarbonChange variant="add" text="Added c.wipemarkers (player) to clear all markers of a player or caller." style="font-size:15px" />
<CarbonChange variant="add" text="Added c.wipemarkers (player) to clear all markers of a player or caller." style="font-size:15px" />
<CarbonChange variant="add" text="Added c.wipeui to clear the entire drawn CUI (authlevel 1)." style="font-size:15px" />
<CarbonChange variant="add" text="Added CanExplosiveStick, OnInvalidPositionCheck, and DestroyToPool." style="font-size:15px" />
<CarbonChange variant="add" text="Added CanUnlockTechTreeNode(Workbench, BasePlayer, TechTreeData.NodeInstance)." style="font-size:15px" />
<CarbonChange variant="add" text="Added CommandLine context, read from cfg/server.cfg." style="font-size:15px" />
<CarbonChange variant="add" text="Added GetActivePanelList/DestroyActivePanelList for clearing all CUI drawn on clients at once without reconnecting." style="font-size:15px" />
<CarbonChange variant="add" text="Added IModuleProcessor.Setup." style="font-size:15px" />
<CarbonChange variant="add" text="Added Local subtab in the Plugins tab for displaying all loaded plugins (including those not on vending sites)." style="font-size:15px" />
<CarbonChange variant="add" text="Added missing return attributes on some Extra hooks." style="font-size:15px" />
<CarbonChange variant="add" text="Added Moderation Tools description to Admin module setup wizard." style="font-size:15px" />
<CarbonChange variant="add" text="Added o.* command check flag." style="font-size:15px" />
<CarbonChange variant="add" text="Added OnChairComfort, CanPlayerInheritNetworkGroup, and CanAccessAdminModule." style="font-size:15px" />
<CarbonChange variant="add" text="Added OnDispenserGather in GatherManager." style="font-size:15px" />
<CarbonChange variant="add" text="Added permission.GetPermissions(BaseHookable)." style="font-size:15px" />
<CarbonChange variant="add" text="Added protected buttons for the Modal panel (Button field)." style="font-size:15px" />
<CarbonChange variant="add" text="Added user group editing to the Permissions tab." style="font-size:15px" />
<CarbonChange variant="add" text="Added validators to preloader." style="font-size:15px" />
<CarbonChange variant="add" text="Added WebRequest PATCH support." style="font-size:15px" />
<CarbonChange variant="add" text="Added Whitelist and DRM info to Setup Wizard." style="font-size:15px" />
<CarbonChange variant="add" text="Auto-confirm confirmation panels when holding (SPRINT) and added BaseModule.NextTick." style="font-size:15px" />
<CarbonChange variant="fix" text="Fix for case-sensitive command calls." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed c.report (potentially)." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed c.unloading plugins not loaded on boot marking them as ignored and printing the correct warning (fallback to old log if not found)." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed c.unloading plugins not loaded on boot marking them as ignored and printing the correct warning (fallback to old log if not found)." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed Carbon not starting on Linux." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed command line execution not being printed when there are no commands on the CN calls." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed command line execution not being printed when there are no commands on the CN calls." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed compiler errors occurring when reloading specific plugins frequently." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed compiler errors occurring when reloading specific plugins frequently." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed Create Group default values." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed exception with FileWatcher and updated Library.cs." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed existing key errors in compilation reference cache (Fastboot sometimes too fast)." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed existing key errors in compilation reference cache (Fastboot sometimes too fast)." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed HarmonyModInfo spam on Linux." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed info file naming." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed info file naming." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed language phrases overriding on plugin reload after changes." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed language phrases overriding on plugin reload after changes." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed Modules tab config editing button issue (previously appeared unresponsive)." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed Modules tab config editing button issue (previously appeared unresponsive)." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed null/empty permissions being considered (resolves various plugin command authentication issues)." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed number fields throwing errors when SteamIDs are used (use longs instead of ints)." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed plugins generating configs with null fields." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed RustPlayer being a struct and not functioning properly." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed Stack manager item-specific filters using the global multiplier (now has separate global multiplier, defaulting to 1)." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed Stack manager item-specific filters using the global multiplier (now has separate global multiplier, defaulting to 1)." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed StopSpectating NRE." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed StopSpectating NRE." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed viewing angles when spectating and updated various references." style="font-size:15px" />
<CarbonChange variant="fix" text="Fixed viewing angles when spectating and updated various references." style="font-size:15px" />
<CarbonChange variant="fix" text="Map Protection module fixes." style="font-size:15px" />
<CarbonChange variant="fix" text="Quickstart fixes and invalidated setup wizard (it'll show up on up-to-date servers)." style="font-size:15px" />
<CarbonChange variant="fix" text="Resolved module config editing issue and updated MySql.cs." style="font-size:15px" />
<CarbonChange variant="fix" text="Resolved OnEntityTakeDamage issue." style="font-size:15px" />
<CarbonChange variant="fix" text="Resolved OnEntityTakeDamage issue." style="font-size:15px" />
<CarbonChange variant="update" text="Don't force servers to modded when Vanish or ModerationTools is enabled." style="font-size:15px" />
<CarbonChange variant="update" text="Error handling in RustPlugin." style="font-size:15px" />
<CarbonChange variant="update" text="Error handling in RustPlugin." style="font-size:15px" />
<CarbonChange variant="update" text="Expanded Admin module open command array (cp, cpanel) and added Vanish module customization options." style="font-size:15px" />
<CarbonChange variant="update" text="Expanded features on Modals." style="font-size:15px" />
<CarbonChange variant="update" text="Fixed plugins generating configs with null fields." style="font-size:15px" />
<CarbonChange variant="update" text="Fixed repeating timers and removed Command.SkipOriginal." style="font-size:15px" />
<CarbonChange variant="update" text="Fully implemented permission-based tabs system and added permissive features to all built-in tabs." style="font-size:15px" />
<CarbonChange variant="update" text="ImageDatabase initialization fix." style="font-size:15px" />
<CarbonChange variant="update" text="Implemented asm loader whitelist specialization." style="font-size:15px" />
<CarbonChange variant="update" text="Improved speed of mass plugin reloading." style="font-size:15px" />
<CarbonChange variant="update" text="Included 'No TechTree unlock' option in ModerationTools config to disable global TechTree node unlocking." style="font-size:15px" />
<CarbonChange variant="update" text="Increased script reader buffer size from 4KB to 8KB." style="font-size:15px" />
<CarbonChange variant="update" text="Initial HasLevel checks and Carbon tab permissions." style="font-size:15px" />
<CarbonChange variant="update" text="Load all plugins on server initialized when global.skipassetwarmup_crashes is enabled." style="font-size:15px" />
<CarbonChange variant="update" text="Marked c.version and c.build as auth-level 1 requirement." style="font-size:15px" />
<CarbonChange variant="update" text="Moved CUI.UniquifyCommand to Community.Protect." style="font-size:15px" />
<CarbonChange variant="update" text="Moved Local subtab to the left in Plugins panel." style="font-size:15px" />
<CarbonChange variant="update" text="New CarbonBehaviour abstract class and localized the Carbon tab." style="font-size:15px" />
<CarbonChange variant="update" text="Optimized plugin processing (pre-warming source code, improved async stream reading)." style="font-size:15px" />
<CarbonChange variant="update" text="Process only Carbon.Common (internal modules) and carbon/modules DLLs modules." style="font-size:15px" />
<CarbonChange variant="update" text="Register Admin module levels (0 through 3)." style="font-size:15px" />
<CarbonChange variant="update" text="Register hookable attribute permissions." style="font-size:15px" />
<CarbonChange variant="update" text="Resolved module config editing issue and updated MySql.cs." style="font-size:15px" />
<CarbonChange variant="update" text="ScriptProcessor cleanup." style="font-size:15px" />
<CarbonChange variant="update" text="Show Core plugin permissions in the Permissions tab." style="font-size:15px" />
<CarbonChange variant="update" text="Toggle noclip on vanish/unvanish (configurable)." style="font-size:15px" />
<CarbonChange variant="update" text="Update and rename develop-build.yml to preview-edge-build.yml." style="font-size:15px" />
<CarbonChange variant="update" text="Update and rename develop-build.yml to preview-edge-build.yml." style="font-size:15px" />
<CarbonChange variant="update" text="Updated CanPatrolHeliSeePlayer, CanUnlockTechTreeNode, OnChairComfort, OnEntitySpawn, OnChickenScared, OnHorseDung, OnJackieChan." style="font-size:15px" />
<CarbonChange variant="misc" text="Addressed multiple issues related to hook calls in certain plugins." style="font-size:15px" />
<CarbonChange variant="misc" text="Addressed multiple issues related to hook calls in certain plugins." style="font-size:15px" />
<CarbonChange variant="misc" text="Adjusted Server library inheritance and fixed staging branch issue (Pool.Free<T>)." style="font-size:15px" />
<CarbonChange variant="misc" text="Adjusted Server library inheritance and fixed staging branch issue (Pool.Free<T>)." style="font-size:15px" />
<CarbonChange variant="misc" text="Assigned token reference of CommandVar commands." style="font-size:15px" />
<CarbonChange variant="misc" text="BaseModule fix, virtualized BaseModule version, and DRM cleanup." style="font-size:15px" />
<CarbonChange variant="misc" text="Disabled main thread compilation if global.skipassetwarmup_crashes is enabled." style="font-size:15px" />
<CarbonChange variant="misc" text="Don't attempt to grant default/admin permissions if they're set to null in the config (disables auto-granting players to groups when empty, useful in some cases)." style="font-size:15px" />
<CarbonChange variant="misc" text="Enable Unity stacktrace on debug builds by default." style="font-size:15px" />
<CarbonChange variant="misc" text="Initial work on the new Command Processor." style="font-size:15px" />
<CarbonChange variant="misc" text="Integrated staging branch protocol hooks and numerous internal hooks." style="font-size:15px" />
<CarbonChange variant="misc" text="Normalize commands (ToLower, Trim) on registration." style="font-size:15px" />
<CarbonChange variant="misc" text="Quickstart fixes and invalidated setup wizard (it'll show up on up-to-date servers)." style="font-size:15px" />
<CarbonChange variant="misc" text="Renamed UiCommand to ProtectedCommand (for more versatile usage)." style="font-size:15px" />
<CarbonChange variant="misc" text="Resolved slow timers on boot issue and NRE in HandleEnableNeedsKeyboard." style="font-size:15px" />
<CarbonChange variant="misc" text="Resolved slow timers on boot issue and NRE in HandleEnableNeedsKeyboard." style="font-size:15px" />
<CarbonChange variant="misc" text="Simplified Make 'constructor' overrides." style="font-size:15px" />
<CarbonChange variant="misc" text="Simplified Make 'constructor' overrides." style="font-size:15px" />
<CarbonChange variant="remove" text="Disabled main thread compilation if global.skipassetwarmup_crashes is enabled." style="font-size:15px" />
<CarbonChange variant="remove" text="Fixed repeating timers and removed Command.SkipOriginal." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed duplicate initialization of Carbon Extensions." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed duplicate initialization of Carbon Extensions." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed misleading 'Is Core' and 'Is Disabled' read-only toggle options from Module inspector." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed OnInvalidPositionCheck as it was called about 8K times a second when used." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed redundant CanExplosiveStick (already in Extra) and updated RustEdit.Ext." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed redundant CanExplosiveStick (already in Extra) and updated RustEdit.Ext." style="font-size:15px" />
<CarbonChange variant="remove" text="Removed unnecessary self-implemented arg.ReplyWith behavior and switched to using Rust's methods." style="font-size:15px" />

:::
