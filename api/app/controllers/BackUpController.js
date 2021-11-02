const W = require("when");
const node = require("when/node");
const exec = node.lift(require("child_process").exec);

module.exports = class PgBackup {
  constructor(opts) {}

  run(req, res) {
    const dumpTask = exec(
      `pg_dump -U postgres eventmanagement > ../backups/dump.sql`
    ).then(r => r[0]);

    res.send(200, { backup: "BackUp Completed" });
  }
};

