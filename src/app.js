const merge = mergerino;
var root = document.getElementById("root");

const temperature = {
  initial: {
    value: 22,
    units: "C"
  },
  Actions() {
    return {
      increment: function(amount) {
        update(function(state) {
          state.value += amount;
          return state;
        });
      }
    };
  }
};

var update = flyd.stream();

var states = flyd.scan(
  function(state, patch) {
    return patch(state);
  },
  temperature.initial,
  update
);
var actions = temperature.Actions(update);
states.map(function(state) {
  console.log("<pre>" + JSON.stringify(state) + "</pre>");
});

var Hello = {
  view: function() {
    return m("main", [
      m(
        "h1",
        {
          class: "title"
        },
        "My first app in culture"
      ),
      m(
        "button",
        {
          onclick: actions.increment
        },
        temperature.initial.value + " clicks"
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

// Only for using Meiosis Tracer in development.
meiosis.trace({ update, dataStreams: [states] });
meiosisTracer({ selector: "#tracer" });
