# ClientEntity (Client-side Networked Entity)

`ClientEntity` is a **core component** of the Carbon framework that enables the creation and management of lightweight networked entities visible only to selected clients. These entities do not exist server-side, making them extremely efficient for client-specific interactions and visual elements.

> **Note:** This is not a plugin or module. `ClientEntity` is part of Carbon’s runtime and always available.


## Overview
- **Type:** `Carbon.Components.ClientEntity`
- **Purpose:** Spawn, update, and destroy entities per client with custom behavior
- **Net usage:** Efficient per-client entity transmission using `ProtoBuf`


## Creating a ClientEntity

```csharp
var entity = ClientEntity.Create("assets/prefabs/deployable/chair/chair.deployed.prefab", position, rotation);
```

Optional parameters allow you to pass a custom `ProtoBuf.Entity`, a `netId`, and a `group`.


## Setting Properties

```csharp
entity.Position = new Vector3(0, 2, 0);
entity.Rotation = new Vector3(0, 90, 0);
entity.Flags = BaseEntity.Flags.OnFire;
```

You can also assign `ParentID` and modify the `Prefab` after creation.


## Spawning

```csharp
entity.SpawnFor(connection);           // For one connection
entity.SpawnAll(connections);         // For multiple clients
```


## Destruction

```csharp
entity.KillFor(connection);           // Kills entity for one
entity.KillAll();                     // Kills entity for all watchers
```


## Network Updates

```csharp
entity.SendNetworkUpdate();           // Full update
entity.SendNetworkUpdate_Flags();     // Just flag update
entity.SendNetworkUpdate_Position();  // Just position/rotation
```


## Flags

```csharp
entity.SetFlag(BaseEntity.Flags.On, true);
```

Check existing flags:
```csharp
if (entity.HasFlag(BaseEntity.Flags.On)) { ... }
```


## RPC Handling

Override this method to implement custom RPC behavior:

```csharp
public override void OnRpc(string rpc, Message message)
{
    // Handle client-side interaction
}
```

## Disposal

```csharp
entity.Dispose();
```

Disposes all associated network data and removes the entity from tracking.

---

`ClientEntity` is perfect for implementing **visual-only effects**, **custom client HUD objects**, or **interactive client-only actors** without the performance cost of full entities.

