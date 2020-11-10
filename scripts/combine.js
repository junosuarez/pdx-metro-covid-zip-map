#! /usr/bin/env node
const csv = require("csv");
const fsStream = require("fs");
const fs = require("fs/promises");
const path = require("path");
const stream = require("stream");
const promisify = require("util").promisify;
const pipe = promisify(stream.pipeline);

/**
 * Combines weekly zipcode snapshots into a single
 * table with all zipcodes over all weeks.
 *
 * Each run overwrites the output file.
 */

const basedir = path.resolve(__dirname, "../data/zipcode");

async function main() {
  const weeks = (await fs.readdir(basedir))
    .filter((filename) => /^\d\d\d\d-\d\d-\d\d\.csv$/.test(filename))
    .map((filename) => filename.replace(".csv", ""));

  const out = [];
  let prevWeekIdx = {};
  const zeroRow = { cases: 0, cases_norm: 0 };

  // read all weeks into one table
  for (const week of weeks) {
    const file = fsStream
      .createReadStream(path.resolve(basedir, `${week}.csv`))
      .pipe(csv.parse({ columns: true }));

    for await (const row of file) {
      // clean data
      // zipcodes with some but fewer than 10 cases are coded '1-9'
      // we replace them with 5, numerically, to get things to be visible
      // at this point in the pandemic, there are enough cases overall
      // to where this is, sadly, not problematic for visualization purposes
      if (["1-9", "1–9", "1–-9"].includes(row.cases)) {
        row.cases = 5;
      }

      // add week as column (time dimension)
      row.week = week;

      // calculate week-over-week delta per row
      const prevWeek = prevWeekIdx[row.zip_code] ?? zeroRow;
      prevWeekIdx[row.zip_code] = row;
      row.cases_change = row.cases - prevWeek.cases || 0;
      row.cases_norm_change = row.cases_norm - prevWeek.cases_norm || 0;

      out.push(row);
    }
  }

  // write
  csv
    .stringify(out, { header: true })
    .pipe(fsStream.createWriteStream(path.resolve(basedir, "combined.csv")));
}

main();
