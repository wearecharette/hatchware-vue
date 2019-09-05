import Vue from "nativescript-vue";

import Home from "./components/Home";

var platform = require("platform");

var screen = platform.screen;

console.log(screen.mainScreen.heightDIPs);
console.log(screen.mainScreen.heightPixels);
console.log(screen.mainScreen.scale); // this is actually =  pixels / DIPs
console.log(screen.mainScreen.widthDIPs);
console.log(screen.mainScreen.widthPixels);


new Vue({

    template: `
        <Frame>
            <Home />
        </Frame>`,

    components: {
        Home
    }
}).$start();
