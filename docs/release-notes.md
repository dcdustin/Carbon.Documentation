# Release Notes

## 2.0.181
<CarbonButton
  href="https://github.com/CarbonCommunity/Carbon.Core/releases/tag/production_build"
  text="Download Latest"
  icon="github"
  external=true
/>

Latest production release build changelog based on the [production branch](https://github.com/CarbonCommunity/Carbon.Core/tree/production) .  
This build is targeted at the general public.

> **Released on:** <Badge type="info" text="21.03.2025 1:58PM GMT+1" />
---
<Badge class="release new" text="NEW"/> Added -harmonydir which allows you to modify the directory path of HarmonyMods.<br>
<Badge class="release new" text="NEW" /> Added c.createplugin which creates a new blank plugin with the OnServerInitialized hook.<br>
<Badge class="release new" text="NEW" /> Added brand new LUI system, an ultra-fast CUI building system (thanks ThePitereq!).<br>
<Badge class="release new" text="NEW" /> Added Carbon.Generator.Shared reference.<br>
<Badge class="release new" text="NEW" /> Added Carbon.Profiler (and included it into Roslyn).<br>
<Badge class="release new" text="NEW" /> Added failsafe deprecated extension to redirect plugins using Effect.Clear with a boolean parameter, to compile and properly execute on staging/next update.<br>
---
<Badge class="release fixed" text="FIXED" />  Vanish Module: Fixed vanish icon and text remaining on-screen after waking up from dying.<br>
<Badge class="release fixed" text="FIXED" />  Fixed an issue where timer.Reset wouldn't properly reset the timer's delay.<br>
<Badge class="release fixed" text="FIXED" />  Fixed missing Carbon.Native build from Release builds.<br>
---
<Badge class="release updated" text="UPDATED" /> Admin Module: Pinned config editor options.<br>
<Badge class="release updated" text="UPDATED" /> Admin Module: Pinned Configuration tab options at the top.<br>
<Badge class="release updated" text="UPDATED" /> Admin Module: Pinned Plugins tab search bar.<br>
<Badge class="release updated" text="UPDATED" /> Significantly optimized CUI building speed.<br>
---
<Badge class="release misc" text="MISC" /> Admin Module: Optimized local methods in a few places by changing them from local to static.<br>
<Badge class="release misc" text="MISC" /> Vanish Module: Moved the vanish UI in the Under UI layer.<br>
<Badge class="release misc" text="MISC" /> Enforce publicisation for Rust.FileSystem.dll.<br>
<Badge class="release misc" text="MISC" /> Inject UnityEngine.AssetBundleModule into the Roslyn compiler.<br>
---
<Badge class="release removed" text="REMOVED" /> Removed default values for ScrollView.<br>
<Badge class="release removed" text="REMOVED" /> Removed hook generator code from HookCaller and moved it to Carbon.Generator.Shared.<br>
<Badge class="release removed" text="REMOVED" /> Removed LogSpamCleanup patch (Facepunch removed the log).<br>
<Badge class="release removed" text="REMOVED" /> Removed unused mask softness property from CUI.<br>
---
:::details Carbon Update - v2.0.178 <Badge class="release date" text="12.03.2025 3:40AM GMT+1" />
<Badge class="release new" text="NEW"/> Added -harmonydir which allows you to modify the directory path of HarmonyMods.<br>
<Badge class="release new" text="NEW" /> Added c.createplugin which creates a new blank plugin with the OnServerInitialized hook.<br>
<Badge class="release new" text="NEW" /> Added brand new LUI system, an ultra-fast CUI building system (thanks ThePitereq!).<br>
<Badge class="release new" text="NEW" /> Added Carbon.Generator.Shared reference.<br>
<Badge class="release new" text="NEW" /> Added Carbon.Profiler (and included it into Roslyn).<br>
<Badge class="release new" text="NEW" /> Added failsafe deprecated extension to redirect plugins using Effect.Clear with a boolean parameter, to compile and properly execute on staging/next update.<br>
<Badge class="release fixed" text="FIXED" />  Vanish Module: Fixed vanish icon and text remaining on-screen after waking up from dying.<br>
<Badge class="release fixed" text="FIXED" />  Fixed an issue where timer.Reset wouldn't properly reset the timer's delay.<br>
<Badge class="release fixed" text="FIXED" />  Fixed missing Carbon.Native build from Release builds.<br>
<Badge class="release updated" text="UPDATED" /> Admin Module: Pinned config editor options.<br>
<Badge class="release updated" text="UPDATED" /> Admin Module: Pinned Configuration tab options at the top.<br>
<Badge class="release updated" text="UPDATED" /> Admin Module: Pinned Plugins tab search bar.<br>
<Badge class="release updated" text="UPDATED" /> Significantly optimized CUI building speed.<br>
<Badge class="release misc" text="MISC" /> Admin Module: Optimized local methods in a few places by changing them from local to static.<br>
<Badge class="release misc" text="MISC" /> Vanish Module: Moved the vanish UI in the Under UI layer.<br>
<Badge class="release misc" text="MISC" /> Enforce publicisation for Rust.FileSystem.dll.<br>
<Badge class="release misc" text="MISC" /> Inject UnityEngine.AssetBundleModule into the Roslyn compiler.<br>
<Badge class="release removed" text="REMOVED" /> Removed default values for ScrollView.<br>
<Badge class="release removed" text="REMOVED" /> Removed hook generator code from HookCaller and moved it to Carbon.Generator.Shared.<br>
<Badge class="release removed" text="REMOVED" /> Removed LogSpamCleanup patch (Facepunch removed the log).<br>
<Badge class="release removed" text="REMOVED" /> Removed unused mask softness property from CUI.<br>
:::
:::details Carbon Update - v2.0.171 <Badge class="release date" text="12.03.2025 3:40AM GMT+1" />
previous release go brrr
:::
:::details Carbon Update - v2.0.170 <Badge class="release date" text="12.03.2025 3:40AM GMT+1" />
previous release go brrr
:::