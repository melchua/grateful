const cron = require("node-cron");

cron.schedule("1 3 19 * * 3", () => {
  console.log("running a task every second");
});

/* TODO:
For every verified user that has opted into receiving texts, 
setup a corresponding cron job
*/
