---
title: Profiler (Mono)
description: A Rust (language) native high-speed and lightweight Mono profiler with the ability to profile game assemblies, Carbon, plugins, modules & extensions at depth.
---

# Profiler (Mono)

A Rust (language) native high-speed and lightweight Mono profiler with the ability to profile game assemblies, Carbon, plugins, modules & extensions at high depth.

## Introduction
![CSZIP Sample](/misc/mono-profiler-header.webp)

The Mono Profiler is a Carbon built-in feature, offering high performance and convenience, making it ideal for profiling the game, plugins, and more - efficiently.

:::info ✅ You may profile the following:
* **Game assemblies** (Assembly-CSharp, Facepunch.*, Rust.*, Unity*, System, etc.)
* **Carbon assemblies** (Carbon.Common, Carbon.Compat, etc.)
* **Plugin assemblies**
* **Module assemblies**
* **Extension assemblies**
:::

Search for `c.profile` in the [Commands reference](/Carbon.Documentation/references/commands) index for an up to date list of profiler commands

## Config
The configuration for the profiler is located at `carbon/config.profiler.json`.

::: code-group
```json [config.profiler.json]
{
  // Disabling it will shut it off entirely
  "Enabled": true,
  
  // Keeps track of all calls for assemblies and methods
  "TrackCalls": true,
  
  // Disabled by default, allows authorized users to access the Admin module 
  // profiler source viewer and view source code of called methods
  "SourceViewer": true,
  
  // All assemblies and libraries (Rust, Carbon, libs..)
  // Enabling all (*) assemblines, will bypass the categories below
  "Assemblies": [ 
    "Assembly-CSharp",
    "Assembly-CSharp-firstpass"
  ],
  
  // All .cs and .cszip plugins
  "Plugins": [
    "*"
  ],
  
  // All modules from carbon/managed/modules directory
  "Modules": [
    "*"
  ],
  
  // All extensions from carbon/extensions directory
  "Extensions": [
    "Carbon.Ext.MyExtension"
  ],
  
  // All Harmony mods from carbon/harmony directory
  "Harmony": []
}
```
:::

:::danger NOTE
To enable profiling with full selection for one or more categories, use a wildcard/star ( `*` ).
:::
:::tip IMPORTANT
Remove the `//` comments from the JSON above if you're willing to override it locally with it.
:::

## Getting Started

### Profiler Flags
They're used when starting or stopping the profiler when processing is executed.

:::info USEFUL
If the `Calls` flag is **NOT** set, only memory allocations will be profiled.
:::

### `Abort`
When the profiler is recording, this flag will terminate recording and discard collected stack and data processed natively.

### `Memory`
Requires the `Calls` flag to be set. The profiler will keep track of the memory of each call in the stack.

### `Timings`
:::danger IMPORTANT
**This flag will significantly affect performance due to having to calculate the time taken on each call.**
:::
Requires the `Calls` flag to be set. The profiler will keep track of the timing & duration information for each call in the stack.

### `Calls`
Whether method calls should be tracked by the current stack.