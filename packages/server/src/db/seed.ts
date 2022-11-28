import { collections } from "./dbSetup";
import { parse, CastingContext } from "csv-parse/sync";
import * as fs from "fs";
import { Publication } from "./models/publication";

/**
 * This is mostly used for local testing/ evaluation.
 * The assumption is the "prod" version of this app wouldn't need a DB seed on startup.
 */

const columns = [
  "url",
  "manualTags",
  "abstractNote",
  "date",
  "dateAdded",
  "dateModified",
  "accessDate",
  "key",
  "itemType",
  "publicationYear",
  "author",
  "title",
];
const castingFunction = (value: string, context: CastingContext) => {
  switch (context.column) {
    case "manualTags":
      return value.split(";").map((tag) => tag.trim()) as string[];
    case "date":
    case "dateAdded":
    case "dateModified":
    case "accessDate":
      const newDate = new Date(value);
      if (newDate.toString() === "Invalid Date") {
        return null;
      }
      return newDate;
    case "publicationYear":
      return Number(value);
    case "itemType":
    // Maybe add validation? 🤷
    default:
      return value as string;
  }
};

export async function seedDb() {
  if (!collections.publications) {
    throw new Error("publications collection not initialized");
  }
  if (!process.env.DATASET) {
    console.log("No DATASET var set, skipping seed data ...");
    return;
  }
  console.log("Parsing seed data ...");
  const csvImport = fs.readFileSync(process.env.DATASET, "utf8");
  const seedData: Publication[] = parse(csvImport, {
    columns,
    fromLine: 2,
    autoParseDate: true,
    cast: castingFunction,
  });
  console.log(
    `Seeding Publications Collection with ${seedData.length} documents...`
  );
  try {
    await collections.publications.insertMany(seedData, { ordered: false }); // unordered insert to skip errors.
    console.log("Publications collection seeded");
  } catch (error) {
    console.error("Unable to seed DB: ", error);
  }
}
