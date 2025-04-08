# LUI (Lightweight UI)

LUI is a **core UI component** of the Carbon framework that provides a fluent, object-oriented API for constructing and managing CUI elements in Rust. It simplifies creation, updates, and dispatch of UI elements, supports advanced layout logic, and is tightly integrated with Carbon’s UI and image systems.

> **Note:** This is not a module. LUI is an internal utility that is always available within Carbon.


## Overview
- **Type:** `Carbon.Components.LUI`
- **Purpose:** Simplified, high-performance UI construction and manipulation
- **Dependencies:** `CUI`, `ImageDatabaseModule`

## Getting Started

### Creating an Instance

```csharp
var lui = new LUI(cui); // `cui` is an instance of Carbon's CUI system
```

### Sending the UI to a Player

```csharp
lui.SendUi(player);           // Sends built UI to player
lui.SendUiJson(player);       // Sends JSON variant of UI (for debugging)
```


## Creating Panels

```csharp
lui.CreatePanel(parent, position, offset, color, name);
```

Optional overloads exist for creating panels with just offsets or simplified parameters.


## Creating Text

```csharp
lui.CreateText(parent, position, offset, fontSize, color, "My text");
```

Additional options include alignment, name, and font customization.


## Creating Images

- From file:

```csharp
lui.CreateImage(parent, position, offset, pngUrl);
```

- From Image Database:

```csharp
lui.CreateImageFromDb(parent, position, offset, "myImageKey");
```

- From URL:

```csharp
lui.CreateUrlImage(parent, position, offset, "https://example.com/image.png");
```

## Creating Item Icons

```csharp
lui.CreateItemIcon(parent, position, offset, "rifle.ak", 123456789);
```

Supports both item short names and item IDs.


## Adding Buttons

```csharp
lui.CreateButton(parent, position, offset, command, color);
```

## Adding Input Fields

```csharp
lui.CreateInput(parent, position, offset, color, defaultText, fontSize, command);
```

Options: character limits, font type, password fields, keyboard support, and more.


## Advanced UI Components

- **Scroll Views**
- **Draggable Elements**
- **Slots**
- **Countdowns**
- **Steam Avatars**

Each of these features has a corresponding `Create...` method with highly customizable parameters.


## Updating UI Elements

```csharp
lui.UpdateText("elementName", "Updated content");
lui.UpdateColor("elementName", "#FF0000");
lui.UpdatePosition("elementName", new LuiPosition(...));
```

You can also create an update container with `lui.Update("elementName")` and modify multiple properties in sequence.


## Rendering to JSON

```csharp
string json = lui.ToJson();
```

Useful for debugging or previewing UI layout offline.

---

For a full list of component types, fonts, alignments, and helper methods, see the [`LUIBuilder.cs`](https://github.com/CarbonCommunity/Carbon.Common/blob/c77e923f66878695f593d82a52b7259efcce0717/src/Carbon/Components/LUI.cs) source and support classes.