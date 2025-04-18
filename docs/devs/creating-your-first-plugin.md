# <CarbonIcons icon="filepenline" /> Creating your First Plugin

If you’re looking at creating Oxide-compatible plugins, it’s as easy as you’ve always known it. It uses the same syntax, naming and formatting as regular Oxide plugins.

```csharp:line-numbers
namespace Oxide.Plugins;

[Info ( "Template", "<author>", "1.0.0" )]
[Description ( "<optional_description>" )]
public class Template : RustPlugin
{
    private void OnServerInitialized ()
    {
        Puts ( "Hello world!" );
    }
}

```

## <CarbonIcons icon="star" /> CarbonPlugin

If you’re looking to create Carbon-only plugins, which extends the functionality of regular Oxide plugins, and brings you more tools for easing the development of your plugins, you may now use **CarbonPlugin** as your file’s inheritance.

```csharp:line-numbers
namespace Carbon.Plugins;

[Info ( "Template", "<author>", "1.0.0" )]
[Description ( "<optional_description>" )]
public class Template : CarbonPlugin
{
    private void OnServerInitialized ()
    {
        Puts ( "Hello world!" );
    }
}

```
