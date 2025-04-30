![alt](/logos/carbon-banner-dark-small.webp){.dark-only}
![alt](/logos/carbon-banner-light-small.webp){.light-only}

<script setup>
import { VPBadge } from 'vitepress/theme'

const getDownloadUrl = (tag, build) => {
    return "https://github.com/CarbonCommunity/Carbon/releases/download/" + tag + "_build/" + build
}

const getBorderColor = (release) => {
    switch(release.priority) {
        case -1:
            return "#8f3333"
        case 1:
            return "#6a6a0c"
    }
    return "#44444400"
}

const releases = [
    {
        color: "#8f3333",
        displayName: "Production Build",
        branch: "production",
        tag: "production_build",
        rustBranches: ["public", "release"],
        builds: [
        {
            name: "Release"
        },
        {
            name: "Minimal"
        }] 
    },
    {
        color: "#6a6a0c",
        priority: 1,
        displayName: "Edge Build",
        branch: "develop",
        tag: "edge_build",
        rustBranches: ["public", "release"],
        builds: [
        {
            name: "Debug"
        },
        {
            name: "Minimal"
        }]
    },
    {
        color: "#0c676a",
        priority: 1,
        displayName: "QA Build",
        branch: "qa",
        tag: "qa_build",
        rustBranches: ["public", "release", "staging"],
        builds: [
        {
            name: "Debug"
        },
        {
            name: "Release"
        },
        {
            name: "Minimal"
        }]
    },
    {
        displayName: "Preview Build",
        branch: "preview",
        tag: "preview_build",
        rustBranches: ["public", "release"],
        builds: [
        {
            name: "Debug"
        },
        {
            name: "Minimal"
        }]
    },
    {
        displayName: "Rust (Beta) Staging Build",
        branch: "rust_beta/staging",
        tag: "rustbeta_staging_build",
        rustBranches: ["staging"],
        builds: [
        {
            name: "Debug"
        },
        {
            name: "Minimal"
        }]
    },
    {
        displayName: "Rust (Beta) Release Build",
        branch: "rust_beta/release",
        tag: "rustbeta_release_build",
        rustBranches: ["release"],
        builds: [
        {
            name: "Debug"
        },
        {
            name: "Release"
        },
        {
            name: "Minimal"
        }]
    },
    {
        displayName: "Rust (Beta) Aux01 Build",
        branch: "rust_beta/aux01",
        tag: "rustbeta_aux01_build",
        rustBranches: ["aux01"],
        builds: [
        {
            name: "Debug"
        },
        {
            name: "Minimal"
        }]
    },
    {
        displayName: "Rust (Beta) Aux02 Build",
        branch: "rust_beta/aux02",
        tag: "rustbeta_aux02_build",
        rustBranches: ["aux02"],
        builds: [
        {
            name: "Debug"
        },
        {
            name: "Minimal"
        }]
    },
    {
        displayName: "Rust (Beta) Aux03 Build",
        branch: "rust_beta/aux03",
        tag: "rustbeta_aux03_build",
        rustBranches: ["aux03"],
        builds: [
        {
            name: "Debug"
        },
        {
            name: "Minimal"
        }]
    }
]

</script>

:::info 
**Carbon** is a modding framework that is dedicated to take care of all background processing and execution of customized plugins and extensions in the most optimal way possible.

This project is designed to work as close as the way Oxide does, with slight interface adjustments but with the sole purpose of allowing most Oxide-dedicated plugins to work in Carbon's environment.
:::

An anticipated system designed to execute **existent** Oxide plugins, all within Harmony **without** any patches, for optimized performance purposes.

## Development

To follow up with the development of Carbon, keep up with our repositories [**here**](https://github.com/CarbonCommunity).

## Releases  
This is the download list for all official files redistributed with Carbon:

:::tip How to install
1. Download the archive from the attachments below.
2. Unzip the archive to the root of your Rust Dedicated Server.
3. Restart the server and enjoy.

More detailed instructions can be found in the [Installing Carbon](./installing-carbon.md) section.
:::

## Downloads
<div class="plugin-tabs" v-for="release in releases" :key="release" :style="'border: 1px solid' + (release.color == null ? '#44444400' : release.color)">
    <div style="padding: 20px;">
    <h3 :id="release.tag" style="margin: 0px 0 20px 10px"><a class="header-anchor" :href="'#' + release.tag"/> {{ release.displayName }}</h3>
    This is a release build of Carbon based on the <code>{{ release.branch }}</code> branch. <br/><br/>
    <a :href="'https://github.com/CarbonCommunity/Carbon/releases/tag/' + release.tag" target="_blank"><VPBadge type="danger">Github Release <CarbonIcons icon="ExternalLink" size="14"/></VPBadge></a> <a :href="'https://github.com/CarbonCommunity/Carbon/tree/' + release.branch" target="_blank"><VPBadge type="danger">Github Branch <CarbonIcons icon="ExternalLink" size="14"/></VPBadge></a> <a :href="'https://github.com/CarbonCommunity/Carbon/commit/' + release.branch" target="_blank"><VPBadge type="info">Latest Commit <CarbonIcons icon="ExternalLink" size="14"/></VPBadge></a>
    <table>
    <thead>
    <tr>
        <th>Windows</th>
        <th>Linux</th>
    </tr>
    </thead>
    <tbody>
        <tr v-for="build in release.builds" :key="build">
        <td><CarbonButton style="width: 140px;" :href="'https://github.com/CarbonCommunity/Carbon/releases/download/' + release.tag + '/Carbon.Windows.' + build.name + '.zip'" :text="build.name + ' Build'" external/></td>
        <td><CarbonButton style="width: 140px;" :href="'https://github.com/CarbonCommunity/Carbon/releases/download/' + release.tag + '/Carbon.Linux.' + build.name + '.tar.gz'" :text="build.name + ' Build'" external/></td>
        </tr>
    </tbody>
    </table>
    This build is compatible with <a :href="'https://steamdb.info/app/258550/depots/?branch=' + rustBranch" target="_blank" v-for="rustBranch in release.rustBranches" :key="rustBranch"><VPBadge type="warning">{{rustBranch}} <CarbonIcons icon="ExternalLink" size="14"/></VPBadge></a> Rust branch.
    </div>
</div>