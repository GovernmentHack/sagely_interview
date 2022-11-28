import React from 'react';
import { render, screen } from '@testing-library/react';
import { ITEM_TYPE, Publication, PublicationItem } from "./PublicationItem";

const getDummyPublication = (): Publication => (
  {
    url: "https://www.google.com",
    manualTags: ["reference", "stuff"],
    abstractNote: "Its google. look it up",
    date: new Date(),
    dateAdded: new Date(),
    dateModified: new Date(),
    accessDate: new Date(),
    key: "YEHV4F7I",
    itemType: ITEM_TYPE.WEBPAGE,
    publicationYear: 1970,
    author: "GovernmentHack",
    title: "Google",
  });

describe("PublicationItem", () => {
  let publication: Publication;

  beforeEach(() => {
    publication = getDummyPublication();
  })
  test("Will display a url if title not present", () => {
    publication.title = "";
    render(<PublicationItem publication={publication} />);
    const title = screen.getByText(publication.url);
    expect(title).toBeInTheDocument();
  });

  test("Will truncate secondary text", () => {
    publication.abstractNote = "Bro ipsum dolor sit amet stoked ollie groomer BB. Switch snake bite huck daffy, bail huck pow pow backside poaching huck nose ACL gapers bail nose press. Bump shred flowy dirtbag face shots. Ollie saddle ride around, rigid rip pillow popping bomb. 180 huck park, acro trail swag gorby back country travel ollie rigid schwag.";
    render(<PublicationItem publication={publication} />);
    const title = screen.getByText("Bro ipsum dolor sit amet stoked ollie groomer BB. Switch snake bite huck daffy, bail h ...");
    expect(title).toBeInTheDocument();
  });
})