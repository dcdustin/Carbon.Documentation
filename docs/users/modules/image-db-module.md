# Image Database Module

The Image Database Module is a **core module** included in the Carbon modding framework for Rust. It manages downloading, storing, mapping, and reusing images via Rust's `FileStorage` system and Carbon’s own identifiers.

> **Note:** This module is **built into Carbon** and does not require installation like traditional plugins. It is always enabled and cannot be disabled.


## Overview
- **Class Name:** `ImageDatabaseModule`
- **Enabled by default:** Yes
- **Force enabled:** Yes (cannot be disabled)
- **Supports Configuration:** No
- **Source:** [ImageDatabaseModule.cs](https://github.com/CarbonCommunity/Carbon.Common/blob/develop/src/Carbon/Modules/ImageDatabaseModule/ImageDatabaseModule.cs)
- **Forces Modded Tag:** No

This module allows **plugins to download images from URLs**, assign internal keys to them, and reuse them efficiently with caching. It also supports QR code generation.

## Accessing the Module in Plugins

```csharp
var imageDb = Carbon.GetModule<ImageDatabaseModule>();
```

## How It Works

### Queue Image

```csharp
imageDb.Queue("my-key", "https://example.com/image.png");
```

You can also directly add raw image data:

```csharp
var imagePath = "carbon/data/someimage.png";
var bytes = File.ReadAllBytes(imagePath);
imageDb.AddImage("my-key", bytes);
```

Retrieve the stored image ID:

```csharp
var imageId = imageDb.GetImage("my-key");
```

## QR Code Generation

```csharp
var qrId = imageDb.GetQRCode("https://carbonmod.gg");
```

## Image Removal

```csharp
imageDb.DeleteImage("https://example.com/image.png");
```

## Default Images

These default images are queued automatically on startup or can be manually reloaded using the console command `imagedb.loaddefaults`:

| Key | URL | IMAGE |
|-----|-----|-------|
| carbonb | https://carbonmod.gg/assets/media/carbonlogo_b.png | ![carbonb](https://carbonmod.gg/assets/media/carbonlogo_b.png) |
| carbonw | https://carbonmod.gg/assets/media/carbonlogo_w.png | ![carbonw](https://carbonmod.gg/assets/media/carbonlogo_w.png) |
| carbonbs | https://carbonmod.gg/assets/media/carbonlogo_bs.png | ![carbonbs](https://carbonmod.gg/assets/media/carbonlogo_bs.png) |
| carbonws | https://carbonmod.gg/assets/media/carbonlogo_ws.png | ![carbonws](https://carbonmod.gg/assets/media/carbonlogo_ws.png) |
| cflogo | https://carbonmod.gg/assets/media/cui/codefling-logo.png | ![cflogo](https://carbonmod.gg/assets/media/cui/codefling-logo.png) |
| checkmark | https://carbonmod.gg/assets/media/cui/checkmark.png | ![checkmark](https://carbonmod.gg/assets/media/cui/checkmark.png) |
| umodlogo | https://carbonmod.gg/assets/media/cui/umod-logo.png | ![umodlogo](https://carbonmod.gg/assets/media/cui/umod-logo.png) |
| clouddl | https://carbonmod.gg/assets/media/cui/cloud-dl.png | ![clouddl](https://carbonmod.gg/assets/media/cui/cloud-dl.png) |
| trashcan | https://carbonmod.gg/assets/media/cui/trash-can.png | ![trashcan](https://carbonmod.gg/assets/media/cui/trash-can.png) |
| shopping | https://carbonmod.gg/assets/media/cui/shopping-cart.png | ![shopping](https://carbonmod.gg/assets/media/cui/shopping-cart.png) |
| installed | https://carbonmod.gg/assets/media/cui/installed.png | ![installed](https://carbonmod.gg/assets/media/cui/installed.png) |
| reload | https://carbonmod.gg/assets/media/cui/reload.png | ![reload](https://carbonmod.gg/assets/media/cui/reload.png) |
| update-pending | https://carbonmod.gg/assets/media/cui/update-pending.png | ![update-pending](https://carbonmod.gg/assets/media/cui/update-pending.png) |
| magnifying-glass | https://carbonmod.gg/assets/media/cui/magnifying-glass.png | ![magnifying-glass](https://carbonmod.gg/assets/media/cui/magnifying-glass.png) |
| filter | https://carbonmod.gg/assets/media/cui/filter.png | ![filter](https://carbonmod.gg/assets/media/cui/filter.png) |
| star | https://carbonmod.gg/assets/media/cui/star.png | ![star](https://carbonmod.gg/assets/media/cui/star.png) |
| glow | https://carbonmod.gg/assets/media/cui/glow.png | ![glow](https://carbonmod.gg/assets/media/cui/glow.png) |
| gear | https://carbonmod.gg/assets/media/cui/gear.png | ![gear](https://carbonmod.gg/assets/media/cui/gear.png) |
| sort | https://carbonmod.gg/assets/media/cui/sort.png | ![sort](https://carbonmod.gg/assets/media/cui/sort.png) |
| close | https://carbonmod.gg/assets/media/cui/close.png | ![close](https://carbonmod.gg/assets/media/cui/close.png) |
| fade | https://carbonmod.gg/assets/media/cui/fade.png | ![fade](https://carbonmod.gg/assets/media/cui/fade.png) |
| graph | https://carbonmod.gg/assets/media/cui/graph.png | ![graph](https://carbonmod.gg/assets/media/cui/graph.png) |
| maximize | https://carbonmod.gg/assets/media/cui/maximize.png | ![maximize](https://carbonmod.gg/assets/media/cui/maximize.png) |
| minimize | https://carbonmod.gg/assets/media/cui/minimize.png | ![minimize](https://carbonmod.gg/assets/media/cui/minimize.png) |
| folder | https://carbonmod.gg/assets/media/cui/folder.png | ![folder](https://carbonmod.gg/assets/media/cui/folder.png) |
| file | https://carbonmod.gg/assets/media/cui/file.png | ![file](https://carbonmod.gg/assets/media/cui/file.png) |
| translate | https://carbonmod.gg/assets/media/cui/translate.png | ![translate](https://carbonmod.gg/assets/media/cui/translate.png) |
| cf_hero | https://carbonmod.gg/assets/media/cui/pluginstab/cf_hero.png | ![cf_hero](https://carbonmod.gg/assets/media/cui/pluginstab/cf_hero.png) |
| umod_hero | https://carbonmod.gg/assets/media/cui/pluginstab/umod_hero.png | ![umod_hero](https://carbonmod.gg/assets/media/cui/pluginstab/umod_hero.png) |
| installed_hero | https://carbonmod.gg/assets/media/cui/pluginstab/installed_hero.png | ![installed_hero](https://carbonmod.gg/assets/media/cui/pluginstab/installed_hero.png) |
| hero_fade | https://carbonmod.gg/assets/media/cui/pluginstab/hero_fade.png | ![hero_fade](https://carbonmod.gg/assets/media/cui/pluginstab/hero_fade.png) |
| fade_flip | https://carbonmod.gg/assets/media/cui/pluginstab/fade_flip.png | ![fade_flip](https://carbonmod.gg/assets/media/cui/pluginstab/fade_flip.png) |
| empty_star | https://carbonmod.gg/assets/media/cui/pluginstab/empty_star.png | ![empty_star](https://carbonmod.gg/assets/media/cui/pluginstab/empty_star.png) |
| half_star | https://carbonmod.gg/assets/media/cui/pluginstab/half_star.png | ![half_star](https://carbonmod.gg/assets/media/cui/pluginstab/half_star.png) |
| full_star | https://carbonmod.gg/assets/media/cui/pluginstab/full_star.png | ![full_star](https://carbonmod.gg/assets/media/cui/pluginstab/full_star.png) |
| top_left | https://carbonmod.gg/assets/media/cui/pluginstab/top_left.png | ![top_left](https://carbonmod.gg/assets/media/cui/pluginstab/top_left.png) |
| default_profile | https://carbonmod.gg/assets/media/cui/pluginstab/default_profile.jpg | ![default_profile](https://carbonmod.gg/assets/media/cui/pluginstab/default_profile.jpg) |

## Example Use in Plugin

```csharp
imageDb.Queue("logo", "https://mydomain.com/logo.png");
var id = imageDb.GetImage("logo");
```

---

For maximum compatibility, always check `HasImage(key)` before trying to use it in a UI.