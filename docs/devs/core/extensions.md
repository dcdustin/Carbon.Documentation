---
title: Extensions
description: Carbon Extension allow you to extend and reuse tools in one or multiple of your plugins.
---

# <CarbonIcons icon="star" /> Extensions

Carbon Extension allow you to extend and reuse tools in one or multiple of your plugins. These can viewed a library or common code base to reference across multiple locations. 

## Getting Started
Each Carbon extension (compiled DLL file) must come wish a class that extends from `ICarbonExtension` with the using namespace of `API.Assembly`.

:::details Extension Template
```csharp:line-numbers
#if CARBON

using System;
using API.Assembly;
using Carbon;

namespace Extension
{
	public class ExtensionEntrypoint : ICarbonExtension
	{
		public void OnLoaded(EventArgs args)
		{
			Community.Runtime.Events.Subscribe(API.Events.CarbonEvent.OnServerInitialized, arg =>
			{
				try
				{
					// Do something wild
				}
				catch (Exception ex)
				{
					Logger.Error("Failed doing something wild.", ex);
				}
			});
		}

		public void Awake(EventArgs args)
		{
			// Do something wild
		}

		public void OnUnloaded(EventArgs args)
		{
			// Do something wild
		}
	}
}

#endif
```
:::

## Template
The file below automatically keeps your environment up-to-date with the latest Carbon version and is designed to easily build your extension for Carbon-only, Oxide-only or both within the same project.

<CarbonButton
  href="/Carbon.ExtensionTemplate.zip"
  text="Download Template"
  icon="download"
/>