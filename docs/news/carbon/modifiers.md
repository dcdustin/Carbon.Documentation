---
title: Modifiers
description: Woop woop!
header: /news/modifiers-bg.jpg
logo: /news/modifiers.png
date: 2025-07-01
tags: [docs]
layout: news-layout
sidebar: false
---

<h1 class="news-text-section">Introduction</h1>
<div class="news-section">
Welcome! These docs have been crafted by community members with the approach and perspective of server owners and developers/modders. 

```csharp
using Carbon.Components;
using Newtonsoft.Json;

namespace Carbon.Plugins;

[Info("VaultTest", "rauls", "1.0")]
public class VaultTest : CarbonPlugin
{
    public ConfigTest configTest;

    private void OnServerInitialized()
    {
        Puts(configTest.Password);
    }

    protected override void LoadConfig()
    {
        base.LoadConfig();
        configTest = Config.ReadObject<ConfigTest>();
    }

    private void LoadDefaultConfig()
    {
        configTest ??= new();
    }

    private void OnServerSave()
    {
        Config.WriteObject(configTest ??= new());
    }

    public class ConfigTest
    {
        public string Username;
#if CARBON
        [JsonConverter(typeof(Vault.Protected))]
#endif
        public string Password;
    }
}
```

</div>