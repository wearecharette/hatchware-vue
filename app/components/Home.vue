<template>
    <Page class="page" actionBarHidden="true">
        <GridLayout>
            <WebView class="view" :src="url" />
        </GridLayout>
    </Page>
</template>

<script>
  const appSettings = require("application-settings")
  import axios from "axios"
  import qs from "querystring"
  import randomBytes from 'nativescript-randombytes'
  import base64url from "base64url"
  export default {
    data: () => ({
      token: '',
      url: 'http://menuat.com/ycafe#menu1'
    }),
    computed: {
    },
    mounted: function () {
      //get random id and assign to above
      //if doesnt exist create new doc android
      console.log('we are on top!')
      this.useToken()
    },
    methods: {
      setApplicationToken () {
          this.token = appSettings.getString('url')
          if ( !this.token ) {
            this.token = this.getRandomToken()
            appSettings.setString('url', this.token)
          }
      },
      getRandomToken () {
        return base64url(randomBytes(16))
      },
      useToken () {
        this.setApplicationToken()
        console.log('we are here')
        // var checkReset = setInterval(function() {
        //   axios.get('http://menuat.com/menuat/' + this.token, function(doc) {
        //     if ( typeof doc.reset !== 'undefined' ) {
        //       if ( doc.reset > 0 ) {
        //         axios.post('http://menuat.com/_update/poll/' + this.token, {
        //           reset: 0
        //          }).then(result => {
                  //   console.log('finally')
                  //   console.log(result.data.results);
                  // }, error => {
                  //   console.log('oops 2')
                  //   console.error(error);
                  // });
        //       }
        //     }
        //   });
        // }, 5000);
        //
        axios.get('http://menuat.com/menuat/' + this.token).then(doc => {
          console.log('status update')
          console.log(doc)
          console.log(this.token)
          if ( typeof doc.url !== 'undefined' ) {
            if (doc.url.indexOf('sssp') == -1) {
              this.url = doc.url
            }
            else {
              console.log('set your url in your dashboard');
              // document.body.innerHTML = '<div class="message"><h1>Device: ' + this.token + '</h1><p>Please set your device id in your admin console.</p></div>';
            }
            if ( typeof doc.orientation !== 'undefined' ) {
              // document.body.className = doc.orientation;
            }
          }
          else {
            console.log('creating doc')
            this.createConfig()
            // document.body.innerHTML = '<div class="message"><h1>Device: ' + this.token + '</h1><p>Please check your admin console url is set or call Menuat at <strong>904.495.0616</strong> or by email at support@menuat.com to reset your configuration.</p></div>';
          }
        }, error => {
          console.log('oops 1')
          // console.error(error);
          this.createConfig()
        });
      },
      createConfig () {
        //create empty config doc from template and send client email
        console.log('creating config');
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        const reqBody = {
          uid: userid
        }

        axios.post('http://menuat.com/_update/new_client/android', qs.stringify(reqBody), config)
        .then(result => {
          console.log('finally')
          console.log(result.data.results);
          this.url = result.data.url
        }, error => {
          console.log('oops 2')
          console.error(error);
        });


        // httpModule.request({
        //   url: "http://menuat.com/_update/new_client/android",
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   content: JSON.stringify({
        //       uid: userid
        //   })
        // }).then((response) => {
        //   console.log('oks')
        //   console.log(result)
        //   const result = response.content.toJSON()
        //   console.log('created doc')
        //   console.log(result)
        // }, (e) => {
        //   console.log('broke')
        // });
      }
    }
  }
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

    // Custom styles
    .fa {
        color: $accent-dark;
    }

    .info {
        font-size: 20;
    }
</style>
