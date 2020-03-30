var root = document.body;
var count = 0;

var Hello = {
  view: function() {
    return m("main", [
      m(
        "h1",
        {
          class: "title"
        },
        "My first app"
      ),
      m(
        "button",
        {
          onclick: function() {
            count++;
          }
        },
        count + " clicks"
      )
    ]);
  }
};

var Splash = {
  view: function() {
    return m(
      "a",
      {
        href: "#!/hello"
      },
      "Enter!"
    );
  }
};

m.route(root, "/splash", {
  "/splash": Splash,
  "/hello": Hello
});
