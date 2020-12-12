#! /usr/bin/env node

const watch = require("node-watch");
const fs = require("fs");
const findFiles = require("file-regex");
const printMessage = require("print-message");
const replace = require("replace-in-file");

//config constants
const REQUIRED_FIELDS = [
  "source_path",
  "target_path",
  "begin_target_mark_comment",
  "end_target_mark_comment",
];
const OPTIONAL_FIELDS = ["file_filter", "depth"];
const OPTIONAL_FIELDS_DEFAULTS = {
  file_filter: ".em.",
  depth: 30,
};

const config = getConfig();
const isConfigValid = validateConfig(config);

if (!isConfigValid) {
  process.exit();
}

(async function main() {
  const foundFiles = await findFiles(
    config.source_path,
    new RegExp(config.file_filter || OPTIONAL_FIELDS_DEFAULTS.file_filter),
    config.depth || OPTIONAL_FIELDS_DEFAULTS.depth
  );

  const paths = foundFiles.map(
    ({ dir, file }) => `${dir.replace(__dirname, "")}/${file}`
  );

  doReplaceImports(makeImportsString(paths));

  startWatchChanges(paths);
})();

function startWatchChanges(paths) {
  watch(
    config.source_path,
    { recursive: true, filter: new RegExp(config.file_filter || ".em.") },
    function (evt, name) {
      if (evt === "remove") {
        paths = paths.filter((p) => p !== `/${name}`);
      }

      if (evt === "update") {
        const isPresent = paths.find((p) => p === `/${name}`);

        if (!isPresent) {
          paths.push(`/${name}`);
        }
      }

      doReplaceImports(makeImportsString(paths));
    }
  );
}

function doReplaceImports(replacement) {
  const results = replace.sync({
    files: config.target_path,
    from: new RegExp(
      `(?<=${config.begin_target_mark_comment})(.*)(?=${config.end_target_mark_comment})`,
      "gms"
    ),
    to: `${replacement}\n`,
  });
}

function makeImportsString(pathsArray) {
  const reducer = (acc, curVal) => `${acc} \nimport ".${curVal}"`;

  return pathsArray.reduce(reducer, "");
}

function getConfig() {
  let config = "";

  const fileConfigSources = [
    "./effector-importer.config.json",
    "./configs/effector-importer.config.json",
    "./config/effector-importer.config.json",
  ];

  let fileConfig = "";
  for (let index = 0; index < fileConfigSources.length; index++) {
    try {
      const conf = fs.readFileSync(fileConfigSources[index], "utf8");

      if (conf) {
        fileConfig = conf;
      }
      break;
    } catch (e) {
      // continue
    }
  }

  if (fileConfig) {
    try {
      config = JSON.parse(fileConfig);
    } catch (e) {
      printMessage([`Effector importer`, "", "Invalid config json"], {
        borderColor: "red",
      });
      process.exit();
    }
  } else {
    try {
      const pjConf = fs.readFileSync("./package.json", "utf8");
      config = JSON.parse(pjConf)["effector-importer"];
    } catch (e) {
      printMessage([`Effector importer`, "", "Couldn't read package.json"], {
        borderColor: "red",
      });
      process.exit();
    }
  }

  return config;
}

function validateConfig(config) {
  let hasRequiredFieldErr = false;
  REQUIRED_FIELDS.forEach((field) => {
    const res = Object.prototype.hasOwnProperty.call(config, field);

    if (!res) {
      printMessage(
        [
          `Effector importer`,
          "",
          `Required field '${field}' is absent in present config`,
        ],
        {
          borderColor: "red",
        }
      );
      hasRequiredFieldErr = true;
    }
  });

  OPTIONAL_FIELDS.forEach((field) => {
    const res = Object.prototype.hasOwnProperty.call(config, field);

    if (!res) {
      printMessage(
        [
          `Effector importer`,
          "",
          `Optional field '${field}' is absent in present config. It will be used default '${OPTIONAL_FIELDS_DEFAULTS[field]}' value.`,
        ],
        {
          borderColor: "yellow",
        }
      );
    }
  });

  return !hasRequiredFieldErr;
}
