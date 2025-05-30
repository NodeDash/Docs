module.exports = function (context, options) {
  return {
    name: "custom-redirects",
    async contentLoaded({ actions }) {
      const { createData, addRoute } = actions;

      // Create a redirect data file
      const redirectData = await createData(
        "redirects.json",
        JSON.stringify({ to: "/intro" })
      );

      // Add the redirect route
      addRoute({
        path: "/",
        component: "@site/src/components/Redirect",
        props: {
          to: "/intro",
        },
        exact: true,
      });
    },
  };
};
