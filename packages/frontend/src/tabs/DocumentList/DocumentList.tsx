import { Box, Card, CardContent, Chip, Divider, FormControl, IconButton, InputLabel, List, ListItem, ListItemIcon, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TablePagination, Tooltip, Typography } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import RssFeedIcon from '@mui/icons-material/RssFeed';
import WebIcon from '@mui/icons-material/Web';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SchoolIcon from '@mui/icons-material/School';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import InfoIcon from '@mui/icons-material/Info';
import React, { useState } from "react";
import "./DocumentList.css"

enum ITEM_TYPE {
  WEBPAGE = "webpage",
  VIDEO_RECORDING = "videoRecording",
  MAGAZINE_ARTICLE = "magazineArticle",
  BLOG_POST = "blogPost",
  BOOK = "book",
}

type Publication = {
  url: string;
  manualTags: string[];
  abstractNote: string;
  date: Date;
  dateAdded: Date;
  dateModified: Date;
  accessDate: Date;
  key: string;
  itemType: ITEM_TYPE;
  publicationYear: number;
  author: string;
  title: string;
}

const getMoreInfo = (publication: Publication) => {
  return (
    <Card sx={{ maxWidth: "20vw", minWidth: "256px" }}>
      <CardContent>
        <Typography variant="h4">
          {publication.title}
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="text.secondary">
          {publication.author}
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="text.secondary">
          {new Date(publication.date).toISOString().split('T')[0]}
        </Typography>
        <Divider textAlign="left" sx={{ margin: "8px 0 8px 0" }}>Description</Divider>
        <Typography variant="body2">
          {publication.abstractNote}
        </Typography>
        <Divider textAlign="left" sx={{ margin: "8px 0 8px 0" }}>Tags</Divider>
        <Box sx={{
          display: "flex",
          alignContent: "flex-start",
          flexWrap: "wrap",
          gap: "8px",
        }}>
          {publication.manualTags.map((tag) => <Chip label={tag} variant="outlined" />)}
        </Box>
      </CardContent>
    </Card>
  )
}

const getDates = (publication: Publication) => {
  return (
    <Card sx={{ maxWidth: "20vw", minWidth: "256px" }}>
      <CardContent>
        <Typography variant="overline">
          Added
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="text.secondary">
          {new Date(publication.dateAdded).toLocaleString()}
        </Typography>
        <Typography variant="overline">
          last modified
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="text.secondary">
          {new Date(publication.dateModified).toLocaleString()}
        </Typography>
        <Typography variant="overline">
          last accessed
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="text.secondary">
          {new Date(publication.accessDate).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  )
}

const getPublicationIcon = (itemType: ITEM_TYPE) => {
  switch (itemType) {
    case ITEM_TYPE.BLOG_POST:
      return <RssFeedIcon />;
    case ITEM_TYPE.BOOK:
      return <BookIcon />;
    case ITEM_TYPE.WEBPAGE:
      return <WebIcon />;
    case ITEM_TYPE.MAGAZINE_ARTICLE:
      return <ImportContactsIcon />;
    case ITEM_TYPE.VIDEO_RECORDING:
      return <OndemandVideoIcon />;
    default:
      return <SchoolIcon />;
  }
}

const Filter = (): JSX.Element => {
  const [tags, setTags] = React.useState<string[]>([]);

  // TODO - replace with fetch
  const possibleTags = ["agile", "stuff", "reference", "guide"];

  const handleChange = (event: SelectChangeEvent<typeof tags>) => {
    const {
      target: { value },
    } = event;
    setTags(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Box sx={{ margin: "16px 0 0 0", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Typography variant="overline" sx={{ flex: "1 0 auto", margin: "0 0 0 16px" }}>
        Filter
      </Typography>
      <FormControl
        sx={{
          m: 1,
          width: 300,
          flex: "1 0 auto"
        }}
      >
        <InputLabel id="tag-filter-label">Tags</InputLabel>
        <Select
          labelId="tag-filter-label"
          id="tag-filter"
          multiple
          value={tags}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Tag" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {possibleTags.map((tag) => (
            <MenuItem
              key={tag}
              value={tag}
            >
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

const getPublications = (): Publication[] => {
  return [
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
    },
    {
      url: "https://www.facebook.com",
      manualTags: ["networking", "stuff"],
      abstractNote: "Its facebook. look it up",
      date: new Date(),
      dateAdded: new Date(),
      dateModified: new Date(),
      accessDate: new Date(),
      key: "YEHV5F7I",
      itemType: ITEM_TYPE.WEBPAGE,
      publicationYear: 1999,
      author: "GovernmentHack",
      title: "Facebook",
    },
    {
      url: "https://www.youtube.com/watch?v=YWA-xbsJrVg",
      manualTags: ["reference", "guide"],
      abstractNote: "Its a youtube video. look it up",
      date: new Date(),
      dateAdded: new Date(),
      dateModified: new Date(),
      accessDate: new Date(),
      key: "YEDG4F7I",
      itemType: ITEM_TYPE.VIDEO_RECORDING,
      publicationYear: 2016,
      author: "Someone Else",
      title: "Make a Webpage",
    }
  ]
}

export const DocumentTab: React.FunctionComponent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const MAX_COUNT = 100;

  //TODO - replace with fetch
  const publications = getPublications();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div aria-label="Document List" className="document-list">
      <Filter />
      <List>
        {publications.map((publication) => {
          return (
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="link" color="secondary" onClick={() => window.open(publication.url, "_blank")}>
                  <OpenInNewIcon />
                </IconButton>
              }
              sx={{
                minWidth: "50vw",
              }}
              key={publication.key}
            >
              <ListItemIcon>
                <Tooltip
                  title={
                    getMoreInfo(publication)
                  }
                  placement={"bottom-start"}
                >
                  {getPublicationIcon(publication.itemType)}
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary={publication.title} secondary={publication.abstractNote} />
              <ListItemIcon>
                <Tooltip
                  title={
                    getDates(publication)
                  }
                  placement={"bottom-start"}
                >
                  <InfoIcon>

                  </InfoIcon>
                </Tooltip>
              </ListItemIcon>
            </ListItem>
          )
        })}
      </List>
      <TablePagination
        component="div"
        count={MAX_COUNT}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  )
} 