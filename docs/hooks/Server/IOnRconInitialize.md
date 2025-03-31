<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# IOnRconInitialize
Called when the RCON server is initializing during server startup.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object IOnRconInitialize()
{
	Puts("IOnRconInitialize has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ Facepunch.RCon]
public static void Initialize()
{
	if (Port == 0)
	{
		Port = ConVar.Server.port;
	}
	Password = Facepunch.CommandLine.GetSwitch("-rcon.password", Facepunch.CommandLine.GetSwitch("+rcon.password", ""));
	if (Password.Length < 8)
	{
		UnityEngine.Debug.Log("\r\n*******************************************************\r\n**                                                   **\r\n** RCON password length is very insecure.            **\r\n** Support for passwords less than 8 characters may  **\r\n** be removed in the future.                         **\r\n**                                                   **\r\n*******************************************************\r\n");
	}
	switch (Password.ToLower())
	{
	case "changeme":
	case "abc123":
	case "qwerty":
	case "qwerty123":
	case "123456":
	case "000000":
	case "password123":
	case "password":
	case "":
		UnityEngine.Debug.Log("\r\n*******************************************************\r\n**                                                   **\r\n** RCON password is very insecure, RCON is disabled. **\r\n**                                                   **\r\n*******************************************************\r\n");
		return;
	}
	Facepunch.Output.OnMessage += OnMessage;
	if (Web)
	{
		listenerNew = new Facepunch.Rcon.Listener();
		string serverFolder = ConVar.Server.GetServerFolder("cfg");
		listenerNew.BansFile = serverFolder + "/rcon-bans.cfg";
		if (!string.IsNullOrEmpty(Ip))
		{
			listenerNew.Address = Ip;
		}
		listenerNew.Password = Password;
		listenerNew.Port = Port;
		listenerNew.SslCertificate = Facepunch.CommandLine.GetSwitch("-rcon.ssl", Facepunch.CommandLine.GetSwitch("+rcon.ssl", null));
		listenerNew.SslCertificatePassword = Facepunch.CommandLine.GetSwitch("-rcon.sslpwd", Facepunch.CommandLine.GetSwitch("+rcon.sslpwd", null));
		listenerNew.OnMessage = delegate(System.Net.IPAddress ip, int id, string msg)
		{
			Facepunch.RCon.Command item = Newtonsoft.Json.JsonConvert.DeserializeObject<Facepunch.RCon.Command>(msg);
			item.Ip = ip;
			item.ConnectionId = id;
			Commands.Enqueue(item);
		};
		listenerNew.Start();
		UnityEngine.Debug.Log($"WebSocket RCON Started on {Ip}:{Port}");
	}
	else
	{
		listener = new Facepunch.RCon.RConListener();
		UnityEngine.Debug.Log("RCON Started on " + Port);
		UnityEngine.Debug.Log("\r\n*********************************************************************\r\n**                                                                 **\r\n** Source engine style TCP RCON is deprecated and will be removed. **\r\n** Please switch to Websocket RCON by setting rcon.web to true     **\r\n**                                                                 **\r\n*********************************************************************");
	}
}

```
:::
