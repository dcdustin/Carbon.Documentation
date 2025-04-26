# <CarbonIcons icon="database" />  Creating your Project

This section will guide you through creating your project and linking it to a local development server.

Having a local server can help ensure you the latest DLLs for both Rust and Carbon.

:::details Carbon Project Template

You can download the Visual Studio 2022 project template for Carbon below. This acts as a self contained server and development environment for Carbon Plugins.

### **Features:**
- Batch file to download the [Carbon QuickStart Repository](https://github.com/CarbonCommunity/Carbon.QuickStart/tree/main/win)
- Preconfigured `.csproj` pointing to `Carbon.targets`
- Self contained local server inside project folder

<CarbonButton href="http://carbonmod.gg/redist/TemplateProject.zip" text="TemplateProject.zip" icon="clouddownload" external/> <br>

:::details Instructions:
1. Download `TemplateProject.zip` and move it to  
   `%USERPROFILE%\Documents\Visual Studio 2022\Templates\ProjectTemplates\`
2. Open Visual Studio 2022 → `Create a new project` → search `carbon` → select `Carbon Template`
3. Set project `Name` and `Location`, check `Place solution and project in the same directory`, then click `Create`
4. Run `/Rust/Download_Quickstart.bat`, then `update_edge.bat` — wait for each to finish
5. Edit and run `run.bat`
6. Restart Visual Studio after the server boots
:::

## <CarbonIcons icon="clouddownload" /> Picking an IDE

To get started with a good developing environment, you need to install [**Visual Studio 2022**](https://visualstudio.microsoft.com/vs/) or [**Rider**](https://www.jetbrains.com/rider/). 
:::tip Visual Studio 2022
This tutorial will be written assuming you are using **VS2022**.
:::

## <CarbonIcons icon="folderplus" /> Step 1: Create Your Directory Structure
Choose a location for your files, such as `F:\RustModding\`. Inside this location, create two subfolders:  

1. **Carbon Server** – This will contain all the server files needed to run Carbon.
2. **Plugin Dev** – This is where you’ll develop your plugins.  

:::details Windows FileSystem Limitations
Windows has a limit of 256 characters for each file name, this includes all the folders in the filepath.

It is recommended that you create your these folders in or close to your root directory.
:::

## <CarbonIcons icon="download" /> Step 2: Download the Carbon QuickStart Files  
Download the Carbon QuickStart files from the [Carbon QuickStart Repository](https://github.com/CarbonCommunity/Carbon.QuickStart/tree/main/win) and place them inside the **Carbon Server** folder.
:::info Installation Instructions
You can find the [Installation Instructions here](/devs/local-server-hosting), please follow them when installing your local server.
:::

## <CarbonIcons icon="scrolltext" /> Step 3: Update Carbon  
Run the `update_edge.bat` file inside the Carbon Server folder. This will download the latest files required for Carbon to function.  

:::tip Changing Branches
If you want to use a specific branch, run the appropriate `update_*.bat` file instead. Wait for the process to finish before continuing.

**Options:** `production`,`preview`,`edge`,`rustbeta_staging`
:::

## <CarbonIcons icon="filepenline" /> Step 4: Configure the Server  
Open the `run.bat` file in a text editor and adjust the variables to meet your needs. This file controls key settings such as server name and port configurations.  

:::danger Default Password
Make sure you change your password to something unique.

If your password is the default password, your RCON will not work.
:::

## <CarbonIcons icon="play" /> Step 5: Start the Server  
Run `run.bat` and wait for the server to fully boot.  

## <CarbonIcons icon="filepenline" /> Step 6: Enable Developer Mode  
Navigate to the `<root>/carbon` directory and open the `config.json` file. Find the **DeveloperMode** setting and change it to `true`.  

:::info Developer Mode
Enabling Developer Mode ensures that Carbon saves the patched DLLs to `<root>/carbon/developer/patched_assemblies/`. These DLLs are used by the **Carbon.targets** file, which is necessary for plugin development.  
:::

## <CarbonIcons icon="fileplus" /> Step 7: Create a New Project in Your IDE  
Open your IDE (Visual Studio is recommended) and create a new project inside the `Plugin Dev` directory. Select `Class Library (.NET Framework)` as the project type.  

When prompted to choose a framework, select `.NET Framework 4.8` and proceed with the project creation.  

## <CarbonIcons icon="filepenline" /> Step 8: Modify the Project File  
Inside your newly created project, locate the `.csproj` file. Open it in a text editor and add the following line on the second line of the file:  

`<Import Project="<root>/Carbon.targets" />`  

This ensures that your project has access to the necessary Carbon assemblies. Save the file once done.  

## <CarbonIcons icon="power" /> Step 9: Restart Your IDE  
To apply the changes, close and reopen your IDE.  

---

Once you've completed these steps, your development environment will be fully set up, and you’ll have everything needed to start creating plugins for Carbon.

🎉 Happy coding! 🚀  
<br>
<CarbonIcons icon="snail" /> Snail for good luck!
